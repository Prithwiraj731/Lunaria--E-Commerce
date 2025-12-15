const Product = require("../model/Product.model")
const fs = require('fs');
const csv = require('csv-parse');

module.exports.createProduct = async (req, res) => {
    let { name, brand, price, colors, sizes, description, image, category } = req.body;

    if (!name || !brand || !price || !colors || !sizes || !description || !image || !category) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }
    try {
        const product = await Product.create({
            name,
            brand,
            price,
            colors,
            sizes,
            description,
            image,
            category
        })
        res.status(201).json({ message: "Product created successfully", product });
    } catch (err) {
        res.status(500).json({ message: "Error creating product", error: err.message });
    }

}
module.exports.getAllProduct = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 })
        res.status(200).json({ products });
    } catch (err) {
        res.status(500).json({ message: "Error fetching products", error: err.message });
    }
}
module.exports.getProductById = async (req, res) => {
    let id = req.params.id;
    try {
        const product = await Product.findById(id)
        res.status(200).json({ product });
    } catch (err) {
        res.status(404).json({ message: "Product not found" });
    }

}
module.exports.deleteProductById = async (req, res) => {
    let id = req.params.id;
    try {
        await Product.findByIdAndDelete(id)
        res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
        res.status(404).json({ message: "Product not found" });
    }
}

// Update product by ID (admin only)
module.exports.updateProductById = async (req, res) => {
    let id = req.params.id;
    const update = req.body;
    try {
        const product = await Product.findByIdAndUpdate(id, update, { new: true });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product updated successfully", product });
    } catch (err) {
        res.status(500).json({ message: "Error updating product", error: err.message });
    }
}

module.exports.bulkUploadProducts = async (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const products = [];
    fs.createReadStream(req.file.path)
        .pipe(csv.parse({ columns: true, trim: true }))
        .on('data', (row) => {
            row.sizes = row.sizes ? row.sizes.split(',').map(s => s.trim()) : [];
            row.colors = row.colors ? row.colors.split(',').map(c => c.trim()) : [];
            row.price = Number(row.price);
            row.category = row.category ? row.category.trim().toLowerCase() : '';
            products.push(row);
        })
        .on('end', async () => {
            try {
                await Product.insertMany(products);
                fs.unlinkSync(req.file.path); // Clean up
                res.status(201).json({ message: 'Products uploaded successfully', count: products.length });
            } catch (err) {
                console.error('Bulk upload DB error:', err);
                res.status(500).json({ message: 'Error uploading products', error: err.message });
            }
        })
        .on('error', (err) => {
            console.error('Bulk upload CSV parse error:', err);
            res.status(500).json({ message: 'CSV parse error', error: err.message });
        });
};

module.exports.deleteAllProducts = async (req, res) => {
    try {
        await Product.deleteMany({});
        res.status(200).json({ message: 'All products deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting all products', error: err.message });
    }
};

// Enhanced fuzzy/synonym search
const synonymMap = {
    tshirt: ['t-shirt', 'tee', 'shirt'],
    tshirts: ['t-shirts', 'tees', 'shirts'],
    saree: ['sari', 'saree'],
    sarees: ['saris', 'sarees'],
    jeans: ['jeans', 'denim'],
    pant: ['pant', 'pants', 'trouser', 'trousers'],
    pants: ['pant', 'pants', 'trouser', 'trousers'],
    kurta: ['kurta', 'kurti', 'kurtas', 'kurtis'],
    dress: ['dress', 'dresses', 'gown', 'gowns'],
    shoe: ['shoe', 'shoes', 'sneaker', 'sneakers'],
    shoes: ['shoe', 'shoes', 'sneaker', 'sneakers'],
    top: ['top', 'tops', 'blouse', 'blouses'],
    shirt: ['shirt', 'shirts', 'tshirt', 't-shirt', 'tee', 'tees'],
    shirts: ['shirt', 'shirts', 'tshirt', 't-shirt', 'tee', 'tees'],
};

function normalize(str) {
    return str.replace(/[-\s]/g, '').toLowerCase();
}

module.exports.searchProducts = async (req, res) => {
    const { q } = req.query;
    if (!q || q.trim() === "") {
        return res.status(400).json({ message: "Query parameter 'q' is required" });
    }
    try {
        // Normalize and get synonyms
        const normQ = normalize(q);
        const synonyms = synonymMap[normQ] || [q];
        // Always include the original query and normalized query
        const searchTerms = Array.from(new Set([q, normQ, ...synonyms]));
        // Build regex array
        const regexes = searchTerms.map(term => new RegExp(term, 'i'));
        const products = await Product.find({
            $or: [
                { name: { $in: regexes } },
                { brand: { $in: regexes } },
                { description: { $in: regexes } }
            ]
        });
        res.status(200).json({ products });
    } catch (err) {
        res.status(500).json({ message: "Error searching products", error: err.message });
    }
};

// Recommend related and complementary products
module.exports.recommendProducts = async (req, res) => {
    const { q, productId } = req.query;
    try {
        let baseProduct = null;
        if (productId) {
            baseProduct = await Product.findById(productId);
        } else if (q) {
            baseProduct = await Product.findOne({ name: new RegExp(q, 'i') });
        }
        if (!baseProduct) {
            return res.status(404).json({ message: "Base product not found for recommendations" });
        }
        // Related: same category, not the same product
        const related = await Product.find({
            category: baseProduct.category,
            _id: { $ne: baseProduct._id }
        }).limit(4);
        // Complementary: different category, similar brand or name
        const complementary = await Product.find({
            category: { $ne: baseProduct.category },
            $or: [
                { brand: baseProduct.brand },
                { name: new RegExp(baseProduct.name.split(' ')[0], 'i') }
            ]
        }).limit(4);
        res.status(200).json({ related, complementary });
    } catch (err) {
        res.status(500).json({ message: "Error getting recommendations", error: err.message });
    }
};

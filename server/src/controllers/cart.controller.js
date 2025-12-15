const Cart = require("../model/Cart.model");
const User = require('../model/User.model');
const Product = require('../model/Product.model'); // <-- FIX: Register Product model


module.exports.addCart = async (req, res) => {
    const { product, color, quantity, size } = req.body;
    const userId = req.user._id;

    if (!product || !color || !quantity || !size) {
        return res.status(400).json({ success: false, message: "Please fill in all required fields" });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Optional: Prevent duplicate cart entries for the same product + variant
        const existingItem = await Cart.findOne({ userId, product, color, size });
        if (existingItem) {
            existingItem.quantity += quantity;
            await existingItem.save();
            return res.status(200).json({ success: true, message: "Cart item updated", data: existingItem });
        }

        const cart = new Cart({
            userId,
            product,
            color,
            quantity,
            size
        });

        await cart.save();
        return res.status(201).json({ success: true, message: "Item added to cart", data: cart });

    } catch (error) {
        console.error("Add to Cart Error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};


module.exports.getAllCart = async (req, res) => {
    try {
        const userId = req.user._id;
        // FIX: Ensure population is done correctly and handle potential errors.
        const carts = await Cart.find({ userId: userId }).populate({
            path: 'product',
            model: 'Product'
        });
        
        // Filter out carts where product might be null after population (if a product was deleted)
        const validCarts = carts.filter(item => item.product);

        return res.status(200).json({ success: true, data: validCarts });
    } catch (error) {
        // Enhanced error logging
        console.error("Get Cart Error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

module.exports.deleteCartById = async (req, res) => {
    const cartId = req.params.id;

    try {
        const cart = await Cart.findByIdAndDelete(cartId);
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart item not found" });
        }

        return res.status(200).json({ success: true, message: "Cart item deleted successfully" });
    } catch (error) {
        console.error("Delete Cart Error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

module.exports.clearCart = async (req, res) => {
    try {
        await Cart.deleteMany({ userId: req.user._id });
        return res.status(200).json({ success: true, message: "Cart cleared successfully" });
    } catch (error) {
        console.error("Clear Cart Error:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

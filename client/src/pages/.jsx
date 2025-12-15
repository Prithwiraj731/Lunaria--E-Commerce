import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

function TryOn() {
    const [products, setProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [userImage, setUserImage] = useState(null);
    const [userImageFile, setUserImageFile] = useState(null); // Actual file object
    const [userImagePreview, setUserImagePreview] = useState(null);
    const [generating, setGenerating] = useState(false);
    const [resultImage, setResultImage] = useState(null);
    const [error, setError] = useState(null);

    // Fetch products for selection
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:3000/product');
                // Filter for garments only (simple check)
                const garments = (res.data.products || []).filter(p =>
                    p.image && (p.category.toLowerCase().includes('man') ||
                        p.category.toLowerCase().includes('women') ||
                        p.category.toLowerCase().includes('dress') ||
                        p.category.toLowerCase().includes('shirt') ||
                        p.category.toLowerCase().includes('jacket'))
                );
                setProducts(garments);
            } catch (err) {
                console.error("Failed to fetch products", err);
            } finally {
                setLoadingProducts(false);
            }
        };
        fetchProducts();
    }, []);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUserImageFile(file); // Store file for sending
            const reader = new FileReader();
            reader.onloadend = () => {
                setUserImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleGenerate = async () => {
        if (!userImageFile || !selectedProduct) {
            setError("Please upload a photo and select a product.");
            return;
        }
        setGenerating(true);
        setError(null);
        setResultImage(null);

        try {
            const formData = new FormData();
            formData.append('userImage', userImageFile);
            formData.append('garmentImageUrl', selectedProduct.image);
            formData.append('garmentType', selectedProduct.category);

            const res = await axios.post('http://localhost:3000/api/vton/try-on', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (res.data.success) {
                setResultImage(res.data.resultImage);
            } else {
                setError(res.data.error || "Failed to generate image.");
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Error generating try-on.");
        } finally {
            setGenerating(false);
        }
    };

    return (
        <div className="min-h-screen bg-light pt-24 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-dark mb-4 tracking-tighter uppercase">
                        Virtual <span className="text-primary">Try-On</span>
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Experience the future of fashion. Upload your photo and see how our premium collection looks on you instantly, powered by AI.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column: Inputs */}
                    <div className="space-y-8">

                        {/* Step 1: Upload Photo */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-dark mb-4 flex items-center gap-2">
                                <span className="bg-dark text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm font-black">1</span>
                                Upload Your Photo
                            </h2>
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50 hover:bg-white transition-colors relative">
                                {userImagePreview ? (
                                    <div className="relative">
                                        <img src={userImagePreview} alt="User" className="max-h-96 mx-auto rounded-lg shadow-md object-cover" />
                                        <button
                                            onClick={() => { setUserImage(null); setUserImageFile(null); setUserImagePreview(null); }}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full shadow hover:bg-red-600"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ) : (
                                    <label className="cursor-pointer flex flex-col items-center justify-center h-full">
                                        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-3xl mb-4 text-gray-400">
                                            📷
                                        </div>
                                        <span className="text-gray-500 font-medium">Click to upload image</span>
                                        <span className="text-xs text-gray-400 mt-2">Full body connection recommended</span>
                                        <input type="file" accept="image/png, image/jpeg, image/jpg, image/webp, image/avif" onChange={handleImageUpload} className="hidden" />
                                    </label>
                                )}
                            </div>
                        </div>

                        {/* Step 2: Select Product */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-dark mb-4 flex items-center gap-2">
                                <span className="bg-dark text-primary w-8 h-8 rounded-full flex items-center justify-center text-sm font-black">2</span>
                                Select Clothing
                            </h2>

                            {loadingProducts ? (
                                <div className="py-12 text-center text-gray-400">Loading wardrobe...</div>
                            ) : (
                                <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 max-h-96 overflow-y-auto p-2 scrollbar-thin">
                                    {products.map(product => (
                                        <div
                                            key={product._id}
                                            onClick={() => setSelectedProduct(product)}
                                            className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all group relative ${selectedProduct?._id === product._id ? 'border-primary ring-2 ring-primary ring-opacity-50' : 'border-transparent hover:border-gray-200'}`}
                                        >
                                            <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            </div>
                                            <div className="p-2 text-xs font-bold text-gray-700 truncate">{product.name}</div>
                                            {selectedProduct?._id === product._id && (
                                                <div className="absolute top-2 right-2 bg-primary text-dark rounded-full p-1 shadow">
                                                    ✓
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleGenerate}
                            disabled={generating || !userImageFile || !selectedProduct}
                            className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-lg transition-all shadow-lg ${generating || !userImageFile || !selectedProduct
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-dark text-primary hover:bg-primary hover:text-dark hover:scale-[1.02]'
                                }`}
                        >
                            {generating ? 'Hallucinating Outfit...' : 'Generate Try-On'}
                        </button>

                        {error && (
                            <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-100">
                                {error}
                            </div>
                        )}
                    </div>

                    {/* Right Column: Result */}
                    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-col items-center justify-center min-h-[600px] relative overflow-hidden">

                        {/* Background Decoration */}
                        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />

                        {resultImage ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="relative w-full h-full flex flex-col items-center"
                            >
                                <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-white">
                                    <img src={resultImage} alt="Virtual Try-On Result" className="max-w-full max-h-[700px] object-cover" />
                                </div>
                                <a
                                    href={resultImage}
                                    download="lunaria-tryon.png"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="mt-6 px-8 py-3 bg-primary text-dark font-bold rounded-full hover:bg-yellow-400 transition shadow-md flex items-center gap-2"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                    Download Image
                                </a>
                            </motion.div>
                        ) : generating ? (
                            <div className="text-center">
                                <div className="relative w-24 h-24 mx-auto mb-6">
                                    <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                                    <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                                </div>
                                <h3 className="text-xl font-bold text-dark animate-pulse">Designing your look...</h3>
                                <p className="text-gray-500 mt-2 max-w-xs mx-auto">The AI is analyzing fabric physics and lighting. This usually takes 10-20 seconds.</p>
                            </div>
                        ) : (
                            <div className="text-center text-gray-400 max-w-sm">
                                <div className="text-6xl mb-6 opacity-20">✨</div>
                                <h3 className="text-xl font-bold text-gray-300 mb-2">Ready to Transform?</h3>
                                <p>Select your photo and a product to see the magic happen here.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TryOn;

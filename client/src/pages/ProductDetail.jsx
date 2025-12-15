import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { FaArrowLeft, FaStar, FaShoppingCart, FaBolt } from 'react-icons/fa';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [related, setRelated] = useState([]);
  const [complementary, setComplementary] = useState([]);
  const [adding, setAdding] = useState(false);
  const [buying, setBuying] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:3000/product/${id}`);
        setProduct(res.data.product);

        // Set default selections
        if (res.data.product.colors && res.data.product.colors.length > 0) {
          setSelectedColor(res.data.product.colors[0]);
        }
        if (res.data.product.sizes && res.data.product.sizes.length > 0) {
          setSelectedSize(res.data.product.sizes[0]);
        }

        // Fetch recommendations
        const recRes = await axios.get(`http://localhost:3000/product/recommend?productId=${id}`);
        setRelated(recRes.data.related || []);
        setComplementary(recRes.data.complementary || []);
      } catch (err) {
        setError('Failed to load product details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to add items to your cart.');
      navigate('/login');
      return;
    }

    // Only validate color/size if product has them
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      alert('Please select a color.');
      return;
    }

    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert('Please select a size.');
      return;
    }

    const cartData = {
      product: product._id,
      quantity: quantity,
      color: selectedColor || (product.colors && product.colors.length > 0 ? product.colors[0] : 'Default'),
      size: selectedSize || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'Default'),
    };

    try {
      setAdding(true);
      await axios.post('http://localhost:3000/cart', cartData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchCart();
      alert('Added to cart successfully!');
      navigate('/cart');
    } catch (err) {
      console.error('Add to cart error:', err);
      alert(err.response?.data?.message || 'Failed to add to cart.');
    } finally {
      setAdding(false);
    }
  };

  const handleBuyNow = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please log in to purchase.');
      navigate('/login');
      return;
    }

    // Only validate color/size if product has them
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      alert('Please select a color.');
      return;
    }

    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert('Please select a size.');
      return;
    }

    const cartData = {
      product: product._id,
      quantity: quantity,
      color: selectedColor || (product.colors && product.colors.length > 0 ? product.colors[0] : 'Default'),
      size: selectedSize || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : 'Default'),
    };

    try {
      setBuying(true);
      await axios.post('http://localhost:3000/cart', cartData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchCart();
      navigate('/checkout');
    } catch (err) {
      console.error('Buy now error:', err);
      alert(err.response?.data?.message || 'Failed to proceed to checkout.');
    } finally {
      setBuying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-dark mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'This product does not exist.'}</p>
          <Link to="/products" className="px-6 py-3 bg-dark text-white rounded-full hover:bg-primary hover:text-dark transition font-bold">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light text-dark font-sans overflow-x-hidden pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-dark font-semibold mb-8 transition-colors"
        >
          <FaArrowLeft />
          Back
        </button>

        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-white sticky top-24">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-cover"
              />
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col"
          >
            {/* Brand & Name */}
            <div className="mb-6">
              <p className="text-gray-500 text-sm font-bold tracking-widest mb-2 uppercase">{product.brand}</p>
              <h1 className="text-4xl md:text-5xl font-black text-dark leading-tight tracking-tight mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1 text-primary">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < Math.floor(product.rating || 3.5) ? 'text-primary' : 'text-gray-300'} />
                  ))}
                </div>
                <span className="text-gray-600 font-semibold">({product.rating || 3.5})</span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <p className="text-5xl font-black text-dark">₹{product.price * quantity}</p>
              {quantity > 1 && (
                <p className="text-gray-500 text-sm mt-1">₹{product.price} per item</p>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div className="mb-6">
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                  Select Color
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-6 py-3 rounded-full font-bold transition-all border-2 ${selectedColor === color
                        ? 'bg-primary border-dark text-dark shadow-lg scale-105'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                  Select Size
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 rounded-full font-bold transition-all border-2 ${selectedSize === size
                        ? 'bg-primary border-dark text-dark shadow-lg scale-105'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-8">
              <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                Quantity
              </label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 text-dark font-bold text-xl transition"
                >
                  −
                </button>
                <span className="text-2xl font-bold text-dark min-w-[3rem] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 text-dark font-bold text-xl transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={adding}
                className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-white border-2 border-dark text-dark font-bold rounded-full hover:bg-gray-50 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaShoppingCart />
                {adding ? 'Adding...' : 'Add to Cart'}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleBuyNow}
                disabled={buying}
                className="flex-1 flex items-center justify-center gap-3 px-8 py-4 bg-primary text-dark font-bold rounded-full hover:bg-yellow-400 transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaBolt />
                {buying ? 'Processing...' : 'Buy Now'}
              </motion.button>
            </div>

            {/* Product Specifications */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="font-bold text-lg mb-4 uppercase tracking-wide">Product Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600 font-semibold">Brand</span>
                  <span className="text-dark font-bold">{product.brand}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-gray-600 font-semibold">Category</span>
                  <span className="text-dark font-bold capitalize">{product.category}</span>
                </div>
                {product.colors && product.colors.length > 0 && (
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-semibold">Available Colors</span>
                    <span className="text-dark font-bold">{product.colors.join(', ')}</span>
                  </div>
                )}
                {product.sizes && product.sizes.length > 0 && (
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600 font-semibold">Available Sizes</span>
                    <span className="text-dark font-bold">{product.sizes.join(', ')}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recommendations */}
        {(related.length > 0 || complementary.length > 0) && (
          <div className="mt-16">
            {/* Related Products */}
            {related.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl font-black text-dark mb-8 tracking-tight">You May Also Like</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {related.slice(0, 4).map((relProduct) => (
                    <Link
                      key={relProduct._id}
                      to={`/product/${relProduct._id}`}
                      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
                    >
                      <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                        <img
                          src={relProduct.image}
                          alt={relProduct.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-dark mb-1 truncate group-hover:text-gray-600 transition-colors">
                          {relProduct.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">{relProduct.brand}</p>
                        <p className="text-lg font-black text-dark">₹{relProduct.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Complementary Products */}
            {complementary.length > 0 && (
              <div>
                <h2 className="text-3xl font-black text-dark mb-8 tracking-tight">Complete Your Look</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {complementary.slice(0, 4).map((compProduct) => (
                    <Link
                      key={compProduct._id}
                      to={`/product/${compProduct._id}`}
                      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
                    >
                      <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                        <img
                          src={compProduct.image}
                          alt={compProduct.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-dark mb-1 truncate group-hover:text-gray-600 transition-colors">
                          {compProduct.name}
                        </h3>
                        <p className="text-sm text-gray-500 mb-2">{compProduct.brand}</p>
                        <p className="text-lg font-black text-dark">₹{compProduct.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { motion } from 'framer-motion';

function Home() {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:3000/product');
        setProducts(res.data.products.slice(0, 4) || []);
      } catch (error) {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = [
    { id: 1, name: 'Woman', img: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg', link: "/category/women" },
    { id: 2, name: 'Man', img: 'https://images.pexels.com/photos/842811/pexels-photo-842811.jpeg', link: "/category/men" },
    { id: 3, name: 'Kids', img: 'https://images.pexels.com/photos/1619772/pexels-photo-1619772.jpeg', link: "/category/kids" },
  ];

  return (
    <div className="min-h-screen bg-light text-dark font-sans overflow-x-hidden">

      {/* Hero Section */}
      <section className="relative px-6 py-12 md:py-24 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center min-h-[80vh]">

        {/* Left Content */}
        <div className="flex flex-col items-start z-10 relative">
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-500 text-sm tracking-[0.2em] font-bold mb-4"
          >
            EST 2025
          </motion.span>

          <div className="relative">
            {/* Background Text Layer */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 0.08, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-7xl md:text-[10rem] font-black text-dark leading-[0.85] tracking-tighter select-none"
            >
              SPACE <br /> SHIRT
            </motion.h1>

            {/* Foreground Text Layer */}
            <motion.h1
              initial={{ opacity: 0, clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)' }}
              animate={{ opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}
              transition={{ duration: 0.8, delay: 0.4, ease: "circOut" }}
              className="absolute top-4 left-2 md:top-8 md:left-4 text-6xl md:text-8xl font-black text-dark leading-none tracking-tighter"
            >
              LUNARIA <br /> <span className="text-gray-400">STORE</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-10 text-gray-500 max-w-md text-sm md:text-base leading-relaxed font-medium"
          >
            COMFORTABLE PRODUCTS CREATED BY HIGHLY SKILLED CRAFTSMANSHIP IN EACH OF OUR PRODUCTS.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex gap-4 mt-10"
          >
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#FDE047" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/products')}
              className="px-10 py-4 bg-primary text-dark font-extrabold rounded-full shadow-xl hover:shadow-2xl transition-all text-sm md:text-base tracking-wide"
            >
              BEST PRODUCTS
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, borderColor: "#1F2937", color: "#1F2937" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/try-on')}
              className="px-10 py-4 bg-white border-2 border-gray-200 text-gray-600 font-extrabold rounded-full hover:bg-gray-50 transition-all text-sm md:text-base tracking-wide"
            >
              Try outfit with AI ✨
            </motion.button>
          </motion.div>
        </div>

        {/* Right Content / Image */}
        <motion.div
          initial={{ opacity: 0, x: 50, rotate: 5 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
          className="relative flex flex-col items-center md:items-end w-full"
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="relative z-10 w-full max-w-md"
          >
            <img
              src="/hero-poster.jpg"
              alt="New Collection Poster"
              className="w-full h-auto rounded-2xl shadow-2xl hover:scale-105 transition duration-500 border-4 border-white/50"
            />

            {/* Floating Glow Effects */}
            <div className="absolute -inset-4 bg-gradient-to-r from-yellow-400 to-primary opacity-20 blur-2xl -z-10 rounded-full"></div>
          </motion.div>
        </motion.div>
      </section>

      {/* Category Cards Section - Enhanced */}
      <section className="py-20 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Animated Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-between items-center mb-10 px-4 md:px-20 text-gray-500 font-bold tracking-widest"
          >
            <motion.span
              animate={{ x: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="hidden md:inline"
            >
              ← CREATIVE
            </motion.span>
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mx-auto text-xl text-dark font-black"
            >
              DESIGN
            </motion.span>
            <motion.span
              animate={{ x: [5, -5, 5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="hidden md:inline"
            >
              CREATIVE →
            </motion.span>
          </motion.div>

          {/* Central Decorative Circle with Glow */}
          <div className="relative mb-16">
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 360]
              }}
              transition={{
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 20, repeat: Infinity, ease: "linear" }
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-primary/20 via-yellow-300/10 to-transparent rounded-full blur-3xl"
            />
          </div>

          {/* Category Cards Grid - 3D Interactive */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {/* WOMAN Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -10, scale: 1.03 }}
              className="group relative"
            >
              <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-4 border-transparent hover:border-primary transform perspective-1000">
                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/20 group-hover:via-yellow-300/10 group-hover:to-transparent transition-all duration-500 rounded-3xl" />

                {/* Image Container with Zoom */}
                <div className="relative h-64 overflow-hidden bg-primary">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400"
                    alt="Woman Fashion"
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 relative">
                  <motion.h3
                    className="text-2xl font-black text-dark mb-3 group-hover:text-primary transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    WOMAN
                  </motion.h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/category/women')}
                    className="px-6 py-2 bg-dark text-white rounded-full font-bold hover:bg-primary hover:text-dark transition-all shadow-md hover:shadow-xl"
                  >
                    Explore
                  </motion.button>
                </div>

                {/* Floating Badge */}
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-4 right-4 bg-primary text-dark text-xs font-bold px-3 py-1 rounded-full shadow-lg"
                >
                  NEW
                </motion.div>
              </div>
            </motion.div>

            {/* MAN Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -10, scale: 1.03 }}
              className="group relative"
            >
              <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-4 border-transparent hover:border-primary">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/20 group-hover:via-yellow-300/10 group-hover:to-transparent transition-all duration-500 rounded-3xl" />

                <div className="relative h-64 overflow-hidden bg-gray-800">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    src="https://images.unsplash.com/photo-1488161628813-04466f872be2?w=400"
                    alt="Man Fashion"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>

                <div className="p-6 relative">
                  <motion.h3
                    className="text-2xl font-black text-dark mb-3 group-hover:text-primary transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    MAN
                  </motion.h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/category/men')}
                    className="px-6 py-2 bg-dark text-white rounded-full font-bold hover:bg-primary hover:text-dark transition-all shadow-md hover:shadow-xl"
                  >
                    Explore
                  </motion.button>
                </div>

                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute top-4 right-4 bg-primary text-dark text-xs font-bold px-3 py-1 rounded-full shadow-lg"
                >
                  TRENDING
                </motion.div>
              </div>
            </motion.div>

            {/* KIDS Card */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -10, scale: 1.03 }}
              className="group relative"
            >
              <div className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-4 border-transparent hover:border-primary">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/20 group-hover:via-yellow-300/10 group-hover:to-transparent transition-all duration-500 rounded-3xl" />

                <div className="relative h-64 overflow-hidden bg-orange-100">
                  <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    src="https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400"
                    alt="Kids Fashion"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>

                <div className="p-6 relative">
                  <motion.h3
                    className="text-2xl font-black text-dark mb-3 group-hover:text-primary transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    KIDS
                  </motion.h3>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/category/kids')}
                    className="px-6 py-2 bg-dark text-white rounded-full font-bold hover:bg-primary hover:text-dark transition-all shadow-md hover:shadow-xl"
                  >
                    Explore
                  </motion.button>
                </div>

                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute top-4 right-4 bg-primary text-dark text-xs font-bold px-3 py-1 rounded-full shadow-lg"
                >
                  POPULAR
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* See All Products Button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(250, 204, 21, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/products')}
              className="px-10 py-4 bg-primary text-dark font-black rounded-full shadow-xl hover:shadow-2xl transition-all text-lg tracking-wide"
            >
              SEE ALL PRODUCTS
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section - Interactive Features */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-dark mb-4">Why Choose Lunaria?</h2>
            <p className="text-gray-600 text-lg">Experience fashion like never before</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Feature 1 - Free Shipping */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -10 }}
              className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all group"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
              >
                <svg className="w-8 h-8 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </motion.div>
              <h3 className="text-xl font-bold text-dark mb-2">Free Shipping</h3>
              <p className="text-gray-600 text-sm">On orders over ₹999</p>
            </motion.div>

            {/* Feature 2 - Easy Returns */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -10 }}
              className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all group"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
              >
                <svg className="w-8 h-8 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </motion.div>
              <h3 className="text-xl font-bold text-dark mb-2">Easy Returns</h3>
              <p className="text-gray-600 text-sm">30-day return policy</p>
            </motion.div>

            {/* Feature 3 - Quality */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -10 }}
              className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all group"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
              >
                <svg className="w-8 h-8 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.div>
              <h3 className="text-xl font-bold text-dark mb-2">Premium Quality</h3>
              <p className="text-gray-600 text-sm">100% authentic products</p>
            </motion.div>

            {/* Feature 4 - Support */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -10 }}
              className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all group"
            >
              <motion.div
                animate={{ y: [-3, 3, -3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="w-16 h-16 mx-auto mb-4 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
              >
                <svg className="w-8 h-8 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </motion.div>
              <h3 className="text-xl font-bold text-dark mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">Always here to help</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-20 bg-dark text-white relative overflow-hidden">
        {/* Animated Background Elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 right-10 w-32 h-32 border-4 border-primary/20 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 left-10 w-48 h-48 border-4 border-primary/10 rounded-full"
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black mb-4">Our Success Story</h2>
            <p className="text-gray-400">Numbers that speak for themselves</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <motion.div className="text-5xl md:text-6xl font-black text-primary mb-2">
                10K+
              </motion.div>
              <p className="text-gray-400 font-semibold">Happy Customers</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <motion.div className="text-5xl md:text-6xl font-black text-primary mb-2">
                500+
              </motion.div>
              <p className="text-gray-400 font-semibold">Products</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <motion.div className="text-5xl md:text-6xl font-black text-primary mb-2">
                50+
              </motion.div>
              <p className="text-gray-400 font-semibold">Cities</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <motion.div className="text-5xl md:text-6xl font-black text-primary mb-2">
                4.9★
              </motion.div>
              <p className="text-gray-400 font-semibold">Average Rating</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-dark mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 text-lg">Real stories from real people</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              className="bg-gray-50 p-8 rounded-2xl shadow-lg relative"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center font-bold text-dark mr-4">
                  AP
                </div>
                <div>
                  <h4 className="font-bold text-dark">Ananya Patel</h4>
                  <div className="text-primary text-sm">★★★★★</div>
                </div>
              </div>
              <p className="text-gray-600 italic">"Amazing quality and fast delivery! The AI try-on feature helped me choose the perfect fit. Absolutely love Lunaria!"</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              className="bg-gray-50 p-8 rounded-2xl shadow-lg relative md:mt-8"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center font-bold text-dark mr-4">
                  RS
                </div>
                <div>
                  <h4 className="font-bold text-dark">Rahul Sharma</h4>
                  <div className="text-primary text-sm">★★★★★</div>
                </div>
              </div>
              <p className="text-gray-600 italic">"Best online shopping experience ever! The customer service is top-notch and the products are exactly as shown."</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              className="bg-gray-50 p-8 rounded-2xl shadow-lg relative"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center font-bold text-dark mr-4">
                  PK
                </div>
                <div>
                  <h4 className="font-bold text-dark">Priya Kapoor</h4>
                  <div className="text-primary text-sm">★★★★★</div>
                </div>
              </div>
              <p className="text-gray-600 italic">"The designs are trendy and unique. I always find something special here. Highly recommend to all fashion lovers!"</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-yellow-400 to-primary relative overflow-hidden">
        <motion.div
          animate={{ y: [-20, 20, -20], rotate: [0, 180, 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-10 w-20 h-20 bg-white/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ y: [20, -20, 20], rotate: [360, 180, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 right-10 w-32 h-32 bg-white/20 rounded-full blur-xl"
        />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-dark mb-4">Stay in the Loop!</h2>
            <p className="text-dark/80 text-lg mb-8">Subscribe to get exclusive offers, early access to sales, and style tips delivered to your inbox.</p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col md:flex-row gap-4 justify-center items-center"
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="px-6 py-4 rounded-full w-full md:w-96 text-dark font-semibold focus:outline-none focus:ring-4 focus:ring-white/50 shadow-xl"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-dark text-white rounded-full font-bold hover:bg-gray-800 transition-all shadow-xl whitespace-nowrap"
              >
                Subscribe Now
              </motion.button>
            </motion.div>

            <p className="text-dark/60 text-sm mt-4">✨ Join 10,000+ fashion enthusiasts already subscribed!</p>
          </motion.div>
        </div>
      </section>

      {/* Pre-Footer / CTA */}
      < section className="py-24 bg-white text-center relative overflow-hidden" >
        <div className="absolute top-10 left-0 w-32 h-32 bg-gray-200 rounded-full filter blur-xl opacity-50"></div>
        <div className="absolute bottom-10 right-0 w-48 h-48 bg-gray-300 rounded-full filter blur-2xl opacity-40"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <span className="text-gray-400 font-bold tracking-widest text-sm mb-4 block">LUNARIA STORE</span>
          <h2 className="text-5xl md:text-7xl font-black text-dark mb-6 tracking-tighter leading-tight">
            GET YOUR <br /> FAVORITE WEAR <br /> AND SHARE <br /> WITH US
          </h2>
          <p className="text-gray-500 mb-10 max-w-lg mx-auto">
            COMFORTABLE PRODUCTS CREATED BY HIGHLY SKILLED CRAFTSMANSHIP IN EACH OF OUR PRODUCTS.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-10 py-4 bg-primary text-dark font-bold text-xl rounded-full hover:bg-yellow-400 transition shadow-lg"
          >
            FOLLOW FOR MORE
          </button>
        </div>
      </section >

      {/* Floating Cart (Restored) */}
      {
        cartCount > 0 && (
          <Link
            to="/cart"
            className="fixed bottom-8 right-8 bg-primary hover:bg-yellow-400 text-dark w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-50"
            title="Go to Cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="absolute -top-1 -right-1 bg-dark text-white text-xs w-6 h-6 rounded-full flex items-center justify-center border-2 border-white font-bold">
              {cartCount}
            </span>
          </Link>
        )
      }
    </div >
  );
}

export default Home;

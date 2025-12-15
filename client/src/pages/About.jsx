import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaRocket, FaStar, FaHeart, FaUsers, FaLeaf, FaShieldAlt } from 'react-icons/fa';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-light pt-24">
      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-white via-yellow-50 to-white">
        {/* Floating Background Elements */}
        <motion.div
          animate={{ y: [-20, 20, -20], rotate: [0, 180, 360] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-10 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [20, -20, 20], rotate: [360, 180, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 right-10 w-48 h-48 bg-yellow-300/10 rounded-full blur-3xl"
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl font-black text-dark mb-6"
            >
              About <span className="text-primary">Lunaria</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Your one-stop destination for the latest fashion trends. We blend <span className="font-bold text-primary">style, quality,</span> and <span className="font-bold text-primary">innovation</span> to bring you an unforgettable shopping experience.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(250, 204, 21, 0.3)" }}
              className="bg-gradient-to-br from-primary via-yellow-400 to-primary p-10 rounded-3xl shadow-xl relative overflow-hidden group"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"
              />
              <FaRocket className="text-6xl text-dark mb-4 group-hover:scale-110 transition-transform" />
              <h2 className="text-3xl font-black text-dark mb-4">Our Mission</h2>
              <p className="text-dark/80 text-lg leading-relaxed">
                To empower everyone to express themselves through fashion, making style and innovation accessible to all while maintaining uncompromising quality and sustainability.
              </p>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
              className="bg-dark p-10 rounded-3xl shadow-xl relative overflow-hidden group"
            >
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-2xl"
              />
              <FaStar className="text-6xl text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h2 className="text-3xl font-black text-white mb-4">Our Vision</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                To be the most trusted and loved destination for modern shoppers, revolutionizing fashion e-commerce with cutting-edge AI technology and exceptional customer experiences.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-dark mb-4">Our Core Values</h2>
            <p className="text-gray-600 text-lg">The principles that guide everything we do</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Value 1 - Customer First */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all group text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-20 h-20 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform"
              >
                <FaHeart className="text-4xl text-dark" />
              </motion.div>
              <h3 className="text-2xl font-bold text-dark mb-3">Customer Obsession</h3>
              <p className="text-gray-600">Your satisfaction is our top priority. We go above and beyond to exceed expectations.</p>
            </motion.div>

            {/* Value 2 - Innovation */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all group text-center"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-20 h-20 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center"
              >
                <FaRocket className="text-4xl text-dark" />
              </motion.div>
              <h3 className="text-2xl font-bold text-dark mb-3">Innovation</h3>
              <p className="text-gray-600">Embracing AI and technology to create the future of fashion e-commerce.</p>
            </motion.div>

            {/* Value 3 - Sustainability */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all group text-center"
            >
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-20 h-20 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center"
              >
                <FaLeaf className="text-4xl text-dark" />
              </motion.div>
              <h3 className="text-2xl font-bold text-dark mb-3">Sustainability</h3>
              <p className="text-gray-600">Committed to eco-friendly practices and responsible fashion choices.</p>
            </motion.div>

            {/* Value 4 - Quality */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all group text-center"
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center"
              >
                <FaShieldAlt className="text-4xl text-dark" />
              </motion.div>
              <h3 className="text-2xl font-bold text-dark mb-3">Quality Assurance</h3>
              <p className="text-gray-600">Every product hand-picked and verified to meet our high standards.</p>
            </motion.div>

            {/* Value 5 - Inclusivity */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all group text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="w-20 h-20 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center"
              >
                <FaUsers className="text-4xl text-dark" />
              </motion.div>
              <h3 className="text-2xl font-bold text-dark mb-3">Inclusivity</h3>
              <p className="text-gray-600">Fashion for everyone, celebrating diversity in all shapes, sizes, and styles.</p>
            </motion.div>

            {/* Value 6 - Trust */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all group text-center"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="w-20 h-20 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center"
              >
                <FaStar className="text-4xl text-dark" />
              </motion.div>
              <h3 className="text-2xl font-bold text-dark mb-3">Integrity</h3>
              <p className="text-gray-600">Transparent practices, honest pricing, and ethical business operations.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-dark mb-4">Our Journey</h2>
            <p className="text-gray-600 text-lg">From vision to reality</p>
          </motion.div>

          <div className="space-y-12">
            {/* Timeline Item 1 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex gap-6 items-start"
            >
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center font-black text-dark text-xl">
                  2025
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-dark mb-2">Lunaria is Born</h3>
                <p className="text-gray-600 text-lg">Started with a simple vision: make fashion accessible, affordable, and exciting for everyone.</p>
              </div>
            </motion.div>

            {/* Timeline Item 2 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex gap-6 items-start md:flex-row-reverse"
            >
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center font-black text-dark text-xl">
                  AI
                </div>
              </div>
              <div className="flex-1 md:text-right">
                <h3 className="text-2xl font-bold text-dark mb-2">AI Try-On Launch</h3>
                <p className="text-gray-600 text-lg">Revolutionized online shopping with cutting-edge virtual try-on technology.</p>
              </div>
            </motion.div>

            {/* Timeline Item 3 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex gap-6 items-start"
            >
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center font-black text-dark text-xl">
                  10K+
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-dark mb-2">Growing Community</h3>
                <p className="text-gray-600 text-lg">Reached 10,000+ happy customers across 50+ cities, building a vibrant fashion community.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-yellow-400 to-primary relative overflow-hidden">
        <motion.div
          animate={{ y: [-20, 20, -20], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [20, -20, 20], scale: [1.2, 1, 1.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-dark mb-6">Join the Lunaria Family</h2>
            <p className="text-dark/80 text-xl mb-8">Be part of the fashion revolution. Discover your unique style today!</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/products')}
              className="px-12 py-4 bg-dark text-white rounded-full font-black text-lg hover:bg-gray-800 transition-all shadow-2xl"
            >
              Start Shopping
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
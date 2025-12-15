import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for reaching out! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-7xl font-black text-dark mb-6"
            >
              Get in <span className="text-primary">Touch</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto"
            >
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info & Form Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side - Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-black text-dark mb-8">Contact Information</h2>
              <p className="text-gray-600 text-lg mb-10">
                Fill out the form and our team will get back to you within 24 hours.
              </p>

              {/* Contact Cards */}
              <div className="space-y-6">
                {/* Email Card */}
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition-all group"
                >
                  <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FaEnvelope className="text-2xl text-dark" />
                  </div>
                  <div>
                    <h3 className="font-bold text-dark mb-1">Email</h3>
                    <a href="mailto:support@lunaria.com" className="text-gray-600 hover:text-primary transition-colors">
                      support@lunaria.com
                    </a>
                  </div>
                </motion.div>

                {/* Phone Card */}
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition-all group"
                >
                  <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FaPhone className="text-2xl text-dark" />
                  </div>
                  <div>
                    <h3 className="font-bold text-dark mb-1">Phone</h3>
                    <a href="tel:+11234567890" className="text-gray-600 hover:text-primary transition-colors">
                      +1 (123) 456-7890
                    </a>
                  </div>
                </motion.div>

                {/* Address Card */}
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition-all group"
                >
                  <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FaMapMarkerAlt className="text-2xl text-dark" />
                  </div>
                  <div>
                    <h3 className="font-bold text-dark mb-1">Address</h3>
                    <p className="text-gray-600">123 Fashion Avenue<br />Tech City, TC 12345</p>
                  </div>
                </motion.div>
              </div>

              {/* Social Media Links */}
              <div className="mt-12">
                <h3 className="font-bold text-dark mb-4 text-xl">Follow Us</h3>
                <div className="flex gap-4">
                  <motion.a
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href="#"
                    className="w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:shadow-lg transition-all"
                  >
                    <FaFacebook className="text-xl text-dark" />
                  </motion.a>
                  <motion.a
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href="#"
                    className="w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:shadow-lg transition-all"
                  >
                    <FaInstagram className="text-xl text-dark" />
                  </motion.a>
                  <motion.a
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    href="#"
                    className="w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:shadow-lg transition-all"
                  >
                    <FaTwitter className="text-xl text-dark" />
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-3xl shadow-2xl border-4 border-gray-100"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Your Name *</label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none text-dark transition-all"
                    required
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none text-dark transition-all"
                    required
                  />
                </div>

                {/* Subject Input */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Subject *</label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can we help?"
                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none text-dark transition-all"
                    required
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Message *</label>
                  <motion.textarea
                    whileFocus={{ scale: 1.02 }}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us what you're thinking about..."
                    rows={6}
                    className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none text-dark resize-none transition-all"
                    required
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(250, 204, 21, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 bg-primary text-dark font-black text-lg rounded-xl hover:bg-yellow-400 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <FaPaperPlane className="text-xl" />
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black text-dark mb-4">Visit Our Store</h2>
            <p className="text-gray-600 text-lg">We'd love to see you in person!</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-gray-200 h-96 rounded-3xl shadow-2xl overflow-hidden relative"
          >
            {/* Map Placeholder - Replace with actual map integration */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
              <div className="text-center">
                <FaMapMarkerAlt className="text-6xl text-primary mb-4 mx-auto" />
                <p className="text-dark font-bold text-xl">123 Fashion Avenue</p>
                <p className="text-dark/70">Tech City, TC 12345</p>
                <p className="text-sm text-dark/60 mt-4">(Embed Google Maps here)</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-20 bg-dark text-white relative overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 right-10 w-32 h-32 border-4 border-primary/20 rounded-full"
        />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-5xl font-black text-primary mb-2">24/7</div>
              <p className="text-gray-400 font-semibold">Customer Support</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-5xl font-black text-primary mb-2">&lt;24h</div>
              <p className="text-gray-400 font-semibold">Response Time</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-5xl font-black text-primary mb-2">99%</div>
              <p className="text-gray-400 font-semibold">Satisfaction Rate</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
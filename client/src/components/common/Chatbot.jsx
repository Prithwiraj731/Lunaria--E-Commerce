import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "Hi! I'm your Lunaria fashion assistant! 👗 How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Smart response system
  const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();

    // Greetings
    if (msg.match(/^(hi|hello|hey|good morning|good afternoon|good evening)/)) {
      return "Hello! Welcome to Lunaria! 👋 I'm here to help you find the perfect outfit. What are you looking for today?";
    }

    // How-to guides (check FIRST to avoid false matches)
    if (msg.includes('how') && (msg.includes('order') || msg.includes('purchase') || msg.includes('buy'))) {
      return "📝 **How to Place an Order:**\n1. Browse products or search\n2. Click on a product you like\n3. Select size and quantity\n4. Click 'Add to Cart'\n5. Go to Cart and click 'Checkout'\n6. Fill in shipping address\n7. Add payment method\n8. Review and place order!\nThat's it! 🎉";
    }
    if (msg.includes('card') || msg.includes('payment method')) {
      return "💳 **How to Add a Payment Card:**\n1. Go to 'My Account'\n2. Click on 'Payment Methods'\n3. Click 'Add New Card'\n4. Enter card details (number, expiry, CVV)\n5. Click 'Save Card'\n\nYour card will be saved for faster checkout! All payments are 100% secure. 🔒";
    }
    if (msg.includes('address') || msg.includes('shipping address')) {
      return "🏠 **How to Add an Address:**\n1. Go to 'My Account'\n2. Click on 'Addresses'\n3. Click 'Add New Address'\n4. Fill in:\n   - Full Name\n   - Phone Number\n   - Address, City, State\n   - Pincode\n5. Click 'Save Address'\n\nYou can save multiple addresses for easy checkout!";
    }

    // Product queries
    if (msg.includes('dress') || msg.includes('dresses')) {
      return "We have beautiful dresses for women! You can check out our collection by clicking here or saying 'show women'. Would you like to see them?";
    }
    if (msg.includes('shirt') || msg.includes('t-shirt') || msg.includes('tshirt')) {
      return "Great choice! We have stylish shirts and t-shirts for men, women, and kids. Which category interests you?";
    }
    if (msg.includes('jacket') || msg.includes('coat')) {
      return "Perfect for the season! We have trendy jackets in our men's and women's collections. What's your preference?";
    }
    if (msg.includes('jeans') || msg.includes('pants') || msg.includes('trousers')) {
      return "We have comfortable jeans and pants for all ages! Check out our Men, Women, or Kids sections.";
    }

    // Categories
    if (msg.includes('women') || msg.includes('woman') || msg.includes('ladies')) {
      setTimeout(() => navigate('/category/women'), 500);
      return "Taking you to our Women's collection now! 👗";
    }
    if (msg.includes('men') || msg.includes('man') || msg.includes('boys')) {
      setTimeout(() => navigate('/category/men'), 500);
      return "Redirecting to Men's fashion! 👔";
    }
    if (msg.includes('kids') || msg.includes('children') || msg.includes('child')) {
      setTimeout(() => navigate('/category/kids'), 500);
      return "Here's our Kids collection! 🧒";
    }
    if (msg.includes('all products') || msg.includes('show all') || msg.includes('catalog')) {
      setTimeout(() => navigate('/products'), 500);
      return "Showing all our products! 🛍️";
    }

    // Policies
    if (msg.includes('shipping') || msg.includes('delivery')) {
      return "🚚 **Shipping Info:**\n- FREE shipping on orders over ₹999\n- Standard delivery: 5-7 business days\n- Express delivery available\n- Track your order anytime!";
    }
    if (msg.includes('return') || msg.includes('refund') || msg.includes('exchange')) {
      return "🔄 **Returns & Exchanges:**\n- 30-day easy return policy\n- Free returns on all orders\n- Exchange for different size/color\n- Refund processed within 5-7 days";
    }
    if (msg.includes('payment') || msg.includes('pay')) {
      return "💳 **Payment Options:**\n- Credit/Debit Cards\n- UPI (Google Pay, PhonePe, etc.)\n- Net Banking\n- Cash on Delivery (₹50 extra)\nAll payments are 100% secure!";
    }
    if (msg.includes('size') || msg.includes('sizing')) {
      return "📏 **Size Guide:**\nWe have sizes from XS to XXL. Each product page has a detailed size chart. Need help finding your size? Let me know!";
    }

    // About Lunaria
    if (msg.includes('about') || msg.includes('lunaria') || msg.includes('who are you')) {
      return "🌙 **About Lunaria:**\n- Est. 2025\n- 10,000+ happy customers\n- 50+ cities covered\n- 4.9★ average rating\n- Premium fashion for everyone!";
    }
    if (msg.includes('what is lunaria')) {
      return "🌙 **Lunaria** is your premium fashion e-commerce store! We offer:\n✨ Trendy clothing for Women, Men & Kids\n🚚 Free shipping over ₹999\n🔄 Easy 30-day returns\n⭐ Trusted by 10K+ customers\nShop the latest fashion at great prices!";
    }

    // Contact
    if (msg.includes('contact') || msg.includes('email') || msg.includes('phone') || msg.includes('support')) {
      return "📞 **Contact Us:**\n- Email: support@lunaria.com\n- Phone: +1 (123) 456-7890\n- 24/7 Customer Support\n- Response within 2 hours!";
    }

    // Order tracking
    if (msg.includes('order') || msg.includes('track')) {
      return "📦 To track your order, please go to 'My Account' → 'Orders'. You'll need your order ID. Need help?";
    }

    // Help
    if (msg.includes('help') || msg.includes('assist')) {
      return "I can help you with:\n✨ Finding products\n🛍️ Shopping categories\n📦 Order tracking\n🚚 Shipping info\n💳 Payment options\n🔄 Returns & exchanges\n\nWhat would you like to know?";
    }

    // Thanks
    if (msg.includes('thank') || msg.includes('thanks')) {
      return "You're welcome! Happy to help! 😊 Is there anything else you'd like to know?";
    }

    // Bye
    if (msg.includes('bye') || msg.includes('goodbye')) {
      return "Goodbye! Come back anytime. Happy shopping at Lunaria! 🛍️✨";
    }

    // Default response
    return "I'm here to help! You can ask me about:\n\n👗 Products (dresses, shirts, jackets)\n📂 Categories (Women, Men, Kids)\n🚚 Shipping & delivery\n🔄 Returns & exchanges\n💳 Payment methods\n\nWhat would you like to know?";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      type: 'user',
      text: input,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Show typing indicator
    setIsTyping(true);

    // Simulate typing delay (1-2 seconds)
    setTimeout(() => {
      const botResponse = {
        type: 'bot',
        text: getBotResponse(input),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 800 + Math.random() * 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Quick action buttons
  const quickActions = [
    { label: "What is Lunaria?", action: () => setInput("What is Lunaria?") },
    { label: "How to Order", action: () => setInput("How do I place an order?") },
    { label: "Add Payment Card", action: () => setInput("How do I add a payment card?") },
    { label: "Add Address", action: () => setInput("How do I add my address?") },
    { label: "Women's Fashion", action: () => setInput("Show women's collection") },
    { label: "Men's Fashion", action: () => setInput("Show men's collection") },
    { label: "Kids Clothing", action: () => setInput("Show kids collection") },
    { label: "Shipping Info", action: () => setInput("What's your shipping policy?") },
    { label: "Returns", action: () => setInput("What's your return policy?") },
    { label: "Track Order", action: () => setInput("How do I track my order?") },
    { label: "Contact Support", action: () => setInput("How do I contact support?") },
    { label: "Help", action: () => setInput("I need help") },
  ];

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-primary via-yellow-400 to-primary rounded-full shadow-2xl flex items-center justify-center z-50 hover:shadow-primary/50 transition-all group"
      >
        {isOpen ? (
          <svg className="w-8 h-8 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <>
            <svg className="w-8 h-8 text-dark group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {/* Notification dot */}
            {!isOpen && (
              <motion.div
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center"
              >
                <span className="text-white text-xs font-bold">1</span>
              </motion.div>
            )}
          </>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ duration: 0.3, type: 'spring' }}
            className="fixed bottom-24 right-6 w-[380px] h-[600px] bg-white rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden border-4 border-primary"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary via-yellow-400 to-primary p-4 flex items-center gap-3 shadow-lg">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md"
              >
                <span className="text-2xl">🛍️</span>
              </motion.div>
              <div className="flex-1">
                <h3 className="font-black text-dark text-lg">Lunaria Assistant</h3>
                <div className="flex items-center gap-1">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-2 h-2 bg-green-500 rounded-full"
                  />
                  <p className="text-dark/70 text-xs font-semibold">Online • Ready to help!</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Quick Actions */}
            <div className="p-3 bg-gray-50 border-b-2 border-primary/20 max-h-28 overflow-y-auto">
              <p className="text-xs text-gray-600 font-semibold mb-2">Quick Actions:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      action.action();
                      setTimeout(handleSend, 100);
                    }}
                    className="px-3 py-2 bg-primary text-dark text-xs font-bold rounded-lg hover:bg-yellow-400 transition-colors shadow-md text-left"
                  >
                    {action.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-end gap-2 max-w-[80%] ${msg.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.type === 'user' ? 'bg-dark' : 'bg-primary'
                      }`}>
                      <span className="text-sm">
                        {msg.type === 'user' ? '👤' : '🛍️'}
                      </span>
                    </div>

                    {/* Message bubble */}
                    <div
                      className={`px-4 py-3 rounded-2xl shadow-md ${msg.type === 'user'
                        ? 'bg-dark text-white rounded-br-none'
                        : 'bg-white border-2 border-primary text-dark rounded-bl-none'
                        }`}
                    >
                      <p className="text-sm whitespace-pre-line leading-relaxed">{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.type === 'user' ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-end gap-2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-sm">🛍️</span>
                    </div>
                    <div className="bg-white border-2 border-primary rounded-2xl rounded-bl-none p-4 shadow-md">
                      <div className="flex gap-1">
                        <motion.div
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                          className="w-2 h-2 bg-primary rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                          className="w-2 h-2 bg-primary rounded-full"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.5, 1] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                          className="w-2 h-2 bg-primary rounded-full"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t-4 border-primary shadow-lg">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 rounded-full border-2 border-gray-200 focus:border-primary focus:outline-none text-dark font-medium"
                  disabled={isTyping}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={isTyping || !input.trim()}
                  className="w-12 h-12 bg-gradient-to-br from-primary to-yellow-400 rounded-full flex items-center justify-center hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  <svg className="w-6 h-6 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
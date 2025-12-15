import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCreditCard, FaPlus, FaMapMarkerAlt, FaTimes, FaUser } from 'react-icons/fa';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, fetchCart } = useCart();
  const { user } = useUser();
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showNewCard, setShowNewCard] = useState(false);
  const [newCard, setNewCard] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [error, setError] = useState('');
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    street: '',
    city: '',
    state: '',
    pin: '',
    type: 'home'
  });

  // Contact Information
  const [contactInfo, setContactInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    // Auto-populate contact info from user profile
    if (user) {
      setContactInfo({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }

    // Fetch cards and addresses on mount
    const fetchCards = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res = await axios.get('http://localhost:3000/user/card', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCards(res.data.cards || []);
      } catch (err) {
        console.error('Error fetching cards:', err);
        setCards([]);
      }
    };
    const fetchAddresses = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res = await axios.get('http://localhost:3000/user/address', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAddresses(res.data.addresses || []);
      } catch (err) {
        console.error('Error fetching addresses:', err);
        setAddresses([]);
      }
    };
    fetchCards();
    fetchAddresses();
  }, [user]);

  const handleCardSelect = idx => {
    setSelectedCard(idx);
    setShowNewCard(false);
    setError('');
  };

  const handleNewCardChange = e => {
    const { name, value } = e.target;

    // Auto-format expiry date
    if (name === 'expiry') {
      let formatted = value.replace(/\D/g, ''); // Remove non-digits
      if (formatted.length >= 2) {
        formatted = formatted.slice(0, 2) + '/' + formatted.slice(2, 4);
      }
      setNewCard({ ...newCard, expiry: formatted });
    } else if (name === 'number') {
      // Only allow digits for card number
      const digits = value.replace(/\D/g, '').slice(0, 16);
      setNewCard({ ...newCard, number: digits });
    } else if (name === 'cvv') {
      // Only allow digits for CVV
      const digits = value.replace(/\D/g, '').slice(0, 3);
      setNewCard({ ...newCard, cvv: digits });
    } else {
      setNewCard({ ...newCard, [name]: value });
    }
    setError('');
  };

  const handleNewAddressChange = e => {
    const { name, value } = e.target;
    if (name === 'pin') {
      // Only allow digits for PIN
      const digits = value.replace(/\D/g, '').slice(0, 6);
      setNewAddress({ ...newAddress, pin: digits });
    } else {
      setNewAddress({ ...newAddress, [name]: value });
    }
    setError('');
  };

  const validateCard = () => {
    const { number, name, expiry, cvv } = newCard;
    if (!number || number.length !== 16) return 'Card number must be 16 digits.';
    if (!name.trim()) return 'Cardholder name is required.';

    // Validate expiry format and date
    if (!expiry.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) return 'Expiry must be MM/YY format.';
    const [month, year] = expiry.split('/').map(Number);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // Get last 2 digits
    const currentMonth = currentDate.getMonth() + 1;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return 'Card has expired.';
    }

    if (!cvv || cvv.length !== 3) return 'CVV must be 3 digits.';
    return '';
  };

  const validateAddress = () => {
    const { street, city, state, pin } = newAddress;
    if (!street.trim()) return 'Street address is required.';
    if (!city.trim()) return 'City is required.';
    if (!state.trim()) return 'State is required.';
    if (!pin || pin.length !== 6) return 'PIN code must be 6 digits.';
    return '';
  };

  const handleAddAddress = async () => {
    const errMsg = validateAddress();
    if (errMsg) {
      setError(errMsg);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:3000/user/address', newAddress, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAddresses([...addresses, res.data.address]);
      setSelectedAddress(res.data.address);
      setShowNewAddress(false);
      setNewAddress({ street: '', city: '', state: '', pin: '', type: 'home' });
      setError('');
    } catch (err) {
      setError('Failed to add address.');
    }
  };

  const handleAddCard = async () => {
    const errMsg = validateCard();
    if (errMsg) {
      setError(errMsg);
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const cardData = {
        number: newCard.number,
        expiryDate: newCard.expiry,
        cvv: newCard.cvv
      };

      const res = await axios.post('http://localhost:3000/user/card', cardData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Add to local state
      const addedCard = {
        number: newCard.number,
        expiry: newCard.expiry,
        name: newCard.name
      };
      setCards([...cards, addedCard]);
      setSelectedCard(cards.length);
      setShowNewCard(false);
      setNewCard({ number: '', name: '', expiry: '', cvv: '' });
      setError('');
      alert('Card added successfully!');
    } catch (err) {
      console.error('Add card error:', err);
      setError(err.response?.data?.msg || 'Failed to add card.');
    }
  };

  const handleProceed = async () => {
    setError('');
    if (cartItems.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    // Validate contact information
    if (!contactInfo.name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!contactInfo.email.trim() || !contactInfo.email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!contactInfo.phone.trim() || contactInfo.phone.length < 10) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    if (!selectedAddress) {
      setError('Please select a shipping address.');
      return;
    }

    let paymentMethod = 'online';
    let paymentReciptId = 'dummy-receipt';

    if (showNewCard) {
      const errMsg = validateCard();
      if (errMsg) {
        setError(errMsg);
        return;
      }
      paymentMethod = 'online';
      paymentReciptId = `card-${newCard.number.slice(-4)}`;
    } else if (selectedCard !== null) {
      paymentMethod = 'online';
      paymentReciptId = `card-${cards[selectedCard].number.slice(-4)}`;
    } else {
      setError('Please select a payment card or add a new one.');
      return;
    }


    // Place order with contact info, selected payment and address
    const orderPayload = {
      orderItems: cartItems.map(item => ({
        product: item.product._id,
        quantity: item.quantity,
        color: item.color,
        size: item.size
      })),
      shippingAddress: selectedAddress._id,
      totalPrice: cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0),
      paymentMethod,
      paymentReciptId,
      // Contact Information
      customerName: contactInfo.name,
      customerEmail: contactInfo.email,
      customerPhone: contactInfo.phone
    };

    console.log('Contact Info:', contactInfo);
    console.log('Order Payload:', orderPayload);

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3000/order', orderPayload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Clear cart
      await axios.post('http://localhost:3000/cart/clear', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchCart();
      navigate('/order-success');
    } catch (err) {
      console.error('Order error:', err);
      setError('Failed to place order. Please try again.');
    }
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-light px-4 py-10 pt-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-dark mb-8 text-center">Checkout</h1>

        {/* Contact Information Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-dark mb-4 flex items-center gap-2">
            <FaUser className="text-primary" />
            Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-primary text-dark"
                placeholder="John Doe"
                value={contactInfo.name}
                onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-primary text-dark"
                placeholder="john@example.com"
                value={contactInfo.email}
                onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
              <input
                type="tel"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-primary text-dark"
                placeholder="1234567890"
                maxLength={10}
                value={contactInfo.phone}
                onChange={(e) => {
                  const digits = e.target.value.replace(/\D/g, '');
                  setContactInfo({ ...contactInfo, phone: digits });
                }}
              />
            </div>
          </div>
        </div>

        {/* Shipping Address Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-dark flex items-center gap-2">
              <FaMapMarkerAlt className="text-primary" />
              Shipping Address
            </h2>
            {!showNewAddress && (
              <button
                onClick={() => setShowNewAddress(true)}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-dark rounded-full hover:bg-yellow-400 font-bold transition text-sm"
              >
                <FaPlus /> Add New
              </button>
            )}
          </div>

          {showNewAddress && (
            <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-dark">New Address</h3>
                <button
                  onClick={() => { setShowNewAddress(false); setError(''); }}
                  className="text-gray-500 hover:text-dark"
                >
                  <FaTimes />
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Street Address</label>
                  <input
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-dark"
                    type="text"
                    name="street"
                    placeholder="123 Main Street"
                    value={newAddress.street}
                    onChange={handleNewAddressChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">City</label>
                    <input
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-dark"
                      type="text"
                      name="city"
                      placeholder="City"
                      value={newAddress.city}
                      onChange={handleNewAddressChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">State</label>
                    <input
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-dark"
                      type="text"
                      name="state"
                      placeholder="State"
                      value={newAddress.state}
                      onChange={handleNewAddressChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">PIN Code</label>
                    <input
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-dark"
                      type="text"
                      name="pin"
                      placeholder="123456"
                      maxLength={6}
                      value={newAddress.pin}
                      onChange={handleNewAddressChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Address Type</label>
                    <select
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-dark"
                      name="type"
                      value={newAddress.type}
                      onChange={handleNewAddressChange}
                    >
                      <option value="home">Home</option>
                      <option value="office">Office</option>
                      <option value="friends and family">Friends & Family</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <button
                  onClick={handleAddAddress}
                  className="w-full bg-dark text-white py-2 rounded-lg hover:bg-gray-800 font-bold transition"
                >
                  Save Address
                </button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {addresses.length === 0 && !showNewAddress && (
              <p className="text-gray-500 text-center py-4">No saved addresses. Add one above.</p>
            )}
            {addresses.map((addr) => (
              <div
                key={addr._id}
                className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedAddress && selectedAddress._id === addr._id
                  ? 'border-primary bg-yellow-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                onClick={() => { setSelectedAddress(addr); setError(''); }}
              >
                <div className="flex-1">
                  <div className="font-bold text-dark capitalize">{addr.type} Address</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {addr.street}, {addr.city}, {addr.state} - {addr.pin}
                  </div>
                </div>
                {selectedAddress && selectedAddress._id === addr._id && (
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <svg className="w-4 h-4 text-dark" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Payment Card Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-dark flex items-center gap-2">
              <FaCreditCard className="text-primary" />
              Payment Method
            </h2>
            {!showNewCard && (
              <button
                onClick={() => { setShowNewCard(true); setSelectedCard(null); }}
                className="flex items-center gap-2 px-4 py-2 bg-primary text-dark rounded-full hover:bg-yellow-400 font-bold transition text-sm"
              >
                <FaPlus /> Add New
              </button>
            )}
          </div>

          {showNewCard && (
            <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-dark">New Card Details</h3>
                <button
                  onClick={() => { setShowNewCard(false); setError(''); }}
                  className="text-gray-500 hover:text-dark"
                >
                  <FaTimes />
                </button>
              </div>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Card Number</label>
                  <input
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-dark"
                    type="text"
                    name="number"
                    placeholder="1234567812345678"
                    maxLength={16}
                    value={newCard.number}
                    onChange={handleNewCardChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Cardholder Name</label>
                  <input
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-dark"
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={newCard.name}
                    onChange={handleNewCardChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Expiry Date (MM/YY)</label>
                    <input
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-dark"
                      type="text"
                      name="expiry"
                      placeholder="MM/YY"
                      maxLength={5}
                      value={newCard.expiry}
                      onChange={handleNewCardChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">CVV</label>
                    <input
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-dark"
                      type="password"
                      name="cvv"
                      placeholder="123"
                      maxLength={3}
                      value={newCard.cvv}
                      onChange={handleNewCardChange}
                    />
                  </div>
                </div>
                <button
                  onClick={handleAddCard}
                  className="w-full bg-dark text-white py-2 rounded-lg hover:bg-gray-800 font-bold transition"
                >
                  Save Card
                </button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {cards.length === 0 && !showNewCard && (
              <p className="text-gray-500 text-center py-4">No saved cards. Add one above.</p>
            )}
            {cards.map((card, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedCard === idx
                  ? 'border-primary bg-yellow-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                onClick={() => handleCardSelect(idx)}
              >
                <FaCreditCard className="text-primary text-2xl" />
                <div className="flex-1">
                  <div className="font-bold text-dark">**** **** **** {card.number.slice(-4)}</div>
                  <div className="text-sm text-gray-600">Expires: {card.expiry || card.expiryDate}</div>
                </div>
                {selectedCard === idx && (
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <svg className="w-4 h-4 text-dark" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-dark mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal ({cartItems.length} items)</span>
              <span className="font-semibold">₹{totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Shipping</span>
              <span className="font-semibold text-green-600">FREE</span>
            </div>
            <hr className="my-3" />
            <div className="flex justify-between text-xl font-black text-dark">
              <span>Total</span>
              <span>₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-xl mb-4 font-semibold">
            {error}
          </div>
        )}

        {/* Proceed Button */}
        <button
          className="w-full bg-primary text-dark py-4 rounded-xl font-black text-xl shadow-xl hover:bg-yellow-400 transition-all transform hover:scale-105"
          onClick={handleProceed}
        >
          Place Order - ₹{totalAmount.toFixed(2)}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
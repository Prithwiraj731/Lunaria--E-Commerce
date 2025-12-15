import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white">
    <div className="bg-gray-900 rounded-2xl shadow-xl p-8 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold mb-4 text-fuchsia-500 drop-shadow-lg">Order Placed Successfully!</h1>
      <p className="text-lg text-gray-300 mb-6">Thank you for shopping with us. Your order has been placed and is being processed.</p>
      <Link to="/" className="bg-gradient-to-r from-fuchsia-600 to-fuchsia-800 rounded-lg px-6 py-3 font-bold text-white hover:scale-105 transition-all">Go to Home</Link>
    </div>
  </div>
);

export default OrderSuccess; 
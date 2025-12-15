const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address' }],
    cartItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Cart' }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    paymentCards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PaymentCard' }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);

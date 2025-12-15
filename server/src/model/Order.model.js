const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    orderItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
            },
            color: {
                type: String,
                required: true
            },
            size: {
                type: String,
                required: true
            }
        }
    ],
    shippingAddress: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['online', 'cashOnDelivery'],
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'cancelled', 'shipped', 'delivered'],
        default: 'pending'
    },
    paymentReciptId: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: false
    },
    customerEmail: {
        type: String,
        required: false
    },
    customerPhone: {
        type: String,
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);

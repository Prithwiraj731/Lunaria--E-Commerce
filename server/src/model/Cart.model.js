const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    quantity: {
        type: Number,
        default: 1,
        min: 1
    },
    color: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);

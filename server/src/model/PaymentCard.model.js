const mongoose = require('mongoose');

const paymentCardSchema = mongoose.Schema({
    cardHolder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    number: {
        type: String,
        required: true,
        unique: true,
        maxlength: 16,
        minlength: 16,
    },
    cvv: {
        type: String,
        required: true,
        maxlength: 3,
        minlength: 3
    },
    expiryDate: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('PaymentCard', paymentCardSchema);

const mongoose = require('mongoose')

const addressSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    pin: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['home', 'office', 'friends and family', 'other'],
        required: true
    }
})

module.exports = mongoose.model('Address', addressSchema)

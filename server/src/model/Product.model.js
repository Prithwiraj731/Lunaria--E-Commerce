const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    rating: {
        default: 3.5,
        type: Number
    },
    colors: {
        type: Array,
    },
    sizes: {
        type: Array,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['men', 'women', 'kids', 'Man', 'Woman', 'Kids', 'Unisex'],
        required: true
    }
})
module.exports = mongoose.model('Product', productSchema)
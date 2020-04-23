const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
    creator_id: {
        type: String
    },
    username: {
        type: String
    },
    avatar: {
        type: String
    },
    game: {
        type: String,
    },
    serveur: {
        type: String,
    },
    offer: {
        type: String
    },
    amount: {
        type: Number
    },
    price: {
        type: Number
    }, 
    created: {
        type: Date,
        default: Date.now()
    }
})

module.exports = Product = mongoose.model('products', productSchema);
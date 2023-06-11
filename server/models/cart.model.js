const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, "Please add userId"]
    },
    count: {
        type: Number,
        default: 0
    },
    items: [
        {
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Item",
                required: true
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]
})

module.exports.Cart = mongoose.model('Cart', CartSchema);
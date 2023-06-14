const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Item name is required"],
        maxlength: [25, "Name must be less than 25 characters"],
    },
    price: {
        type: Number,
        required: [true, "Listing price is required"]
    },
    condition: {
        type: String,
        required: [true, "Please specify the item's condition"]
    },
    description: {
        type: String,
        minlength: [10, "Description must be least 10 characters"],
        maxlength: [200, "Description must be below 200 characters"],
        required: [true, "Please type a description"]
    },
    inventory: {
        type: Number,
        required: [true, "Please specify inventory"]
    },
    category: {
        type: String,
        enum: ['electronics', 'collectibles', 'clothings', 'toys', 'furniture', 'others'],
        required: [true, "Please select a category"]
    },
    userId: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    myFile1: {
        type: String,
        required: false,
        default: ""
    }
    // myFile2: {
    //     type: String,
    //     required: false,
    //     default: ""
    // },
    // myFile3: {
    //     type: String,
    //     required: false,
    //     default: ""
    // }
}, {timestamps: true})


module.exports.Item = mongoose.model('Item', ItemSchema);
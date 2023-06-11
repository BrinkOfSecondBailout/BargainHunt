const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    message: 
        {
            type: String,
            required: [true, "Please type something"]
        },
    unread :
        {
            type: String,
            default: "true"
        }
    
}, {timestamps: true})

module.exports.Message = mongoose.model('Message', MessageSchema);
const mongoose = require('mongoose');

const InboxSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, "Please add inbox owner's id"]
    },
    newMessageCount: {
        type: Number,
        default: 0
    },
    messageThreads: [
        {
            correspondence: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            messages: [ 
                {
                    path: {
                        type: String,
                        required: true
                    },
                    message: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "Message",
                        required: [true, "Please enter a message"]
                    }
                }
            ],
            updatedAt: {
                type: Date,
                default: Date.now()
            }
        }
    ]
})

module.exports.Inbox = mongoose.model('Inbox', InboxSchema);
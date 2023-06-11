const mongoose = require('mongoose');

const WatchlistSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: [true, "Please add userId"]
    },
    items: [
        {
            item: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Item",
                required: true
            }
        }
    ]
})


module.exports.Watchlist = mongoose.model('Watchlist', WatchlistSchema);
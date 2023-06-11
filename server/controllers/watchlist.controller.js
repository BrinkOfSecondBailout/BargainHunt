const {Watchlist} = require('../models/watchlist.model');

module.exports.addToWatchlist = async (request, response) => {
    const id = request.params.id;
    try {
        const watchlist = await Watchlist.findOne({userId: id})
        watchlist.items.push({item: request.body.item})
        watchlist.save()
        response.json("Watchlist successfully updated")
    } catch(err) {
        response.json(err)
    }
}

module.exports.removeFromWatchlist = async (request, response) => {
    const id = request.params.id;
    const itemId = request.params.itemId;
    try {
        const watchlist = await Watchlist.findOne({userId: id})
        const itemIndex = watchlist.items.findIndex(item => item.item._id.toString() === itemId)
        if (itemIndex === -1) {
            return response.json("Item not found in cart")
        }
        watchlist.items.splice(itemIndex, 1);
        await watchlist.save();
        response.json("Item successfully removed")
    } catch(err) {
        response.json(err)
    }
}

module.exports.showMyWatchlist = async (request, response) => {
    const id = request.params.id;
    Watchlist.findOne({userId: id}).populate('items.item')
    .then(watchlist => {
        response.json(watchlist)
    })
    .catch(err => {
        response.json(err)
    })
}


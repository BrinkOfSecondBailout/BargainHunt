const {Item} = require('../models/item.model');
const {Watchlist} = require('../models/watchlist.model');
const {Cart} = require('../models/cart.model');


module.exports.newItem = async (request, response) => {
    Item.create({
        name: request.body.name,
        price: request.body.price,
        condition: request.body.condition,
        description: request.body.description,
        inventory: request.body.inventory,
        category: request.body.category,
        userId: request.body.userId,
        user: request.body.user,
        myFile1: request.body.myFile1
        // myFile2: request.body.myFile2,
        // myFile3: request.body.myFile3
    })
        .then(item => response.json(item))
        .catch(err => response.status(400).json(err))
}

module.exports.editItem = async (request, response) => {
    Item.findOneAndUpdate({_id: request.params.id}, request.body, {new:true, runValidators: true})
        .then(updatedItem => response.json(updatedItem))
        .catch(err => response.status(400).json(err))
}

module.exports.getAll = async (request, response) => {
    Item.find({})
        .then(items => {
            response.json(items)
        })
        .catch(err => {
            response.json(err)
        })
}

module.exports.getOne = async (request, response) => {
    Item.findOne({_id: request.params.id}).populate('user')
        .then(item => {
            response.json(item)
        })
        .catch(err => {
            response.json(err)
        })
}

module.exports.getAllByUser = async (request, response) => {
    Item.find({userId: request.params.userId})
        .then(items => {
            response.json(items)
        })
        .catch(err => {
            response.json(err)
        })
}

module.exports.getAllNotByUser = async (request, response) => {
    Item.find({ userId: { $ne: request.params.userId} })
        .then(items => {
            response.json(items)
        })
        .catch(err => {
            response.json(err)
        })
}

module.exports.getAllByCategory = async (request, response) => {
    Item.find({category: request.params.category})
        .then(items => {
            response.json(items)
        })
        .catch(err => {
            response.json(err)
        })
}

// module.exports.deleteItem = async (request, response) => {
//     Item.deleteOne({_id: request.params.itemId})
//         .then(deleteConfirmation => response.json(deleteConfirmation))
//         .catch(err => response.json(err))
// }

module.exports.deleteItem = async (request, response) => {
    const itemId = request.params.itemId;

    try {
        await Item.deleteOne({_id: itemId})
        await Watchlist.deleteMany({ 'items.item': itemId });
        // await Cart.deleteMany({ 'items.item': itemId });
        await Cart.updateMany(
            { 'items.item': itemId },
            { $pull: { items: { item: itemId } }, $inc: { count: -1 } }
        );
        return response.json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error(error);
        return response.status(500).json({ error: 'Internal server error' });
    }
};

module.exports.getAllBySearch = async (request, response) => {
    const query = request.params.searchQuery
    try {
        const items = await Item.find({ $or: [
            {name: {$regex: query, $options: 'i'}},
            {description: {$regex: query, $options: 'i'}}
        ]
        });
        response.json(items)
    } catch (err) {
        response.json("Internal server error")
    }
}
const ItemController = require('../controllers/item.controller');

module.exports = function(app) {
    app.post('/api/items', ItemController.newItem);
    app.patch('/api/items/:id', ItemController.editItem);
    app.get('/api/items', ItemController.getAll);
    app.get('/api/items/:id', ItemController.getOne);
    app.get('/api/items/filter/:category', ItemController.getAllByCategory);
    app.get('/api/items/search/:searchQuery', ItemController.getAllBySearch);
    app.get('/api/items/show/:userId', ItemController.getAllByUser);
    app.get('/api/items/shownot/:userId', ItemController.getAllNotByUser);
    app.delete('/api/items/delete/:itemId', ItemController.deleteItem);
}
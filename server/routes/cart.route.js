const CartController = require('../controllers/cart.controller');

module.exports = function(app) {
    app.post('/api/cart/add/:id', CartController.addToCart);
    app.get('/api/cart/show/:id', CartController.showMyCart);
    app.patch('/api/cart/update/:id', CartController.updateQuantity);
    app.delete('/api/cart/removeItem/:id/:cartId/:itemId', CartController.removeFromCart);
}

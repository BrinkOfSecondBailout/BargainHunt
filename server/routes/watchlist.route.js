const WatchlistController = require('../controllers/watchlist.controller');

module.exports = function(app) {
    app.post('/api/watchlist/add/:id', WatchlistController.addToWatchlist);
    app.get('/api/watchlist/show/:id', WatchlistController.showMyWatchlist);
    app.delete('/api/watchlist/remove/:id/:itemId', WatchlistController.removeFromWatchlist);
}
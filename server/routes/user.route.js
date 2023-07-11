const UserController = require('../controllers/user.controller');

module.exports = function(app) {
    app.post('/api/login', UserController.login);
    app.post('/api/register', UserController.register);
    app.post('/api/users/rating/:id', UserController.addRating);
    app.get('/api/users/average/:id', UserController.findAverageRating);
    app.get('/api/users/rating/check/:id/:raterId', UserController.checkIfRated);
    app.get('/api/users/:id', UserController.getOneUser);
    app.get('/api/users/ratings/:id', UserController.getAllRatings);
    app.get('/api/users', UserController.getAllUsers);
    app.patch('/api/users/location/update/:id', UserController.updateLocation);
    app.patch('/api/users/profile/:id', UserController.updatePicture);
    app.patch('/api/users/update/:id', UserController.updateProfile);
}
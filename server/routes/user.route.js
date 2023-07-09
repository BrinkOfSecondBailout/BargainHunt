const UserController = require('../controllers/user.controller');

module.exports = function(app) {
    app.post('/api/login', UserController.login);
    app.post('/api/register', UserController.register);
    app.get('/api/users/:id', UserController.getOneUser);
    app.get('/api/users', UserController.getAllUsers);
    app.patch('/api/users/location/update/:id', UserController.updateLocation);
    app.patch('/api/users/profile/:id', UserController.updatePicture);
    app.patch('/api/users/update/:id', UserController.updateProfile);
}
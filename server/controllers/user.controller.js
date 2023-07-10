const {User} = require('../models/user.model');
const {Cart} = require('../models/cart.model');
const {Watchlist} = require('../models/watchlist.model');
const {Inbox} = require('../models/inbox.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
    return jwt.sign({_id: _id}, 'dannydevelopersatoshi', {expiresIn: '3d'})
}


module.exports.register = async (request, response) => {
    const user = await User.findOne({
        email: request.body.email
    })

    if (user) {
        return response.status(400).json({errors: {email: {message: "Email already in the database"}}})
    }

    User.create({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        password: request.body.password
    })
        .then (user => {
            const token = createToken(user._id)
            const cart = Cart.create({
                userId: user._id
            })
            const watchlist = Watchlist.create({
                userId: user._id
            })
            const inbox = Inbox.create({
                userId: user._id
            })
            response.json({id: user._id, token})
        })
        .catch(err => {
            console.log(err);
            response.status(400).json(err);
        })

}

module.exports.login = async (request, response) => {
    if (request.body.email.length < 1) {
        return response.status(400).json("Please enter an email")
    }
    const user = await User.findOne({
        email: request.body.email
    })
    if (user) {
        const isMatching = await bcrypt.compare(request.body.password, user.password);
        if (isMatching) {
            const token = createToken(user._id)
            return response.json({id: user._id, token})
        } else {
            return response.status(401).json("Please make sure your password is correct")
        }
    } else {
        return response.status(401).json("Email does not exist in database")
    }
}

module.exports.getOneUser = (request, response) => {
    User.findOne({_id: request.params.id})
        .then(user => response.json(user))
        .catch(err => response.json(err))
}

module.exports.updatePicture = async (request, response) => {
    User.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
        .then(updatedUser => response.json(updatedUser))
        .catch(err => response.json(err))
}


module.exports.getMyCart = async (request, response) => {
    User.findOne({_id: request.params.id}).populate('cart')
        .then(user => response.json(user))
        .catch(err => response.json(err))
}

module.exports.getAllUsers = async (request, response) => {
    User.find({})
        .then(users => response.json(users))
        .catch(err => response.json(err))
}

module.exports.updateProfile = async (request, response) => {
    User.findOneAndUpdate({_id: request.params.id}, request.body, {new:true, runValidators: true})
        .then(updatedUser => response.json(updatedUser))
        .catch(err => response.status(400).json(err));
}

module.exports.updateLocation = async (request, response) => {
    User.findOneAndUpdate({_id: request.params.id}, request.body, {new:true, runValidators: true})
        .then(updatedUser => response.json(updatedUser))
        .catch(err => response.status(400).json(err));
}

module.exports.addRating = async (request, response) => {
    const id = request.params.id;
    try {
        const user = await User.findOne({_id: id})
        const raterIndex = user.raters.findIndex(rater => rater.user._id.toString() === request.body.rater._id)
        const rater = await User.findOne({_id: request.body.user._id})
        const rating = request.body.rating
        const comment = request.body.comment
        if (raterIndex === -1) {
            user.raters.push({rater: rater, rating: rating, comment: comment})
            user.average.push(rating)
            await user.save()
            response.json("Rating successfully submitted")
        } else {
            user.raters[raterIndex].comment = comment
            user.raters[raterIndex].rating = rating
            await user.save()
            response.json("Rating successfully updated")
        }
    } catch(err) {
        response.json(err)
    }
}
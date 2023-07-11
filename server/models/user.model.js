const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        maxlength: [10, "First name must be less than 10 characters"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        maxlength: [10, "Last name must be less than 10 characters"]
    },
    email: {
        type: String,
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        },
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [5, "Password must be 5 characters or longer"]
    },
    location: {
        type: String,
        required: false,
        default: ""
    },
    coordinates: {
        type: Object,
        required: false
    },
    raters: [
        {
            rater: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            rating: {
                type: Number,
                min: 1,
                max: 5,
                required: true
            },
            comment: {
                type: String,
                minlength: [10, "Must be at least 10 characters"],
                maxlength: [200, "Keep it below 200 characters"],
                required: true
            }
        }
    ],
    myFile: {
        type: String,
        required: false,
        default: ""
    }
    

}, {timestamps: true});

UserSchema.pre("save", async function(next) {
    if (!this.skipPasswordHashing) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)

    }
    next();
})


module.exports.User = mongoose.model('User', UserSchema);
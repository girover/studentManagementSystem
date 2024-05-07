const mongoose = require('mongoose');
const validator = require('../validation/validator');

const UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
        validate: {
            validator: validator.validateUserName,
            message: 'Username must be between 4 and 20 long and contain only letters and digits.'
        }
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: validator.validateEmail,
            message: 'Invalid email address.'
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: validator.validatePassword,
            message: 'Password must be at least 4 characters long.'
        }
    }
});


module.exports = mongoose.model('User', UserSchema);
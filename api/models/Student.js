const mongoose = require('mongoose');
const validator = require('../validation/validator');

const StudentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        validate: {
            validator: validator.validateName,
            message: 'Name must be between 2 and 50 characters long and contain only letters.'
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
    semester: {
        type: Number,
        required: true,
        validate: {
            validator: validator.validateSemester,
            message: 'Semester must be a number between 1 and 5.'
        }
    },
    education: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Education',
        required: true
    }
});


module.exports = mongoose.model('Student', StudentSchema);
const mongoose = require('mongoose');
const validator = require('../validation/validator');

const EducationSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        validate: {
            validator: validator.validateEducationName,
            message: 'Education name must be between 2 and 50 characters long and contain only letters.'
        }
    },
    semesters: {
        type: Number,
        required: true,
        validate: {
            validator: validator.validateEducationSemesters,
            message: 'Education semesters must be a number between 1 and 5.'
        }
    },
    description: {
        type: String,
        required: true,
        validate: {
            validator: validator.validateEducationDescription,
            message: 'Education description must be between 10 and 500 characters long and contain only letters, spaces, dots, commas and hyphens.'
        }
    },
});


module.exports = mongoose.model('Education', EducationSchema);
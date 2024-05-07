const exception = require('../exceptions/exeption');

// This file contains the validation functions for the Models.
module.exports = {

    validateName: function (name) {
        return name.length > 2 && name.length < 50 && /^[a-zA-ZøØæÆåÅ\s]+$/.test(name);
    },
    validateEducationName: function (name) {
        return name.length > 2 && name.length < 50 && /[\s\S]*/.test(name);
    },
    validateUserName: function (username) {
        return username.length >= 4  && username.length <= 50 && /^[a-zA-Z1-9]+$/.test(username);
    },
    validateEmail: function (email) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    },

    validateSemester: function (semester) {
        return semester > 0 && semester < 6;
    },

    validateEducationSemesters: function (semester) {
        return semester > 0 && semester < 6;
    },

    validateEducationDescription: function (description) {
        return description.length > 10 && description.length < 500 && /[\s\S]*/.test(description);
    },

    validatePassword: function (password) {
        return password.length >= 4;
    },

    validationErrors: function (validationResult) {
        const validationErrors = [];

        for (let field in validationResult.errors) {
            validationErrors.push({field:field, message:validationResult.errors[field].message});
        }

        return validationErrors;
    },

    throwErrorExceptionIfAny(validationResult) {

        if (validationResult) {

            const validationErrors = [];

            for (let field in validationResult.errors) {
                validationErrors.push({[field]:validationResult.errors[field].message});
                //validationErrors[field] = validationResult.errors[field].message;
            }

            exception.throwBadRequestError('Validation error', validationErrors);
        }
    }
};
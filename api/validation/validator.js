// This file contains the validation functions for the Models.
module.exports = {

    validateName: function(name) {
        return name.length > 2 && name.length < 50 && /^[a-zA-Z\s]+$/.test(name);
    },
    validateEducationName: function(name) {
        return name.length > 2 && name.length < 50 && /^[a-zA-Z\s]+$/.test(name);
    },
    validateEmail: function(email) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    },

    validateSemester: function(semester) {
        return semester > 0 && semester < 6;
    },
    validateEducationSemesters: function(semester) {
        return semester > 0 && semester < 6;
    },
    validateEducationDescription: function(description) {
        return description.length > 10 && description.length < 500 && /^[\x20-\x7E]+$/.test(description);
    },
    throwErrorExceptionIfAny(result){
        if(result){
            const validationErrors = Object.values(result.errors).map(error => error.message);
                        
            throw new Error(validationErrors.join(', '));
        }
    }
};
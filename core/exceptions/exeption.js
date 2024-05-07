const { notFound } = require("../Http/result");

Exception = function (type = 'Exeption', message = 'Exception: An error occurred') {
    
    this.error = new Error(message);
    this.error.type = type;
    
    return this.error;
}

HttpError = function (status = 500, message = 'HttpError: An error occurred', data = {}) {
        
    this.error = new Error(message);
    this.error.status = status;
    this.error.details = data;
    
    return this.error;    
}

BadRequestError = function (message = 'BadRequestError: Bad request', data = {}) {    
    return new HttpError(400, message, data);
}

notFoundError = function (message = 'NotFoundError: Not found', data = {}) {    
    return new HttpError(404, message, data);
}

/**
 * This object contains the exception functions.
 */
module.exports = {

    throwIfNull: function (value, message ='Value is null') {
        if (value == null) {
            throw new Exception('NullValueException', message);
        }
    },

    throwIfUndefined: function (value, message = 'UndefinedValueException: Value is undefined') {
        if (value == undefined) {
            throw new Exception('UndefinedValueException',message);
        }
    },

    throwValidationError: function (message = 'Validation error', data = {}) {
        throw new BadRequestError(message, data);
    },

    throwBadRequestError: function (message = 'Bad request', data = {}) {       
        throw new BadRequestError(message, data);
    },
}
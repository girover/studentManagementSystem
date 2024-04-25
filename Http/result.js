const container = require('./container');

Result = function(status, message, data){

    const result = container.get('result') ?? {}; // get the default response object from the container.
    
    result.status = status;
    result.message = message;
    result.data = data;

    return result;
}

exports.notFound = (message) =>{
    return Result(404, message, null);
};

exports.ok = (message, data, status = 200) =>{
    return Result(status, message, data);
}

exports.sucsess = (message, data, status = 200) =>{
    return Result(status, message, data);
}

exports.error = (message, data, status = 500) =>{
    return Result(status, message, data);
}

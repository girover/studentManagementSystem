Result = function(status, message, success = true){

    this.result = {
        status: status,
        success: success,
        message:message
    };

    return this.result;    
}

SuccessResult = function(status, message, data){

    let result = new Result(status, message);

    result.data = data;
    
    return result;
}

ErrorResult = function(status, message, errors){
    let result = new Result(status, message, false);

    result.errors = [];
    if(Array.isArray(errors)){
        result.errors.push(...errors);
    }else{
        result.errors.push(errors);
    }
    
    return result;
}

exports.notFound = (message, errors = []) =>{
    return new ErrorResult(404, message, errors);
};

exports.forbidden = (message, errors = []) =>{
    return new ErrorResult(403, message, errors);
};

exports.ok = (message, data, status = 200) =>{
    return new SuccessResult(status, message, data);
}

exports.sucsess = (message, data, status = 200) =>{
    return new SuccessResult(status, message, data);
}

exports.error = (message, errors, status = 500) =>{    
    return new ErrorResult(status, message, errors);
}

exports.badRequest = (message, errors, status = 422) =>{
    return new ErrorResult(status, message, errors);
}

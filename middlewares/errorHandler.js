const Result = require('../Http/result');

module.exports = function (err, req, res, next) {

    let result = global.globalResponseResult;
    
    res.status(500).json({
        error:{
            message: err.message || 'Internal Server Error',
            //stack: err.stack,
            request:result.request
        }
    });
}
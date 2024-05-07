const Result = require('../core/Http/result');

module.exports = function (err, req, res, next) {

    const details = err.details || err.stack || {};
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    if(req.isWeb){
        res.status(status).render('errors/' + status, {message, details, status});
        return;
    }
    
    res.status(status).json(Result.error(message, details, status));
}
const Result = require('../../core/Http/result')

module.exports = function (req, res, next) {
    
    let userSentCsrfToken = req.input('_csrf_token');
    let csrfToken = req.csrfToken();

    if(!userSentCsrfToken || csrfToken !== userSentCsrfToken){
        
        const error = new Error('CSRF token is invalid or missing');
        error.status = 403;
        next(error);
    }

    next();
}
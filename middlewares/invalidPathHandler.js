const Result = require('../core/Http/result');

module.exports = (req, res, next) => {
    if(req.isWeb){
        res.status(404).render('errors/404');
        return;
    }
    res.status(404).json(Result.notFound('Resource not found'));
};
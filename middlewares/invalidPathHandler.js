const Result = require('../Http/result');

module.exports = (req, res, next) => {
    res.status(404).json(Result.notFound('Resource not found'));
};
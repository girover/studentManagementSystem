const DIContainer = require('../Http/container');

module.exports = (req, res, next) => {
    DIContainer.register('result', {
        status: 200,
        message: 'Success',
        data: {},
        request: {
            method: req.method,
            url: req.protocol + '://' + req.get('host') + req.originalUrl,
            actions:[],
            query: req.query,
            params: req.params,
            body: req.body
        },
    });

    next();
};
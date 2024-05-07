const dataBag = require('../core/Http/dataBag');

module.exports = (req, res, next) => {

    // Register some of request information as an object in the dataBag.
    dataBag.request = {
        method: req.method,
        baseUrl: req.protocol + '://' + req.get('host'),     
        url: req.protocol + '://' + req.get('host') + req.originalUrl,
        query: req.query,
        params: req.params,
        body: req.body,
        headers: req.headers,
        ip: req.ip,
        cookies: req.cookies,
    };

    next();
};
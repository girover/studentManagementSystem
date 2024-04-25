/**
 * This middleware is used to set the default response object.
 * @param res in all the next middlewares will have a default object with 
 * status, message, data, request properties.
 * 
 */
module.exports = (req, res, next) => {

    global.globalResponseResult = {
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
    };

    next();
}
const urlGenerator = require('../core/Http/urlGenerator');

/**
 * This code is added to check if the request is targeting an asset or not.
 * It is used as a workaround because the express.static middleware is not working correctly.
 */
function isAssetRequest(url) {
    
    let assetExtensions = ['.css', '.js', '.png', '.jpg', '.jpeg', '.gif', '.ico', '.svg', '.eot', '.ttf', '.woff', '.woff2'];

    for (let i = 0; i < assetExtensions.length; i++) {
        if (url.includes(assetExtensions[i]))
            return true;
    }

    return false;
}

/**
 * This middleware is used to store the current and previous url in the session
 * It could be used to redirect the user to the previous page.
 */
module.exports = function (req, res, next) {
    
    let url = new urlGenerator(req);  
    let currentUrl = url.fullUrl();

    if(!isAssetRequest(currentUrl)){
        if(!req.session.currentUrl) {
            req.session.currentUrl = currentUrl;
            req.session.previuosUrl = currentUrl;
        }else {
            req.session.previuosUrl = req.session.currentUrl;
            req.session.currentUrl = currentUrl;
        }
    }

    next();
}
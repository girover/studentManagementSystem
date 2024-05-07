module.exports = function (req, res, next) {
   
    if (req.session.user) {
        return next();
    }

    req.session.destroy();
    res.redirect('/login');
}
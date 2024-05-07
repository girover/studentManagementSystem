const authService = require('../../core/services/authService');
module.exports =  {

    /**
     * Show the login form
     */
    loginForm: async(req, res, next) => {
        res.render('auth/login',{layout: null});
    },

    /**
     * Authenticate the user
     */
    login: async(req, res, next) => {  
        
        let authenticatedUser = await authService.authenticate(req.body);
        
        if(!authenticatedUser){
            
            res.back({errors: [{message: 'incorrect credentials'}]});
        }
        else{
            req.session.user = authenticatedUser;
            res.redirect('/');
        }
    },

    /**
     * Logout the user
     */
    logout: async(req, res, next) => {
        req.session.destroy();
        res.redirect('/login');
    }
}
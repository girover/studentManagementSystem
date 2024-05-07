const usersService = require('../../core/services/userService');
const {successMessage, errorMessage} = require('../../core/Http/message');
/**
 * Users controller
 */
module.exports = {

    /**
     * Render index page
     */
    index: async(req, res, next) => {
        try {
            const result = await usersService.getAll();
            
            res.title('List of users')
               .view('users/index', result.data);   

        } catch (error) { next(error); }
    },
    createForm: async(req, res, next) => {        
        try {
            res.title('Add User')
               .view('users/add');
        } catch (error) { next(error); }
    },

    create: async(req, res, next) => {        
        try {
            const result = await usersService.create(req.body);
            if(!result.success){
                res.back({errors: result.errors});
            }else{
                let successMsg = new successMessage('Success', 'User created successfully', 'User created successfully');
                
                res.flashMessage(successMsg)
                   .redirect('/users');
            }
        } catch (error) { next(error); }
    },

    editForm: async(req, res, next) => {
        try {
            const result = await usersService.getById(req.param('id'));
            if(!result.success){
                res.back({errors: result.errors});
            }
            res.title('Edit User')
               .view('users/edit', result.data);
        }
        catch (error) { next(error); }
    },

    update: async(req, res, next) => {
        
        try {
            const result = await usersService.update(req.param('id'), req.inputs());
            
            if(!result.success){
                res.back({errors: result.errors});
            }else{
                let successMsg = new successMessage('Success', 'User updated successfully', 'User updated successfully');
                res.flashMessage(successMsg)
                   .redirect('/users');
            }
        } catch (error) { next(error); }
    },

    delete: async(req, res, next) => {
        try {
            const result = await usersService.delete(req.param('id'));
            if(!result.success){
                res.back({errors: result.errors});
            }else{
                let successMsg = new successMessage('Success', 'User deleted successfully', 'User deleted successfully');
                res.flashMessage(successMsg)
                   .back();
            }
        } catch (error) { next(error); }
    },

    profile: async(req, res, next) => {
        try {
            const result = await usersService.getById(req.param('id'));

            if(!result.success){
                res.back({errors: result.errors});
            }else{
                res.title('User Profile')
                   .render('users/profile', result.data);
            }
        } catch (error) { next(error); }
    }
}
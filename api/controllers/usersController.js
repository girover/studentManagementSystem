const usersService = require('../../core/services/userService');

/**
 * Users Controller
 */
module.exports = {

    /**
     * Get all users
     */
    get: async(req, res, next) => {
        try {
            const result = await usersService.getAll();
            res.status(200).json(result);            
        } catch (error) { next(error); }
    },

    getById: async(req, res, next) => {
        try {
            res.status(200).json(await usersService.getById(req.params.id));
        } catch (error) {next(error);}
    },

    /**
     * Create new user
     */
    create: async(req, res, next) => {
        try {
            let user = await usersService.create(req.body);
            
            res.status(201).json(user);         
        } catch (error) { next(error) };
    },

    /**
     * Update user by id
     */
    update: async(req, res, next) => {
        try {
            let user = await usersService.update(req.param('id'), req.body);
            res.status(200).json(user);
        } catch (error) { next(error)}
    },

    /**
     * Remove a user by id
     */
    delete: async(req, res, next) => {
        try {
            let result = await usersService.delete(req.params.id);
            res.status(200).json(result);
        } catch (error) { next(error)}
    },
}
const educationService = require('../../core/services/educationService');

/**
 * Edusctions Controller
 */
module.exports = {
    /**
     * Get all students
     */
    get: async(req, res, next) => {
        try {
            const result = await educationService.getAll();
            res.status(200).json(result);            
        } catch (error) { next(error); }
    },

    getById: async(req, res, next) => {
        try {
            res.status(200).json(await educationService.getById(req.params.id));
        } catch (error) {next(error);}
    },

    /**
     * Create new student
     */
    create: async(req, res, next) => {
        try {
            let education = await educationService.create(req.body);
            
            res.status(201).json(education);         
        } catch (error) { next(error) };
    },

    /**
     * Update student by id
     */
    update: async(req, res, next) => {
        try {
            let education = await educationService.update(req.param('id'), req.body);
            res.status(200).json(education);
        } catch (error) { next(error)}
    },

    /**
     * Remove a student by id
     */
    delete: async(req, res, next) => {
        try {
            let result = await educationService.delete(req.params.id);
            res.status(200).json(result);
        } catch (error) { next(error)}
    },
}
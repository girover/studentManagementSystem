const studentsService = require('../../core/services/studentService');

/**
 * Students Controller
 */
module.exports = {

    /**
     * Get all students
     */
    get: async(req, res, next) => {
        try {
            const result = await studentsService.getAll();
            res.status(result.status).json(result);            
        } catch (error) { next(error); }
    },

    /**
     * Get student by id
     */
    getById: async(req, res, next) => {
        try {
            let result = await studentsService.getById(req.params.id);
            res.status(result.status).json(result);
        } catch (error) {next(error);}
    },

    /**
     * Create new student
     */
    create: async(req, res, next) => {
        try {
            let result = await studentsService.create(req.body);            
            res.status(result.status).json(result);         
        } catch (error) { next(error) };
    },

    /**
     * Update student by id
     */
    update: async(req, res, next) => {
        try {
            let result = await studentsService.update(req.params.id, req.body);
            res.status(result.status).json(result);
        } catch (error) { next(error)}
    },

    /**
     * Remove a student by id
     */
    delete: async(req, res, next) => {
        try {
            let result = await studentsService.delete(req.params.id);
            res.status(result.status).json(result);
        } catch (error) { next(error)}
    },
}
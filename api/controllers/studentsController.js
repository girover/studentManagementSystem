const studentsService = require('../services/studentService');

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
            res.status(200).json(result);            
        } catch (error) { next(error); }
    },

    getById: async(req, res, next) => {
        try {
            res.status(200).json(await studentsService.getById(req.params.id));
        } catch (error) {next(error);}
    },

    /**
     * Create new student
     */
    create: async(req, res, next) => {
        try {
            let student = await studentsService.create(req.body.name, req.body.email, req.body.semester, req.body.education);
            
            res.status(201).json(student);         
        } catch (error) { next(error) };
    },

    /**
     * Update student by id
     */
    update: async(req, res, next) => {
        try {
            let student = await studentsService.update(req.params.id, req.body.name, req.body.email, req.body.semester, req.body.education);
            res.status(200).json(student);
        } catch (error) { next(error)}
    },

    /**
     * Remove a student by id
     */
    delete: async(req, res, next) => {
        try {
            let result = await studentsService.delete(req.params.id);
            res.status(200).json(result);
        } catch (error) { next(error)}
    },
}
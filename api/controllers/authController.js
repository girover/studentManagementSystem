const studentsService = require('../../core/services/studentService');

/**
 * Auth Controller
 */
module.exports = {

    /**
     * Register new user
     */
    register: async(req, res, next) => {
        try {           
        } catch (error) { next(error); }
    },

    /**
     * Login user
     */
    login: async(req, res, next) => {
        try {
        } catch (error) {next(error);}
    },

    /**
     * Logout user
     */
    logout: async(req, res, next) => {
        try {
        } catch (error) {next(error);}
    }
}
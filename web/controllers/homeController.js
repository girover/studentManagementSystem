const studentsService = require('../../core/services/studentService');
/**
 * Home controller
 */
module.exports = {

    /**
     * Render index page
     */
    index: async(req, res, next) => {
        try {
            const result = await studentsService.getAll();
            
            res.title('List of students')
               .render('index', {students:result.data });   

        } catch (error) { next(error); }
    }
}
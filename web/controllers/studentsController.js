const studentsService = require('../../core/services/studentService');
const {successMessage, errorMessage} = require('../../core/Http/message');
/**
 * Students controller
 */
module.exports = {

    /**
     * Render index page
     */
    index: async(req, res, next) => {
        try {
            const result = await studentsService.getAll();
            
            res.title('List of students')
               .view('students/index', result.data);  

        } catch (error) { next(error); }
    },
    createForm: async(req, res, next) => {        
        try {
            res.title('Add student')
               .view('students/add');
        } catch (error) { next(error); }
    },

    create: async(req, res, next) => {        
        try {
            const result = await studentsService.create(req.body);
            if(!result.success){
                res.back({errors: result.errors});
            }else{
                let successMsg = new successMessage('Success', 'Student created successfully', 'Student created successfully');
                
                res.flashMessage(successMsg)
                   .redirect('/students');
            }
        } catch (error) { next(error); }
    },

    editForm: async(req, res, next) => {
        try {
            const result = await studentsService.getById(req.param('id'));
            if(!result.success){
                res.back({errors: result.errors});
            }
            res.title('Edit student')
               .view('students/edit', result.data);
        }
        catch (error) { next(error); }
    },

    update: async(req, res, next) => {
        
        try {
            const result = await studentsService.update(req.param('id'), req.inputs());
            
            if(!result.success){
                res.back({errors: result.errors});
            }else{
                let successMsg = new successMessage('Success', 'Student updated successfully', 'Student updated successfully');
                res.flashMessage(successMsg)
                   .redirect('/');
            }
        } catch (error) { next(error); }
    },

    delete: async(req, res, next) => {
        try {
            const result = await studentsService.delete(req.param('id'));
            if(!result.success){
                res.back({errors: result.errors});
            }else{
                let successMsg = new successMessage('Success', 'Student deleted successfully', 'Student deleted successfully');
                res.flashMessage(successMsg)
                   .back();
            }
        } catch (error) { next(error); }
    },

    profile: async(req, res, next) => {
        try {
            const result = await studentsService.getById(req.param('id'));

            if(!result.success){
                res.back({errors: result.errors});
            }else{
                res.title('Student Profile')
                   .view('students/profile', result.data);
            }
        } catch (error) { next(error); }
    }
}
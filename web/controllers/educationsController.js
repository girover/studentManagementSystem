const educationsService = require('../../core/services/educationService');
const studentsService = require('../../core/services/studentService');
const {successMessage, errorMessage} = require('../../core/Http/message');
/**
 * Educations controller
 */
module.exports = {

    /**
     * Render index page
     */
    index: async(req, res, next) => {
        try {
            const result = await educationsService.getAll();
            
            res.title('List of educations')
               .view('educations/index', result.data);   

        } catch (error) { next(error); }
    },
    createForm: async(req, res, next) => {        
        try {
            res.title('Add Education')
               .view('educations/add');
        } catch (error) { next(error); }
    },

    create: async(req, res, next) => {        
        try {
            const result = await educationsService.create(req.body);
            if(!result.success){
                res.back({errors: result.errors});
            }else{
                let successMsg = new successMessage('Success', 'Education created successfully', 'Education created successfully');
                
                res.flashMessage(successMsg)
                   .redirect('/educations');
            }
        } catch (error) { next(error); }
    },

    editForm: async(req, res, next) => {
        try {
            const result = await educationsService.getById(req.param('id'));
            if(!result.success){
                res.back({errors: result.errors});
            }
            res.title('Edit Education')
               .view('educations/edit', result.data);
        }
        catch (error) { next(error); }
    },

    update: async(req, res, next) => {
        
        try {
            const result = await educationsService.update(req.param('id'), req.inputs());
            
            if(!result.success){
                res.back({errors: result.errors});
            }else{
                let successMsg = new successMessage('Success', 'Education updated successfully', 'Education updated successfully');
                res.flashMessage(successMsg)
                   .redirect('/educations');
            }
        } catch (error) { next(error); }
    },

    delete: async(req, res, next) => {
        try {
            const result = await educationsService.delete(req.param('id'));
            if(!result.success){
                res.back({errors: result.errors});
            }else{
                let successMsg = new successMessage('Success', 'Educations deleted successfully', 'Educations deleted successfully');
                res.flashMessage(successMsg)
                   .back();
            }
        } catch (error) { next(error); }
    },

    students: async(req, res, next) => {
        try {
            const result = await studentsService.getByEducation(req.param('id'));
            if(!result.success){
                res.back({errors: result.errors});
            }else{
                res.title('Students')
                   .view('educations/students', result.data);
            }
        } catch (error) { next(error); }
    },

    profile: async(req, res, next) => {
        try {
            const result = await educationsService.getById(req.param('id'));

            if(!result.success){
                res.back({errors: result.errors});
            }else{
                res.title('Education')
                   .render('educations/profile', result.data);
            }
        } catch (error) { next(error); }
    }
}
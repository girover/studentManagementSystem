const mongoose = require('mongoose');
const educationRepository = require('../repositories/educationRepository');
const Result = require('../Http/result');
const Education = require('../models/Education');
const validator = require('../validation/validator');
const exeption = require('../exceptions/exeption');

/**
 * Education Service
 * contains all the business logic for the education resource
 */
module.exports = {

    getAll: async() => {
        const educations = await educationRepository.getAll();
        
        if(educations.length === 0){
            return Result.ok('No educations found', []);
        }

        return Result.ok('List of educations', educations);
    },

    getById: async(id) => {
        const education = await educationRepository.getById(id);

        if(!education){
            return Result.notFound('Education not found', {});
        }

        return Result.ok('Education retrieved', education);
    },

    create: async(education) => {
        
        let newEducation = new Education({
            _id: new mongoose.Types.ObjectId(),
            name: education.name,
            semesters: education.semesters,
            description: education.description
        });

        let validateErrors = newEducation.validateSync();
        
        if(validateErrors){
            return Result.badRequest('Validation error', validator.validationErrors(validateErrors));
        }

        const createdEducation = await educationRepository.create(newEducation);
        
        return Result.ok('Education created', createdEducation, 201);
    },

    update: async(id, education) => {

        let retrievedEducation = await educationRepository.getById(id);
        
        if(!retrievedEducation){
            return Result.notFound('Education not found', {field: 'id', message: 'User not found'});
        }

        retrievedEducation.name = education.name;
        retrievedEducation.semesters = education.semesters;
        retrievedEducation.description = education.description;
        
        let validateErrors = retrievedEducation.validateSync();
        
        if(validateErrors){
            return Result.badRequest('Validation error', validator.validationErrors(validateErrors));
        }

        const updatedEducation = await educationRepository.update(retrievedEducation);
        
        return Result.ok('Education updated', updatedEducation);
    },

    delete: async(id) => {
        let education = await educationRepository.getById(id);

        if(!education){
            return Result.notFound('Education not found', {});
        }
        
        return  Result.ok('Education deleted', await educationRepository.delete(id));
    },

    students: async(id) => {}
}
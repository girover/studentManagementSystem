const mongoose = require('mongoose');
const educationRepository = require('../repositories/educationRepository');
const Result = require('../../Http/result');
const Education = require('../models/Education');
const validator = require('../validation/validator');

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

    create: async(name, semesters, description) => {
        let education = new Education({
            _id: new mongoose.Types.ObjectId(),
            name: name,
            semesters: semesters,
            description: description
        });

        validator.throwErrorExceptionIfAny(education.validateSync());

        const createdEducation = await educationRepository.create(education);
        
        return Result.ok('Education created', createdEducation, 201);
    },

    update: async(id, name, semesters, description) => {

        let education = await educationRepository.getById(id);
        
        education.name = name;
        education.semesters = semesters;
        education.description = description;
        
        validator.throwErrorExceptionIfAny(education.validateSync());

        const updatedEducation = await educationRepository.update(education);
        
        return Result.ok('Education updated', updatedEducation);
    },

    delete: async(id) => {
        let education = await educationRepository.getById(id);

        if(!education){
            return Result.notFound('Education not found', {});
        }
        
        return  Result.ok('Education deleted', await educationRepository.delete(id));
    }
}
const mongoose = require('mongoose');
const Education = require('../models/Education');

/**
 * Education Repository object
 */
module.exports = {

    getAll: async() => {
        return await Education.find();
    },

    getById: async(id) => {
        return await Education.findById(id);
    },

    create: async(education) => {
        const educationToCreate = new Education({
            _id: new mongoose.Types.ObjectId(),
            name: education.name,
            semesters: education.semesters,
            description: education.description
        });

        return await educationToCreate.save();
    },

    update: async(education) => {
        return await education.save();
    },

    delete: async(id) => {
        return await Education.deleteOne({ _id: id });
    }
};
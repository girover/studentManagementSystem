const mongoose = require('mongoose');
const Education = require('../models/Education');

/**
 * Education Repository object
 */
module.exports = {

    getAll: async() => {
        return await Education
                        .find()
                        .select('_id name semesters description');
    },

    getById: async(id) => {
        return await Education.findById(id);
    },

    create: async(education) => {
        return await education.save();
    },

    update: async(education) => {
        return await education.save();
    },

    delete: async(id) => {
        return await Education.deleteOne({ _id: id });
    }
};
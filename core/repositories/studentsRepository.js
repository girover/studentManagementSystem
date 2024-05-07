const mongoose = require('mongoose');
const Student = require('../models/Student');

/**
 * Students Repository object
 *
 * */
module.exports = {

    getAll: async() => {
        return await Student
        .find()
        .select('_id name email semester education')
        .populate('education');
    },

    getById: async(id) => {
        return await Student.findById(id)
                            .select('_id name email semester education')
                            .populate('education');
    },

    getByEducation: async(educationId) => {
        return await Student.find({ education: educationId })
                            .select('_id name email semester education');
    },

    create: async(student) => {
        return await student.save();
    },

    update: async(student) => {
        return await student.save();
    },

    delete: async(id) => {
        return await Student.deleteOne({ _id: id });
    }
};
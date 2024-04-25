const mongoose = require('mongoose');
const Student = require('../models/Student');

/**
 * Students Repository object
 *
 * */
module.exports = {

    getAll: async() => {
        return await Student.find().populate('education');
    },

    getById: async(id) => {
        return await Student.findById(id);
    },

    create: async(student) => {
        const studentToCreate = new Student({
            _id: new mongoose.Types.ObjectId(),
            name: student.name,
            email: student.email,
            semester: student.semester,
            education: student.education
        });

        return await studentToCreate.save();
    },

    update: async(student) => {
        return await student.save();
    },

    delete: async(id) => {
        return await Student.deleteOne({ _id: id });
    }
};
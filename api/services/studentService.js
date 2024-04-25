const mongoose = require('mongoose');
const studentRepository = require('../repositories/studentsRepository');
const Result = require('../../Http/result');
const Student = require('../models/Student');
const validator = require('../validation/validator');
const studentsRepository = require('../repositories/studentsRepository');
const educationsRepository = require('../repositories/educationRepository');
const exception = require('../exceptions/exeption');

/**
 * Students Service
 * contains all the business logic for the student resource.
 */
module.exports = {

    getAll: async() => {
        const students = await studentRepository.getAll();
        
        if(students.length === 0){
            return Result.notFound('No students found', []);
        }

        return Result.ok('List of students', students);
    },

    getById: async(id) => {
        const student = await studentRepository.getById(id);

        if(!student){
            return Result.notFound('Student not found', {});
        }

        return Result.ok('Student retrieved', student);
    },

    create: async(name, email, semester, education) => {
        let student = new Student({
            _id: new mongoose.Types.ObjectId(),
            name: name,
            email: email,
            semester: semester,
            education: education
        });

        validator.throwErrorExceptionIfAny(student.validateSync());

        exception.throwIfNull(await educationsRepository.getById(education), 'Education not found');

        const createdStudent = await studentRepository.create(student);
        
        return Result.ok('Student created', createdStudent, 201);
    },

    update: async(id, name, email, semester, education) => {

        let student = await studentsRepository.getById(id);
        
        student.name = name;
        student.email = email;
        student.semester = semester;
        student.education = education;
        
        validator.throwErrorExceptionIfAny(student.validateSync());
        exception.throwIfNull(await educationsRepository.getById(education), 'Education not found');
        
        const updatedStudent = await studentRepository.update(student);
        
        return Result.ok('Student updated', updatedStudent);
    },

    delete: async(id) => {
        let student = await studentRepository.getById(id);

        if(!student){
            return Result.notFound('Student not found', {});
        }
        
        return  Result.ok('Student deleted', await studentRepository.delete(id));
    }
}
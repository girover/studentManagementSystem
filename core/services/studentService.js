const mongoose = require('mongoose');
const studentRepository = require('../repositories/studentsRepository');
const Result = require('../Http/result');
const Student = require('../models/Student');
const validator = require('../validation/validator');
const studentsRepository = require('../repositories/studentsRepository');
const educationsRepository = require('../repositories/educationRepository');
const dataBag = require('../Http/dataBag');

/**
 * Students Service
 * contains all the business logic for the student resource.
 */
const studentsService = {

    getAll: async function() {

        const students = await studentRepository.getAll();
        
        const data = this.addActionsToStudents(students);    
        
        return Result.ok('List of students', data);
    },

    getById: async function(id) {
        const student = await studentRepository.getById(id);

        if(!student){
            return Result.notFound('Student not found', {});
        }
        
        return Result.ok('Student retrieved', this.addActionsToStudent(student));
    },

    getByEducation: async function(educationId) {
        const edu = await educationsRepository.getById(educationId);
        const students = await studentRepository.getByEducation(educationId);
        
        if(!edu){
            return Result.notFound('Education not found', {});
        }
        
        //const data = this.addActionsToStudents(students);
        const data = {education: edu, students: students};
        
        return Result.ok('List of students', data);
    },

    create: async function(student) {

        const edu = await educationsRepository.getById(student.education)
        
        if(!edu){
            return Result.notFound('Education not found', {field: 'education', message: 'Education not found'});
        }

        let newStudent = new Student({
            _id: new mongoose.Types.ObjectId(),
            name: student.name,
            email: student.email,
            semester: student.semester,
            education: student.education
        });

        let validateErrors = newStudent.validateSync();
        
        if(validateErrors){
            return Result.badRequest('Validation error', validator.validationErrors(validateErrors));
        }
       
        const createdStudent = await studentRepository.create(newStudent);
        createdStudent.education = edu;

        return Result.ok('Student created', this.addActionsToStudent(createdStudent), 201);
    },

    update: async function(id, student) {
        
        if(!await educationsRepository.getById(student.education)){
            return Result.notFound('Education not found', {field: 'education', message: 'Education not found'});
        }
        
        let retrievedStudent = await studentsRepository.getById(id);
        
        if(!retrievedStudent){
            return Result.notFound('Student not found', {field: 'id', message: 'Student not found'});
        }
        
        retrievedStudent.name = student.name;
        retrievedStudent.email = student.email;
        retrievedStudent.semester = student.semester;
        retrievedStudent.education = student.education;
        
        let validateErrors = retrievedStudent.validateSync();
        
        if(validateErrors){
            return Result.badRequest('Validation error', validator.validationErrors(validateErrors));
        }
        
        const updatedStudent = await studentRepository.update(retrievedStudent);
        
        return Result.ok('Student updated', this.addActionsToStudent(updatedStudent));
    },

    delete: async function(id) {
        let student = await studentRepository.getById(id);

        if(!student){
            return Result.notFound('Student not found', {});
        }
        
        return  Result.ok('Student deleted', await studentRepository.delete(id));
    },
    
    addActionsToStudents: function(students) {
        const newData = students.map(student => {
            return this.addActionsToStudent(student);
        });

        return newData;
    },
    addActionsToStudent: function(student) {
        const studentObj = student.toObject(); // Convert Mongoose document to a plain object
        return {
            ...studentObj,
            links: [
                {method: 'GET', url: `${dataBag.request.baseUrl}/api/students/${student._id}`, action: 'Get student by id'},
                {method: 'PATCH', url: `${dataBag.request.baseUrl}/api/students/${student._id}`, action: 'Update studeny by id'},
                {method: 'DELETE', url: `${dataBag.request.baseUrl}/api/students/${student._id}`, action: 'Delete studeny by id'},
            ]
        };
    }
}

module.exports = studentsService;
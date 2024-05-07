const mongoose = require('mongoose');
const Result = require('../Http/result');
const User = require('../models/User');
const validator = require('../validation/validator');
const usersRepository = require('../repositories/userRepository');
const exception = require('../exceptions/exeption');
const dataBag = require('../Http/dataBag');
const bcrypt = require('bcrypt');

/**
 * Users Service
 * contains all the business logic for the user resource.
 */
module.exports = {

    getAll: async function() {

        const users = await usersRepository.getAll();  
        
        return Result.ok('List of users', this.addActionsToUsers(users));
    },

    getById: async function(id) {
        const user = await usersRepository.getById(id);

        if(!user){
            return Result.notFound('User not found', {});
        }
        
        return Result.ok('User retrieved', this.addActionsToUser(user));
    },

    getByEmail: async function(email) {
        const user = await usersRepository.getByEmail(email);

        if(!user){
            return Result.notFound('User not found', {});
        }
        
        return Result.ok('User retrieved', user);
    },

    getByUsername: async function(username) {
        const user = await usersRepository.getByUsername(username);

        if(!user){
            return Result.notFound('User not found', {});
        }
        
        return Result.ok('User retrieved', user);
    },

    create: async function(user) {

        let newUser = new User({
            _id: new mongoose.Types.ObjectId(),
            username: user.username,
            email: user.email,
            password: user.password
        });

        let validateErrors = newUser.validateSync();
        
        if(validateErrors){
            return Result.badRequest('Validation error', validator.validationErrors(validateErrors));
        }
       
        newUser.password = bcrypt.hashSync(user.password, 10);

        const createdUser = await usersRepository.create(newUser);

        createdUser.password = ''.padEnd(user.password.length, '*');
        
        return Result.ok('User created', this.addActionsToUser(createdUser), 201);
    },

    update: async function(id, user) {
        
        let retrievedUser = await usersRepository.getById(id);
        
        if(!retrievedUser){
            return Result.notFound('User not found', {field: 'id', message: 'User not found'});
        }

        retrievedUser.username = user.username || retrievedUser.username;
        retrievedUser.email = user.email || retrievedUser.email;
        retrievedUser.password = user.password || retrievedUser.password;
        
        let validateErrors = retrievedUser.validateSync();
        
        if(validateErrors){
            return Result.badRequest('Validation error', validator.validationErrors(validateErrors));
        }
        
        retrievedUser.password = user.password ? bcrypt.hashSync(user.password, 10) : retrievedUser.password;
        
        const updatedUser = await usersRepository.update(retrievedUser);
        
        return Result.ok('User updated', this.addActionsToUser(updatedUser));
    },

    delete: async function(id) {
        let user = await usersRepository.getById(id);

        if(!user){
            return Result.notFound('User not found', {});
        }
        
        return  Result.ok('User deleted', await usersRepository.delete(id));
    },
    addActionsToUsers: function(users) {
        
        const newData = users.map(user => {
            return this.addActionsToUser(user);
        });

        return newData;
    },
    addActionsToUser: function(user) {
        
        const userObj = user.toObject(); // Convert Mongoose document to a plain object
        return {
            ...userObj,
            links: [
                {method: 'GET', url: `${dataBag.request.baseUrl}/api/users/${user._id}`, action: 'Get user by id'},
                {method: 'PATCH', url: `${dataBag.request.baseUrl}/api/users/${user._id}`, action: 'Update user by id'},
                {method: 'DELETE', url: `${dataBag.request.baseUrl}/api/users/${user._id}`, action: 'Delete user by id'},
            ]
        };
    }
}
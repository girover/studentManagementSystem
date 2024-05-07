const mongoose = require('mongoose');
const Result = require('../Http/result');
const User = require('../models/User');
const validator = require('../validation/validator');
const usersRepository = require('../repositories/userRepository');
const exception = require('../exceptions/exeption');
const dataBag = require('../Http/dataBag');
const bcrypt = require('bcrypt');
const userService = require('./userService');

/**
 * Users Service
 * contains all the business logic for the user resource.
 */
module.exports = {

    register: async function(user) {
        return userService.create(user);
    },

    authenticate: async function(user) {
        
        let fetchedUser = await usersRepository.getByEmail(user.email);
        if(!fetchedUser || !bcrypt.compareSync(user.password, fetchedUser.password))
            return false;
        
        const authenticatedUser = fetchedUser.toObject();
        authenticatedUser.password = undefined;

        return authenticatedUser;
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
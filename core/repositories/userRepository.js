const mongoose = require('mongoose');
const User = require('../models/User');

/**
 * Students Repository object
 *
 * */
module.exports = {

    getAll: async() => {
        return await User
        .find()
        .select('_id username email');
    },

    getById: async(id) => {
        return await User.findById(id)
                         .select('_id username email password')
    },

    getByEmail: async(email) => {
        return await User.findOne({email: email});
    },

    getByUsername: async(username) => {
        return await User.find({username});
    },

    create: async(userToCreate) => {        
        return await userToCreate.save();
    },

    update: async(user) => {
        return await user.save();
    },

    delete: async(id) => {
        return await User.deleteOne({ _id: id });
    }
};
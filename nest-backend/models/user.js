const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        // required: true,
        unique: true
    },
    role: {
        type: Number,
        default: 0
    },
    password: {
        type: String,
        // required: true
    }
});

module.exports = mongoose.model('user', UserSchema);
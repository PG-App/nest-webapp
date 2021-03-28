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
    guardian_name: { type: String },
    guardian_phone: { type: Number },
    pg: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pg'
    },
    review: {
        pg_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'pg'
        },
        star: { type: String },
        description: { type: String }
    }
});

module.exports = mongoose.model('user', UserSchema);
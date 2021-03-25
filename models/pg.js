const mongoose = require('mongoose');

const PgSchema = mongoose.Schema({
    name: { type: String},
    location: {
        type: String
    }
});

module.exports = mongoose.model('pg', PgSchema);
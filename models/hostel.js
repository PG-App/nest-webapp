const mongoose = require('mongoose');

const HostelSchema = mongoose.Schema({
    name: { type: String},
    location: {
        type: String
    }
});

module.exports = mongoose.model('hostel', HostelSchema);
const mongoose = require('mongoose');

const OwnerSchema = mongoose.Schema({
    name: {
        type: String,
    },
    phone: {
        type: Number
    },
    coordinates: {
        type: String
    },
    pg: [{
        type: Schema.Types.ObjectId,
        ref: 'pg'
    }], 
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'user'
    }],
    occupancy: {
        single_bed: { type: String },
        double_bed: { type: String },
        triple_bed: { type: String },
    }
});

module.exports = mongoose.model('owner', OwnerSchema);
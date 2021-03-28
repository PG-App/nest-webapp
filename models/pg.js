const mongoose = require('mongoose');

const BestDealSchema = mongoose.Schema({
    //name, location, review, fee, image
    pg: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pg'
    }
});
const BestDeal = mongoose.model('best_deals_pg', BestDealSchema);

const RecommendedPgSchema = mongoose.Schema({
    //name, location
    pg: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pg'
    }
});

const RecommendedPg = mongoose.model('recommended_pg', RecommendedPgSchema);

const PgSchema = mongoose.Schema({
    name: { type: String },
    location: {
        type: String
    },
    coordinates: { type: String },
    gender: {
        type: String, enum: ['Boys', 'Girls'], default: 'Boys'
    },
    ameneties: {
        ac: { type: String, enum: ["Yes", "No"], default: "No" },
        near_hospital: { type: Boolean, default: false },
        near_park: { type: Boolean, default: false },
        near_gym: { type: Boolean, default: false },
        near_restaurant: { type: Boolean, default: false },
        near_transport: { type: Boolean, default: false },
        wifi: { type: Boolean, default: false },
        power_backup: { type: Boolean, default: false },
        room_cleaning_service: { type: Boolean, default: false },
        laundry: { type: Boolean, default: false },
        water_cooler: { type: Boolean, default: false },
        refrigerator: { type: Boolean, default: false }
    },
    occupancy: {
        single_bed: { type: Number, default: 0 },
        double_bed: { type: Number, default: 0 },
        triple_bed: { type: Number, default: 0 },
    },
    mess: {
        veg: { type: Boolean, default: false },
        non_veg: { type: Boolean, default: false },
        breakfast: { type: Boolean, default: false },
        snack: { type: Boolean, default: false },
    },
    fee_range: { type: Number, default: 0 },
    owner: {
        name: { type: String },
        phone_number: { type: Number }
    },
    default_image: { type: String, default: 'https://source.unsplash.com/1600x900/?mess,hostel' },
    images: [{
        type: String
    }],
    review: {
        pg_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'pg'
        },
        star: { type: String },
        description: { type: String }
    },
    recommended: { type: Boolean, default: false },
    comfort_index: { type: Number }
});

const Pg = mongoose.model('pg', PgSchema);

module.exports = {
    Pg, BestDeal, RecommendedPg
}
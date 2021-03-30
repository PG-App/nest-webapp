const mongoose = require('mongoose');

const BestDealSchema = mongoose.Schema({
    // name, location, review, fee, image
    pg: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pg'
    }
});
const BestDeal = mongoose.model('best_deals_pg', BestDealSchema);

const RecommendedPgSchema = mongoose.Schema({
    // name, location
    pg: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pg'
    }
});

const RecommendedPg = mongoose.model('recommended_pg', RecommendedPgSchema);

const PgSchema = mongoose.Schema({
    name: { type: String },
    location: { type: String },
    coordinates: { type: String },
    gender: { type: String, enum: ['Boys', 'Girls'], default: 'Boys' },

    amenities_ac: { type: String, default: "No" },
    amenities_near_hospital: { type: String, default: "No" },
    amenities_near_park: { type: String, default: "No" },
    amenities_near_gym: { type: String, default: "No" },
    amenities_near_restaurant: { type: String, default: "No" },
    amenities_near_transport: { type: String, default: "No" },
    amenities_wifi: { type: String, default: "No" },
    amenities_power_backup: { type: String, default: "No" },
    amenities_room_cleaning_service: { type: String, default: "No" },
    amenities_laundry: { type: String, default: "No" },
    amenities_water_cooler: { type: String, default: "No" },
    amenities_refrigerator: { type: String, default: "No" },

    single_bed: { type: Number, default: 0 },
    double_bed: { type: Number, default: 0 },
    triple_bed: { type: Number, default: 0 },

    mess_veg: { type: String, default: "No" },
    mess_non_veg: { type: String, default: "No" },
    mess_breakfast: { type: String, default: "No" },
    mess_snack: { type: String, default: "No" },

    // fee_range:// { type: Number, default: 0 }, // [5000, 8000]
    // {
    //     min: { type: Number, default: 0 },
    //     max: { type: Number, default: 100000 },
    // },
    fee_min: { type: Number, default: 0 },
    fee_max: { type: Number, default: 100000 },
    
    owner_name: { type: String },
    owner_phone_number: { type: Number },

    default_image: { type: String, default: 'https://source.unsplash.com/1600x900/?mess,hostel' },
    images: [{ type: String }],
    data: { type: String },
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
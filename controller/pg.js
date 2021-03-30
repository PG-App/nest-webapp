const { Pg } = require('../models/pg');

exports.create_pg_post = (req, res) => {
    // const {
    //     cityName,
    //     pgName,
    //     pincode,
    //     type,
    //     bed,
    //     ac,
    //     price
    // } = req.body;

    const newPg = new Pg(req.body);

    newPg.save();
    res.send('Saved!');
}

exports.search_pg_post = async (req, res) => {
    try {
        const { location } = req.query;
        console.log(req.query);
        const filter = {
            "location": { $regex: `${location}`, $options: 'i' }
        };
        const pgs = await Pg.find(filter);
        res.status(200).json({
            success: true,
            message: `${pgs.length} pgs found for you!`,
            pgs: pgs,
            size: pgs.length
        });
    } catch (err) {
        console.log(err);
    }
}

exports.add_city = async (req, res) => {
    const { cityName } = req.body;

    const newCity = new City({
        cityName
    });

    await newCity.save();
    res.send('City created successfully');
}

exports.add_pg = async (req, res) => {
    try {
        const { name, location } = req.body;
        console.log(req.body);
        const newPg = new Pg({
            name,
            location,
        });
        await newPg.save();

        res.json({ success: 'Pg created successfully! NEW!' });
    } catch (err) {
        console.log(err);
        return res.json({ error: 'Please fill the required fields!' })
    }
}

exports.update_pg = async (req, res) => {
    try {

    } catch (err) {
        return res.json({ error: 'Please fill the required fields!' })
    }
}

exports.getPgById = async (req, res) => {
    const { id } = req.params;
    const pg = await Pg.findById(id);
    //    const data = pg.json();
    return res.json(pg);
}

exports.applyFilter = async (req, res) => {
    let filter = {};
    const { location } = req.query;
    console.log(req.query);
    filter = {
        "location": { $regex: `${location}`, $options: 'i' }
    };
    const gender = req.body.gender ? req.body.gender : '';

    //AMENITIES
    const amenities_ac = req.body.amenities_ac ? req.body.amenities_ac : '';
    const amenities_laundry = req.body.amenities_laundry ? req.body.amenities_laundry : '';
    const amenities_power_backup = req.body.amenities_power_backup ? req.body.amenities_power_backup : '';

    //MESS 
    const mess_veg = req.body.mess_veg ? req.body.mess_veg : '';
    const mess_non_veg = req.body.mess_non_veg ? req.body.mess_non_veg : '';
    const mess_breakfast = req.body.mess_breakfast ? req.body.mess_breakfast : '';
    const mess_snack = req.body.mess_snack ? req.body.mess_snack : '';

    //OCCUPANCY
    const single_bed = req.body.single_bed ? req.body.single_bed : '';
    const double_bed = req.body.double_bed ? req.body.double_bed : '';
    const triple_bed = req.body.triple_bed ? req.body.triple_bed : '';


    //PRICE
    const minPrice = req.body.min ? req.body.min : 0;
    const maxPrice = req.body.max ? req.body.max : 100000;

    if (gender) filter.gender = gender;
    if (amenities_ac) filter.amenities_ac = amenities_ac;
    if (amenities_laundry) filter.amenities_laundry = amenities_laundry;
    if (amenities_power_backup) filter.amenities_power_backup = amenities_power_backup;

    if (mess_veg) filter.mess_veg = mess_veg;
    if (mess_non_veg) filter.mess_non_veg = mess_non_veg;
    if (mess_breakfast) filter.mess_breakfast = mess_breakfast;
    if (mess_snack) filter.mess_snack = mess_snack;

    if (single_bed && single_bed !== "0") filter.single_bed = { $gt: 0 };
    if (double_bed && double_bed !== "0") filter.double_bed = { $gt: 0 };
    if (triple_bed && triple_bed !== "0") filter.triple_bed = { $gt: 0 };

    // if (minPrice)
    // filter.fee_range = {
    //     min: { $gte: minPrice },
    //     max: { $lte: maxPrice }
    // };

    // filter = { ...filter, 'fee_range.min': { $gte: minPrice }, 'fee_range.max': { $lte: maxPrice } };
    // if (maxPrice)
    // filter.fee_range = { $lte: maxPrice };

    console.log(filter);

    const pgs = await Pg.find(filter);
    res.json({ size: pgs.length, pgs });
}

exports.get_all_pgs = async (req, res) => {
    const pgs = await Pg.find({}).select('name -_id');
    res.json({ pgs, size: pgs.length });
}

exports.showRecommendedPg = async (req, res) => {
    try {
        const recommendedPgs = await Pg.find({ recommended: true }).select('location name');
        res.json({
            size: recommendedPgs.length,
            recommendedPgs
        });
    } catch (err) {
        console.log(err);
    }
}

exports.showPopularLocalities = async (req, res) => {
    try {
        const popularLocalitiesPgs = await Pg.find({}).select('location name').limit(5);
        res.json({
            size: popularLocalitiesPgs.length,
            popularLocalitiesPgs
        });
    } catch (err) {
        console.log(err);
    }
}

exports.showPgById = async (req, res) => {
    const pg = await Pg.findById({ _id: req.params.pg_id });
    res.json({ pg });
}
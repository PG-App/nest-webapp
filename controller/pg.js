const { Pg } = require('../models/pg');

exports.create_pg_post = (req, res) => {
    const {
        cityName,
        pgName,
        pincode,
        type,
        bed,
        ac,
        price
    } = req.body;

    const newPg = new Pg({
        cityName,
        pg: [{
            pgName,
            type,
            pincode,
            bed,
            ac
        }]
    });

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
    const gender = req.body.gender ? req.body.gender : '';
    const amenities_ac = req.body.amenities_ac ? req.body.amenities_ac : '';
    const amenities_laundry = req.body.amenities_laundry ? req.body.amenities_laundry : '';
    const amenities_power_backup = req.body.amenities_power_backup ? req.body.amenities_power_backup : '';
    const minPrice = req.body.min ? req.body.min : 0;
    const maxPrice = req.body.max ? req.body.max : 100000;

    if (gender) filter.gender = gender;
    if (amenities_ac) filter.amenities_ac = amenities_ac;
    if (amenities_laundry) filter.amenities_laundry = amenities_laundry;
    if (amenities_power_backup) filter.amenities_power_backup = amenities_power_backup;
    // if (minPrice)
    // filter.fee_range = {
    //     min: { $gte: minPrice },
    //     max: { $lte: maxPrice }
    // };

    filter = { ...filter, 'fee_range.min': { $gte: minPrice }, 'fee_range.max': { $lte: maxPrice } };
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
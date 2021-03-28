const Pg = require('../models/pg');

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

//Filter
const handleGenderQuery = async (req, res, gender) => {
    const pgs = await Pg.find({ 'gender': gender });

    res.json({ size: pgs.length, pgs });
};

const handleACQuery = async (req, res, ac) => {
    const pgs = await Pg.find({ 'amenties.ac': ac });

    res.json({ size: pgs.length, pgs });
};

const handleFeeQuery = async (req, res, fee) => {
    try {
        let pgs = await Pg.find({
            fee: {
                $gte: fee[0],
                $lte: fee[1],
            },
        });

        res.json({ size: pgs.length, pgs });
    } catch (err) {
        console.log(err);
    }
};

exports.applyFilter = async (req, res) => {
    const {
        gender,
        ac,
        fee
    } = req.body;

    console.log(req.body);

    if (gender) {
        console.log("gender --->", gender);
        await handleGenderQuery(req, res, gender);
    }

    if (ac) {
        console.log("ac --->", ac);
        await handleACQuery(req, res, ac);
    }

    if (fee !== undefined) {
        console.log("fee ---> ", fee);
        await handleFeeQuery(req, res, fee);
      }
}

exports.get_all_pgs = async (req, res) => {
    const pgs = await Pg.find({}).select('name -_id');
    res.json({ pgs, size: pgs.length });
}
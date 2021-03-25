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


exports.applyFilter = async (req, res) => {
    try {
        console.log(req.body);
        // res.send('ok');

        const gender = req.body.gender ? req.body.gender : '';
        // const bed = req.body.bed ? req.body.bed : '';
        const ac = req.body.ac ? req.body.ac : '';
        const minPrice = req.body.min ? req.body.min : 0;
        const maxPrice = req.body.max ? req.body.max : 100000;

        let filter = {};

        if (gender) filter.gender = gender;

        if (ac) filter.amenities = {
            ac
        };

        // if (near_hospital) filter.amenities = {
        //     near_hospital
        // };
        // if (wifi) filter.amenities = {
        //     wifi
        // };
        // if (power_backup) filter.amenities = {
        //     power_backup
        // };
        // if (room_cleaning_service) filter.amenities = {
        //     room_cleaning_service
        // };
        // if (laundry) filter.amenities = {
        //     laundry
        // };
        // if (water_cooler) filter.amenities = {
        //     water_cooler
        // };

        filter.fee = {
            $gte: minPrice,
            $lte: maxPrice
        }

        console.log(filter);

        const pgs = await Pg.find(filter);

        res.json({
            size: pgs.length,
            pgs: pgs
        });
    } catch (err) {
        console.log(err);
    }
}
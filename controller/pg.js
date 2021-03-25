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

exports.getAllPgsByCity = async (req, res) => {
    const pgs = await Pg.find().select('location');
    res.json({ pgs });
}

exports.search_pg_post = async (req, res) => {
    try {
        const { location } = req.body;
        const filter = {
            "location": { $regex: `${location}`, $options: 'i' }
        };
        const pgs = await Pg.find(filter);
        res.status(200).json({
            success: true,
            message: `${pgs.length} pgs found for you!`,
            pgs: pgs
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

exports.searchPgByCity = async (req, res) => {
    try {
        const { cityName } = req.query;

        const city = { $regex: cityName, $options: 'i' };

        const pgs = await City.find({ 'cityName': city })
            .populate('pg')
            .select('cityName pg');

        // const h = await pgs[0].pg;
        // const oids = [];


        // h.forEach(function (item) {
        //     oids.push(new ObjectId(item));
        // });

        // const pgsByCity = await Pg.find({ _id: { $in: oids } });

        res.json({ pgs });
    } catch (error) {
        return res.json({ error });
    }
}

exports.getPgById = async (req, res) => {
    const { id } = req.params;
    const pg = await Pg.findById(id);
    //    const data = pg.json();
    return res.json(pg);
}


exports.applyFilter = async (req, res) => {
    const { cityName } = req.body;
    const locality = req.body.locality ? req.body.locality : '';

    const type = req.body.type ? req.body.type : '';
    const bed = req.body.bed ? req.body.bed : '';
    const ac = req.body.ac ? req.body.ac : '';
    const minPrice = req.body.min ? req.body.min : 0;
    const maxPrice = req.body.max ? req.body.max : 100000;

    let filter = {};

    if (locality) filter.locality = locality;
    if (type) filter.type = type;
    if (bed) filter.bed = bed;
    if (ac) filter.ac = ac;

    filter.price = {
        $gte: minPrice,
        $lte: maxPrice
    }

    console.log(filter);

    const regexCity = { $regex: cityName, $options: 'i' };
    const cityDetails = await City.find({ cityName: regexCity });

    filter.cityName = cityDetails[0]._id;

    const pgs = await Pg.find(filter);

    res.json({
        city: cityDetails[0].cityName,
        size: pgs.length,
        // cities: cityDetails,
        pgs: pgs
    });
}
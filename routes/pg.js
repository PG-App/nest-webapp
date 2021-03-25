const { Router } = require('express');
const router = Router();

const {  create_pg_post, search_pg_post, add_pg, getAllPgsByCity, applyFilter } = require('../controller/pg');

router.post('/add/pgs', create_pg_post);

router.post('/pgs/search', search_pg_post);
router.post('/pgs/search', applyFilter);

router.post('/add/pg', add_pg);

router.get('/get/all/pgs', getAllPgsByCity);


module.exports = router;
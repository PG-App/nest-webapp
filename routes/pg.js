const { Router } = require('express');
const router = Router();

const {  create_pg_post, search_pg_post, add_pg, applyFilter } = require('../controller/pg');

router.post('/add/pgs', create_pg_post);

router.get('/pgs/search', search_pg_post);

router.get('/pgs/filter', (req, res) => res.send('Bhargab'));
router.post('/pgs/filter', applyFilter);

router.post('/add/pg', add_pg);


module.exports = router;
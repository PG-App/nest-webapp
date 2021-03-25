const { Router } = require('express');
const router = Router();

const { postCharge } = require('../controller/stripe');

router.post('/stripe/charge', postCharge);

module.exports = router;
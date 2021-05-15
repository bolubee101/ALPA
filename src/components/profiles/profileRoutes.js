const { Router } = require('express');
let router = Router();

const { getUser } = require('./profile');

router.get('/', getUser)

module.exports = router;
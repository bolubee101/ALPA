const express = require('express');
let router = express.Router();

const { getUser } = require('./profile');

router.get('/', getUser)

module.exports = router;
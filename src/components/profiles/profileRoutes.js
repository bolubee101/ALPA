const { Router } = require('express');
let router = Router();

const { getUser, getOtherUsers } = require('./profile');

router.get('/', getUser)
router.get('/profile', getOtherUsers)

module.exports = router;
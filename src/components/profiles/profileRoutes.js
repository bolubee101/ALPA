const { Router } = require('express');
let router = Router();

const { getUser, updateProfile } = require('./profile');

router.get('/', getUser)
router.put('/', updateProfile)

module.exports = router;
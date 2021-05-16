const { Router } = require('express');
let router = Router();

const { getUser, updateProfile, changeAvatar } = require('./profile');

router.get('/', getUser)
router.put('/', updateProfile)
router.put('/avatar', changeAvatar)

module.exports = router;
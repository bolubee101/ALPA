const express = require('express');
let router = express.Router();
let journals = require('../controllers/journalController');
const { getUser } = require('../controllers/profile');
let GetAllJournals = journals.GetAllJournals;
let GetJournalsById = journals.GetJournalsById;
router.get('/', GetAllJournals);
router.get('/:id', GetJournalsById);
router.get('/profile/:id', getUser)

module.exports = router;

const express = require('express');
let router = express.Router();
let journals = require('../controllers/journalController');

let GetAllJournals = journals.GetAllJournals;
let GetJournalsById = journals.GetJournalsById;
router.get('/', GetAllJournals);
router.get('/:id', GetJournalsById);

module.exports = router;

const express = require('express');
const { verifyToken } = require('../../verifyUser');
let router = express.Router();
let journals = require('../controllers/journalController');

let GetAllJournals = journals.GetAllJournals;
let GetJournalsById = journals.GetJournalsById;
let createJournal = journals.createJournal

router.get('/', GetAllJournals);
router.get('/:id', GetJournalsById);
router.post('/', verifyToken, createJournal);

module.exports = router;

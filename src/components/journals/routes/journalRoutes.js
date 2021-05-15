const express = require('express');
const { verifyToken } = require('../../verifyUser');
let router = express.Router();
let { 
  GetAllJournals, 
  GetJournalsById, 
  createJournal
} = require('../controllers/journalController');

router.get('/', GetAllJournals);
router.get('/:id', GetJournalsById);
router.post('/', verifyToken, createJournal);

module.exports = router;

const express = require('express');
const multer = require('multer');
const { verifyToken } = require('../../verifyUser');
let router = express.Router();
let journals = require('../controllers/journalController');

let GetAllJournals = journals.GetAllJournals;
let GetJournalsById = journals.GetJournalsById;
let createJournal = journals.createJournal

const storage = multer.memoryStorage({
  destination: (req, file, cb) => {
    cb(null, '')
  }
})

const upload = multer({storage}).single('file')
router.use(upload)
router.get('/', GetAllJournals);
router.get('/:id', GetJournalsById);
router.post('/', verifyToken, createJournal);

module.exports = router;

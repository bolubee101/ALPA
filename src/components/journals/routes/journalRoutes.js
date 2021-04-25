const express = require('express');
let router = express.Router();
let journals = require('../controllers/journalController');
const { getUser } = require('../controllers/profile');
const { jwtsecret } = require('../../../config/configuration');
const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  const tokenHeader = req.headers['authorization']
  if (typeof tokenHeader !== 'undefined') {
      const token = tokenHeader.split(' ')[1]
      const {email} = await jwt.verify(token, jwtsecret)
      req.email = email
      next()
  } else {
      res.status(401).json({
          error: 'Unauthorized'
      })
  }
}

let GetAllJournals = journals.GetAllJournals;
let GetJournalsById = journals.GetJournalsById;
router.get('/', GetAllJournals);
router.get('/:id', GetJournalsById);
router.get('/profile/:id', verifyToken, getUser)

module.exports = router;

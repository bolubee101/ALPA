const Journals = require('../models/journals');
const ResponseObject = require('../../../utils/responseObject');
const User = require('../../authentication/models/users');
const Journal = require('../models/journals');

function verifyToken(req, res, next) {
  const tokenHeader = req.headers['authorization']
  if (typeof tokenHeader !== 'undefined') {
      const token = tokenHeader.split(' ')[1]
      req.token = token
      next()
  } else {
      res.status(403).json({
          error: 'Unauthorized'
      })
  }
}

const getUser = async id => {
  const user = await User.findById(id)
  console.log(user)
  journalIds = user.journals
  user.journals = []
  for (let journalId of journalIds) {
    let journal = await Journal.findById(journalId)
    user.journals.push(journal)
  }
  res.json({user})
}

module.exports.getUser = getUser
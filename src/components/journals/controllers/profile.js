const Journals = require('../models/journals');
const ResponseObject = require('../../../utils/responseObject');
const User = require('../../authentication/routes/userAuthentication')

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

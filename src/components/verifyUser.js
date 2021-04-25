const { jwtsecret } = require('../config/configuration');
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

module.exports.verifyToken = verifyToken
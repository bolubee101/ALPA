const { jwtsecret } = require('../config/configuration');
const {verify} = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  const tokenHeader = req.headers['authorization']
  if (typeof tokenHeader !== 'undefined') {
      const token = tokenHeader.split(' ')[1]
      try {
        const {email} = await verify(token, jwtsecret)
        req.email = email
        next()
      } catch (error) {
        let response = new ResponseObject(400, "Unable to verify user", 'Unauthorized', null);
        res.status(response.statusCode);
        delete response.statusCode;
        return res.json(response);
      }
  } else {
    let response = new ResponseObject(401, "You are not authorized", 'Unauthorized', null);
    res.status(response.statusCode);
    delete response.statusCode;
    return res.json(response);
  }
}

module.exports.verifyToken = verifyToken
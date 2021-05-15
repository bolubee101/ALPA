const responseObject = require('../../../utils/responseObject');
const ValidateEmail = (mail) => {
  if (
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      mail
    )
  ) {
    return true;
  }
  return false;
};

const signup = (req, res, next) => {
  let userDTO = req.body;
  let errors = [];
  if (!userDTO.name) {
    errors.push('name');
  }
  if (!userDTO.email || !ValidateEmail(userDTO.email)) {
    errors.push('email');
  }
  if (!userDTO.username || userDTO.username.length < 3) {
    errors.push('username');
  }
  if (!userDTO.password || userDTO.password.length < 6 || userDTO.password.length > 30) {
    errors.push('password');
  }
  if (errors.length !== 0) {
    let response = new responseObject(
      400,
      `the following fields are missing or invalid: ${errors}`,
      'error',
      null
    );
    res.status(response.statusCode);
    delete response.statusCode;
    return res.json(response);
  } else {
    req.userDTO = userDTO;
    next();
  }
};

const login = (req, res, next) => {
  let userDTO = req.body;
  let errors = [];
  if (!userDTO.email || !ValidateEmail(userDTO.email)) {
    errors.push('email');
  }
  if (!userDTO.password) {
    errors.push('password');
  }
  if (errors.length !== 0) {
    let response = new responseObject(
      400,
      `the following fields are missing or invalid: ${errors}`,
      'error',
      null
    );
    res.status(response.statusCode);
    delete response.statusCode;
    return res.json(response);
  } else {
    req.userDTO = userDTO;
    next();
  }
};



module.exports.regBodyValidate = signup;
module.exports.logBodyValidate = login;

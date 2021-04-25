const ResponseObject = require('../../utils/responseObject');
const User = require('../authentication/models/users');
const Journal = require('../journals/models/journals');

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({email: req.email})
    if (user.id !== req.params.id) {
      let resp = new ResponseObject(500, "You are not authorized to fetch that!", 'Unauthorized', {})
      return res.status(resp.statusCode).json(resp.data) 
    }
    delete user.password;
    journalIds = user.journals
    user.journals = []
    for (let journalId of journalIds) {
      let journal = await Journal.findById(journalId)
      user.journals.push(journal)
    }
  res.json({user})
  } catch (error) {
    // console.log(error)
    let resp = new ResponseObject(500, error.message, 'error', {})
    res.status(resp.statusCode).json(resp.data)
  }
}

module.exports.getUser = getUser
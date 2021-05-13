const ResponseObject = require('../../utils/responseObject');
const User = require('../authentication/models/users');
const Journal = require('../journals/models/journals');

const getUser = async (req, res) => {
  try {
    let user = await User.findOne({email: req.email})
    journalIds = user.journals
    user.journals = []
    for (let journalId of journalIds) {
      let journal = await Journal.findById(journalId)
      user.journals.push(journal)
    }
    user = user.toObject()
    delete user.password;
    let resp = new ResponseObject(200, `Successfully retrieved data for user -${user.id}`, "ok", {user})
    res.status(resp.statusCode).json({resp})
  } catch (error) {
    let resp = new ResponseObject(500, error.message, 'error', null)
    res.status(resp.statusCode).json({resp})
  }
}

module.exports.getUser = getUser
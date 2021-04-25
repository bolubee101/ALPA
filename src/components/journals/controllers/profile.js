const Journals = require('../models/journals');
const ResponseObject = require('../../../utils/responseObject');
const User = require('../../authentication/models/users');
const Journal = require('../models/journals');

const getUser = async (req, res) => {
  try {
    const {email} = req
    const user = await User.findOne({email})
    delete user.password
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
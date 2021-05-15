const md5 = require('crypto-js/md5')
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
    if (!user.avatar) {
      user.avatar = `https://www.gravatar.com/avatar/${md5(user.email.toLowerCase())}?d=identicon&s=200`
    }
    let resp = new ResponseObject(200, `Successfully retrieved data for user -${user.id}`, "ok", {user})
    res.status(resp.statusCode).json({resp})
  } catch (error) {
    let resp = new ResponseObject(500, error.message, 'error', null)
    res.status(resp.statusCode).json({resp})
  }
}

const getOtherUsers = async (req, res) => {
  try {
    let user = await User.findOne({username: req.username})
    journalIds = user.journals
    user.journals = []
    for (let journalId of journalIds) {
      let journal = await Journal.findById(journalId)
      user.journals.push(journal)
    }
    user = user.toObject()
    delete user.password;
    if (!user.avatar) {
      user.avatar = `https://www.gravatar.com/avatar/${md5(user.email.toLowerCase())}?d=identicon&s=200`
    }
    let resp = new ResponseObject(200, `Successfully retrieved data for user -${user.id}`, "ok", {user})
    res.status(resp.statusCode).json({resp})
  } catch (error) {
    let resp = new ResponseObject(500, error.message, 'error', null)
    res.status(resp.statusCode).json({resp})
  }
}

const updateProfile = async (req, res) => {

}

module.exports.getUser = getUser
module.exports.getOtherUsers = getOtherUsers
module.exports.updateProfile = updateProfile
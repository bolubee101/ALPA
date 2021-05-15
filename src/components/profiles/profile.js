const md5 = require('crypto-js/md5')
const ResponseObject = require('../../utils/responseObject');
const User = require('../authentication/models/users');
const Journal = require('../journals/models/journals');

const getUser = async (req, res) => {
  try {
    let user = await User.findOne({email: req.email})
    user.views += 1
    await user.save()
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
    user.currentUser = true
    let resp = new ResponseObject(200, `Successfully retrieved data for user -${user.id}`, "ok", {user})
    res.status(resp.statusCode).json({resp})
  } catch (error) {
    let resp = new ResponseObject(500, error.message, 'error', null)
    res.status(resp.statusCode).json({resp})
  }
}

const getOtherUsers = async (req, res) => {
  try {
    let user = await User.findOne({username: req.params.username})
    if (!user) {
      let response = new ResponseObject(404, "User not found", 'not found', null);
      res.status(response.statusCode);
      delete response.statusCode;
      return res.json(response);
    }
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
  res.json({
    message: 'Profile updated successfully'
  })
}

module.exports.getUser = getUser
module.exports.getOtherUsers = getOtherUsers
module.exports.updateProfile = updateProfile
const md5 = require('crypto-js/md5')
const ResponseObject = require('../../utils/responseObject');
const User = require('../authentication/models/users');
const { uploadFile } = require('../journals/controllers/journalController');
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
    user.views += 1
    await user.save()
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
  try {
    let user = await User.findOne({email: req.email})
    let {
      name, username, email, degree, school
    } = req.body
    user.name = name
    user.email=email
    user.username=username
    user.degree=degree
    user.school=school
    await user.save()
    let response = new ResponseObject(
      200,
      'successfully updated user',
      'success',
      user
    );
    res.status(response.statusCode);
    delete response.statusCode;
    res.json({response});
  } catch (error) {
    let response = new ResponseObject(400, error.message, 'error', null);
    res.status(response.statusCode);
    delete response.statusCode;
    res.json({response});
  }
}

const changeAvatar = async (req, res) => {
  try {
    let user = await User.findOne({email: req.email})
    let {
      avatar
    } = req.files
    let avatar_link = await uploadFile(avatar[0])
    console.log('avatar link', avatar_link)
    if (avatar_link.statusCode) return res.status(avatar_link.statusCode).json({avatar_link})
    user.avatar = avatar_link
    await user.save()
    let response = new ResponseObject(
      200,
      'successfully updated user',
      'success',
      user.avatar
    );
    res.status(response.statusCode);
    delete response.statusCode;
    res.json({response});
  } catch (error) {
    let response = new ResponseObject(400, error.message, 'error', null);
    res.status(response.statusCode);
    delete response.statusCode;
    res.json({response});
  }
}

module.exports.getUser = getUser
module.exports.getOtherUsers = getOtherUsers
module.exports.updateProfile = updateProfile
module.exports.changeAvatar = changeAvatar
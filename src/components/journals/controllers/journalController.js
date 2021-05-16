const {S3} = require('aws-sdk')
const {v4} = require('uuid')
const dotenv = require('dotenv')
const Journals = require('../models/journals');
const ResponseObject = require('../../../utils/responseObject');
const User = require('../../authentication/models/users');
const axios = require('axios')
dotenv.config()

const s3 = new S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET
})

const uploadFile = async file => {
  let fileName = file.originalname.split('.')
  let params = {
    Bucket: process.env.AWS_BUCKET,
    Key: `${v4()}.${fileName[fileName.length-1]}`,
    Body: file.buffer
  }
  try {
    let link = await s3.upload(params).promise()
    return link.Location
  } catch (error) {
    return new ResponseObject(500, error.message, 'error', null)
  }
}

const GetAllJournals = async (req, res) => {
  let search = req.query.search
  let journals = await Journals.find({})
  if (req.query.search) journals = await Journals.find({title: new RegExp(search, 'i')})
  try {
    let response = new ResponseObject(
      200,
      'journals successfully retrieved',
      'success',
      journals
    );
    res.status(response.statusCode);
    delete response.statusCode;
    res.json(response);
  } catch (error) {
    let response = new ResponseObject(400, error.message, 'error', null);
    res.status(response.statusCode);
    delete response.statusCode;
    res.json(response);
  }
};

const GetJournalsById = async (req, res) => {
  const id = req.params.id;
  let journal = await Journals.findById(id)
  journal.views += 1
  await journal.save()
  try {
    let data = await axios.get(process.env.API_URL+'/recommendations/'+id)
    let response = new ResponseObject(200, 'successfully retrieved journal', 'ok', data);
    res.status(response.statusCode).json({response})
  } catch (error) {
    console.log(error)
    res.status(500);
    res.json(error.message);
  }
};

const createJournal = async (req, res) => {
  let user = await User.findOne({email: req.email})
  if (!user) {
    let response = new ResponseObject(401, "You are not authorized", 'Unauthorized', null);
    res.status(response.statusCode);
    delete response.statusCode;
    return res.json(response);
  }
  try {
    let {
      title, publication_type, year_of_publication,
      volume, start_page, issue, issn,
      google_scholar, abstract
    } = req.body
    const {files} = req
    if (!['image/png', 'image/jpeg'].includes(files.avatar[0].mimetype)) {
      let response = new ResponseObject(400, "You need to upload an image", 'Bad data', null);
      res.status(response.statusCode);
      delete response.statusCode;
      return res.json(response);
    }
    if (!['application/pdf'].includes(files.file[0].mimetype)) {
      let response = new ResponseObject(400, "You need to upload a pdf", 'Bad data', null);
      res.status(response.statusCode);
      delete response.statusCode;
      return res.json(response);
    }
    let file_link = await uploadFile(files.file[0])
    console.log('file link', file_link)
    if (file_link.statusCode) return res.status(file_link.statusCode).json({file_link})
    let avatar_link = await uploadFile(files.avatar[0])
    console.log('avatar', avatar_link)
    if (avatar_link.statusCode) return res.status(avatar_link.statusCode).json({avatar_link})
    let journal = await Journals.create({
      title, 'publication type': publication_type, 
      'year of publication': year_of_publication,
      volume, 'start page': start_page, issue, issn,
      google_scholar,abstract, file_link, avatar_link
    })
    user.journals.push(journal._id)
    user.save()
    user = user.toObject()
    delete user.password
    console.log(user)
    await axios.post(process.env.API_URL+'/update_recommendations')
    let data = await axios.get(process.env.API_URL+'/recommendations/'+user.id)
    let response = new ResponseObject(200, 'successfully created journal', 'ok', data);
    res.status(response.statusCode).json({response})
  } catch (error) {
    console.log(error)
    let resp = new ResponseObject(500, error.message, 'error', null)
    return res.status(resp.statusCode).json({resp})
  } 
}

module.exports.GetAllJournals = GetAllJournals;
module.exports.GetJournalsById = GetJournalsById;
module.exports.createJournal = createJournal

const AWS = require('aws-sdk')
const {v4} = require('uuid')
const dotenv = require('dotenv')
const Journals = require('../models/journals');
const ResponseObject = require('../../../utils/responseObject');
const User = require('../../authentication/models/users');
const axios = require('axios')
dotenv.config()

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET
})

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
    res.status(301).redirect(process.env.API_URL+'/recommendations/'+id)
  } catch (error) {
    console.log(error)
    res.status(500);
    res.json(error.message);
  }
};

const createJournal = async (req, res) => {
  let user = await User.findOne({email: req.email})
  console.log(user)
  if (!user) {
    let response = new ResponseObject(401, "You are not authorized", 'Unauthorized', null);
    res.status(response.statusCode);
    delete response.statusCode;
    res.json(response);
  }
  try {
    let {
      title, publication_type, year_of_publication, authors,
      volume, start_page, issue, issn,
      google_scholar, abstract
    } = req.body
    authors = authors.split(', ')
    if (!authors) authors = []
    const {file} = req
    let fileName = file.originalname.split('.')
    let params = {
      Bucket: process.env.AWS_BUCKET,
      Key: `${v4()}.${fileName[fileName.length-1]}`,
      Body: file.buffer
    }
  
    s3.upload(params, async (err, data) => {
      if (err) {
        let resp = new ResponseObject(500, "Error uploading file", 'error', null)
        return res.status(resp.statusCode).json(resp)
      }
      let file_link = data.Location
      let journal = await Journals.create({
        title, 'publication type': publication_type, 
        'year of publication': year_of_publication, authors,
        volume, 'start page': start_page, issue, issn,
        google_scholar,abstract, file_link
      })
      user.journals.push(journal._id)
      user.save()
      axios.post(process.env.API_URL+'/update_recommendations')
      res.status(301).redirect(process.env.API_URL+'/recommendations/'+user.id)
    })
  } catch (error) {
    console.log(error)
    let resp = new ResponseObject(500, error.message, 'error', null)
    return res.status(resp.statusCode).json({resp})
  } 
}

module.exports.GetAllJournals = GetAllJournals;
module.exports.GetJournalsById = GetJournalsById;
module.exports.createJournal = createJournal

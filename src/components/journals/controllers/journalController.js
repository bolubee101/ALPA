const AWS = require('aws-sdk')
const {v4} = require('uuid')
const dotenv = require('dotenv')
const Journals = require('../models/journals');
const ResponseObject = require('../../../utils/responseObject');
const User = require('../../authentication/models/users');
dotenv.config()

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET
})

const GetAllJournals = async (req, res) => {
  // for(i of seed){
  //     delete i["_id"];
  // }
  // await Journals.create(seed);
  try {
    let journals = await Journals.find({}).select({
      'year of publication': 1,
      title: 1,
      authors: 1,
      _id: 1,
    });
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
  try {
    let journal = await Journals.findById(id).select({
      _id: 1,
      title: 1,
      'publication type': 1,
      'year of publication':1,
      authors: 1,
      google_scholar: 1,
      'refereed designation': 'Refereed',
      'journal date': 1,
      volume: 1,
      'start page': 1,
      issue: 1,
      pagination: 1,
      issn: 1,
      abstract:1,
      file_link:1
    });
    if (journal) {
      let response = new ResponseObject(
        200,
        'journal successfully retrieved',
        'success',
        journal
      );
      res.status(response.statusCode);
      delete response.statusCode;
      res.json(response);
    } else {
      let response = new ResponseObject(
        404,
        'journal not found',
        'error',
        null
      );
      res.status(response.statusCode);
      delete response.statusCode;
      res.json(response);
    }
  } catch (error) {
    res.status(500);
    res.json('error');
  }
};

const createJournal = async (req, res) => {
  let user = await User.findOne({email: req.email})
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
      let resp = new ResponseObject(201, "Journal created successfully", 'ok', journal)
      return res.status(resp.statusCode).json(resp)
    })
  } catch (error) {
    let resp = new ResponseObject(500, error.message, 'error', null)
    return res.status(resp.statusCode).json({resp})
  } 
}

module.exports.GetAllJournals = GetAllJournals;
module.exports.GetJournalsById = GetJournalsById;
module.exports.createJournal = createJournal

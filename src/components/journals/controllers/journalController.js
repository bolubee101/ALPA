const Journals = require('../models/journals');
const ResponseObject = require('../../../utils/responseObject');
const GetAllJournals = async (req, res) => {
  // for(i of seed){
  //     delete i["_id"];
  // }
  // await Journals.create(seed);
  try {
    let journals = await Journals.find({}).select({
      id: 1,
      'year of publication': 1,
      title: 1,
      authors: 1,
      _id: 0,
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
    let journal = await Journals.findOne({ id }).select({
      _id: 0,
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
    console.log(error.message);
    res.json('error');
  }
};
module.exports.GetAllJournals = GetAllJournals;
module.exports.GetJournalsById = GetJournalsById;

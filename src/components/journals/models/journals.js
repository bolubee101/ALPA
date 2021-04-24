const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  website: {
    type: String,
  },
});

const JournalSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    'publication type': {
      type: String,
      required: true,
    },
    'year of publication': {
      type: String,
    },
    'author temp': [AuthorSchema],
    authors: [],
    'journal title': {
      type: String,
    },
    volume: {
      type: String,
    },
    'start page': {
      type: String,
    },
    issue: {
      type: String,
    },
    issn: {
      type: String,
    },
    google_scholar: {
      type: String,
    },
    abstract: {
      type: String,
    },
    file_link: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UserSchema

let Journal = mongoose.model('Journal', JournalSchema);

module.exports = Journal;

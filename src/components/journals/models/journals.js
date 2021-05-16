const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JournalSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    'publication type': {
      type: String
    },
    'year of publication': {
      type: String,
    },
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
    views: {
      type: Number,
      default:0
    },
    avatar_link : {
      type: String,
      required: true,
      default: 'https://ik.imagekit.io/uknntomzctt/Rectangle_44__3__n7mOd_Kts.png'
    },
    file_link: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

let Journal = mongoose.model('Journal', JournalSchema);

module.exports = Journal;

const express = require('express');
const cors=require("cors");
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const multer = require('multer')
const AWS = require('aws-sdk')
const {v4} = require('uuid')
dotenv.config()

const configuration = require('./config/configuration');

// connect to database
mongoose.connect(configuration.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('mongodb connection established');
});

// initialize app
const app = express();
app.use(cors());
app.use(express.json({ limit: '10mb' }));

const storage = multer.memoryStorage({
  destination: (req, file, cb) => {
    cb(null, '../assets')
  }
})

const upload = multer({storage}).single('file')

const apiRouter = require('./components/apiRouter');
app.use('/api/v1', apiRouter);

const PORT = process.env.PORT || 3333;

app.get('/', (req, res) => {
  res.send('I work');
});

let server = app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

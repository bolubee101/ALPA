const express = require('express');
const multer = require('multer')
const apiRouter = express.Router();

let authentication = require('./authentication/routes/userAuthentication');
let journals = require('./journals/routes/journalRoutes');
const router = require('./profiles/profileRoutes');
const user = require('./profiles/profileRoutes')
const {verifyToken} = require('./verifyUser')


const storage = multer.memoryStorage({
  destination: (req, file, cb) => {
    cb(null, '')
  }
})

const upload = multer({storage}).single('file')

apiRouter.use(upload)

apiRouter.use('/auth', authentication);
apiRouter.use('/journals', journals);
apiRouter.use('/profile', verifyToken, user)

apiRouter.get('*', (req, res) => {
  res.status(404);
  return res.json({
    errorMessage: 'endpoint not found',
  });
});

module.exports = apiRouter;

const express = require('express');
const multer = require('multer')
const apiRouter = express.Router();

let authentication = require('./authentication/routes/userAuthentication');
let journals = require('./journals/routes/journalRoutes');
const { getOtherUsers, contactAuthor } = require('./profiles/profile');
const user = require('./profiles/profileRoutes')
const {verifyToken} = require('./verifyUser')


const storage = multer.memoryStorage()

const upload = multer({storage})

apiRouter.use(upload.fields([
  {name: 'avatar', maxCount: 1},
  {name: 'file', maxCount: 1}
])) 
apiRouter.get('/profile/:username/', getOtherUsers)
apiRouter.post('/contact/:username', contactAuthor)
apiRouter.use('/auth', authentication);
apiRouter.use('/journals', journals);
apiRouter.use('/profile', verifyToken, user)

apiRouter.get('*', (req, res) => {
  res.status(404);
  return res.json({
    errorMessage: 'endpoint not found',
  });
});

apiRouter.post('*', (req, res) => {
  res.status(404);
  return res.json({
    errorMessage: 'endpoint not found',
  });
});

apiRouter.put('*', (req, res) => {
  res.status(404);
  return res.json({
    errorMessage: 'endpoint not found',
  });
});

apiRouter.delete('*', (req, res) => {
  res.status(404);
  return res.json({
    errorMessage: 'endpoint not found',
  });
});

module.exports = apiRouter;

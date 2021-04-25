const express = require('express');
const apiRouter = express.Router();

let authentication = require('./authentication/routes/userAuthentication');
let journals = require('./journals/routes/journalRoutes');
const router = require('./profiles/profileRoutes');
const user = require('./profiles/profileRoutes')
const {verifyToken} = require('./verifyUser')

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

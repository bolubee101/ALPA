const express = require('express');
const apiRouter = express.Router();

let authentication = require('./authentication/routes/userAuthentication');
let journals = require('./journals/routes/journalRoutes');

apiRouter.use('/authentication', authentication);
apiRouter.use('/journals', journals);

apiRouter.get('*', (req, res) => {
  res.status(404);
  return res.json({
    errorMessage: 'endpoint not found',
  });
});

module.exports = apiRouter;

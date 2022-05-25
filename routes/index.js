var express = require('express');
var apiRouter = express.Router();
const budayaRoutes = require('./API/budayaRoutes');
const provinsiRouter = require('./API/provinsiRoutes');

apiRouter.use('/budaya', budayaRoutes);
apiRouter.use('/provinsi', provinsiRouter);

module.exports = apiRouter;

var express = require('express');
var apiRouter = express.Router();
const adminRouter = require('./API/adminRoutes');
const budayaRoutes = require('./API/budayaRoutes');
const provinsiRouter = require('./API/provinsiRoutes');

apiRouter.use('/budaya', budayaRoutes);
apiRouter.use('/provinsi', provinsiRouter);
apiRouter.use('/admin', adminRouter);

module.exports = apiRouter;

const express = require('express');
const budayaRouter = express.Router();
const budayaController = require('../../controllers/budaya');

budayaRouter.get('/', budayaController.getAll);
budayaRouter.get('/:id', budayaController.getBudayaDetail);
budayaRouter.get('/list/:id', budayaController.getListBudaya);

module.exports = budayaRouter;
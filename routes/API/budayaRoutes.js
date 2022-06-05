const express = require('express');
const budayaRouter = express.Router();
const budayaController = require('../../controllers/budaya');
const auth = require('../../middleware/auth');

budayaRouter.get('/value', budayaController.initialId);
budayaRouter.get('/', budayaController.getAll);
budayaRouter.post('/', auth.checkLogin, budayaController.createBudaya);
budayaRouter.get('/:id', budayaController.getBudayaDetail);
budayaRouter.put('/:id', auth.checkLogin, budayaController.updateBudayaById);
budayaRouter.delete('/:id', auth.checkLogin, budayaController.deleteBudayaById);
budayaRouter.get('/list/:id', budayaController.getListBudaya);

module.exports = budayaRouter;
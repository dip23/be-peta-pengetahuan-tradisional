const express = require('express');
const multer = require('multer');
const budayaRouter = express.Router();
const budayaController = require('../../controllers/budaya');
const auth = require('../../middleware/auth');
const { getStorage } = require("../../services/cloudinary");

const storage = getStorage('budaya');
const upload = multer({ storage });

budayaRouter.get('/value', budayaController.initialId);
budayaRouter.get('/', budayaController.getAll);
budayaRouter.get('/all', auth.checkLogin, budayaController.getBudayaAll);
budayaRouter.post('/', auth.checkLogin, upload.single("image"), budayaController.createBudaya); 
budayaRouter.get('/:id', budayaController.getBudayaDetail);
budayaRouter.put('/:id', auth.checkLogin, upload.single("image"), budayaController.updateBudayaById); 
budayaRouter.delete('/:id', auth.checkLogin, budayaController.deleteBudayaById); 
budayaRouter.get('/list/:id', budayaController.getListBudaya);

module.exports = budayaRouter;
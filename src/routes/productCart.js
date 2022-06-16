const express = require ('express');
const router = express.Router();
const productCartController = require ('../controllers/productCartController');
const authMiddleware = require('../middlewares/authMiddleware');



router.get('/rental-cart', authMiddleware, productCartController.productCart)


module.exports = router; 
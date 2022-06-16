const express = require ('express');
const router = express.Router();
const aboutUsController= require ('../controllers/aboutUsController')
const authMiddleware = require("../middlewares/authMiddleware")

router.get('/aboutUs', aboutUsController.index)
router.post('/aboutUs',authMiddleware, aboutUsController.create)

module.exports = router; 
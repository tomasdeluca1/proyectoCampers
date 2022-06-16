const express = require ('express');
const router = express.Router();
const path = require('path')
const productController = require ('../controllers/productsController')
const multer = require ('multer')
const validationsCreateProduct = require('../middlewares/validationsCreateProduct');
const validationsEditProduct = require('../middlewares/validationsEditProduct');
const adminPermissions = require('../middlewares/adminPermissions');




const storage = multer.diskStorage({
    destination: function (req, file, cb){
        let folder = './public/images/imagenesproductos';
        cb(null, folder);
    },
    filename: function(req, file, cb){
        let imageName = 'imgProducto-' + Date.now() + path.extname(file.originalname)
        cb(null, imageName)
    }
});


const uploadFile = multer({storage: storage});



router.get('', productController.productDetail)
router.get('/create', adminPermissions, productController.productCreation)
router.post('/create', uploadFile.single('imagenDelProducto'), validationsCreateProduct, productController.create)
router.get('/:idProducto', productController.getProductById)
router.get('/:idProducto/edit', adminPermissions, productController.edit)
router.put('/:idProducto/edit', uploadFile.single('imagenDelProducto'), validationsEditProduct, productController.edition)
router.delete('/:idProducto/delete', productController.delete)







module.exports = router; 
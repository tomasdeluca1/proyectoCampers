const express = require ('express');
const router = express.Router();
const path = require('path');
const usersController = require ('../controllers/usersController');
const multer = require ('multer');
const registerValidations = require ('../middlewares/userValidations');
const loginValidations = require ('../middlewares/userLoginValidations');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const adminPermissions = require('../middlewares/adminPermissions')
const myProfileMiddleware = require('../middlewares/myProfileMiddleware')


const storage = multer.diskStorage({
    destination: function(req, file, cb){
        let folder = './public/images/avatarPerfil';
        cb(null, folder);
    },
    filename: function(req, file, cb){
        let imageName = 'imgUser-' + Date.now() + path.extname(file.originalname)
        cb(null, imageName)
    }
});

const uploadFile = multer({storage: storage});



//Vistas del registro 
router.get('/register', guestMiddleware, usersController.register)

// Proceso del registro
router.post('/register', uploadFile.single('avatar'), registerValidations, usersController.registration)

//Vistas del login
router.get('/login', guestMiddleware, usersController.login)

//Proceso del login
router.post('/login', loginValidations, usersController.loginProcess)

// Vistas del perfil de usuario
router.get('/profile/:id', authMiddleware, myProfileMiddleware, usersController.profile)

// //Vista editar perfil usuario
// router.get('/profile/:id/edit', authMiddleware, usersController.editProfileData)

// //Proceso editar perfil usuario
// router.put('/profile/:id/edit', usersController.processeditProfileData)

//Logout
router.get('/logout', usersController.logout)

//Todos los usuarios
router.get('/all-users', adminPermissions, usersController.allUsers)

//Buscar usuarios por nombre
router.get('/search', adminPermissions,  usersController.search)






module.exports = router; 
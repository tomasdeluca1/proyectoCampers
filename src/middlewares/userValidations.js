const bcrypt = require('bcryptjs/dist/bcrypt');
const { check } = require ('express-validator');
const path = require ('path')
const usuarios = require ('../database/usersDetalle.json')
const User = require ('../models/users');

// const db = require('../database/models/index.js');
// const Op = db.Sequelize.Op;

const userValidations = [
    check('firstName')
        .notEmpty().withMessage('Tienes que completar con tu nombre').bail()
        .isLength({ min: 2}).withMessage('Tiene que ser mayor a dos letras'),
    check('lastName')
        .notEmpty().withMessage('Tienes que completar con tu apellido').bail()
        .isLength({ min: 2}).withMessage('Tiene que ser mayor a dos letras'),
    check('password')
        .notEmpty().withMessage('Tienes que poner una contraseña').bail()
        .isLength({min: 6}).withMessage('La contraseña tiene que tener mas de 6 caracteres').bail()
        .custom((value, { req }) => {
        let password = req.body.password;
        let password2 = req.body.password2;
        
        if (password !== password2){
            throw new Error ('La contraseña es distinta, pruebe otra vez')
        }
        return true
    }),
    check('avatar').custom((value, { req }) => {
        let file = req.file;
        let validExtension = ['.jpg', '.png', '.PNG', '.JPG'];

        if (file){ 
            let fileExtension = path.extname(file.originalname);
            if(!validExtension.includes(fileExtension)){
                throw new Error (`Las extensiones tienen que ser ${validExtension.join(', ')}"`)
            }
        }
        return true;
    }),
    check('email')
        .notEmpty().withMessage('Tienes que completar con tu email').bail()
        .isEmail().withMessage('Tienes que ser un correo electronico valido').bail()
        .custom((value, { req }) => {

            // let entryEmail = req.body.email.toLowerCase();

            

            // function hola(){
            //     db.Users.findAll({
            //         where: {
            //             email: value
            //         }
            //     })
            //     .then(function(users){
            //         let boolean = true;
            //         for (let i = 0; i < users.length; i++) {
            //             if(users[i].email == entryEmail){
            //                 boolean = false
            //                 }             
            //             }
            //             return boolean;
            //         })
            //     .then(function(boolean){
            //         if (boolean == false) {
            //             throw new Error 
            //         } else {
            //             return true
            //             }
            //         })
            //     .catch(function(errors){
            //         if(errors){
            //             return false
            //             }
            //         })
            //     }
   
            for(let i = 0; i < usuarios.length; i++){
                if(entryEmail == usuarios[i].email){
                    throw new Error ('Este email ya esta registrado')
                }
            }     
            return true
    }),
    check('userName')
        .notEmpty().withMessage('Tienes que elegir un nombre de usuario').bail()
        .isLength({ min : 4 }).withMessage('Tu nombre de usuario tiene que ser mayor de 4 caracteres').bail()
        .custom((value, { req }) => {

            

            // db.Users.findOne({
            //     where: {
            //         userName
            //     }
            // })
            // .then(function(usersName){
            //     let usersNam;
            //     let usersNameLowerCase;
            //     usersNameList = usersName;
                
            //     return usersNameList;
            // })
            // .then(function(usersNameList){

            // })

            // db.Users.findAll()
            // .then(function(users){
            //     let nombreDeUsuario = [];
            //     let userNameLowerCase;
            //     for (let i = 0; i < users.length; i++) {
            //         userNameLowerCase = users[i].userName;
            //         nombreDeUsuario.push(userNameLowerCase.toLowerCase());
            //     }
            //     return nombreDeUsuario;
            // })
            // .then(function(nombreDeUsuario ){
            //     let entryUserName = req.body.userName;
            //     let entryUserNameLowerCase = entryUserName.toLowerCase()
            //     for (let i = 0; i < nombreDeUsuario.length; i++) {
            //         if(nombreDeUsuario[i] === entryUserNameLowerCase){
            //             throw new Error ('Este nombre de usuario ya existe')
            //         }   
            //     }
            // })
            // .catch(function(errors){
            //     return errors
            // })
            
            let entryUserName = req.body.userName;
            const all = User.findAll()
            function nombresDeUsuario(){
                let nombreDeUsuario = []
                let userNameLowerCase;
                for (let i = 0; i < all.length; i++) {
                    userNameLowerCase = all[i].userName;
                    nombreDeUsuario.push(userNameLowerCase.toLowerCase());
                }
                return nombreDeUsuario;
            }

            function verificarNombreDeUsuario (usersNames, entryUserName){
                let entryUserNameLowerCase = entryUserName.toLowerCase()
                for (let i = 0; i < usersNames.length; i++) {
                    if(usersNames[i] === entryUserNameLowerCase){
                        throw new Error ('Este nombre de usuario ya existe')
                    }   
                }
            }
            verificarNombreDeUsuario(nombresDeUsuario(), entryUserName)

            return true
    })
];

    // .custom(async value => {
    //     let userEmail = await User.findOne({
    //         where: { 'email': value }
    //     })
    //     if (userEmail !== null) {
    //         if (userEmail.dataValues.email === value) {
    //             return Promise.resolve();
    //         } else {
    //             return Promise.reject();
    //         } 
    //       }
    // })
    // .withMessage("El email ya se encuentra registrado.")

           
            

module.exports = userValidations;
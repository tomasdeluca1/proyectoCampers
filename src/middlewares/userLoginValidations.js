const { check } = require ('express-validator');
const path = require ('path')
const usuarios = require ('../database/usersDetalle.json')
const User = require('../models/users')


const validations = [
    check('email')
        .notEmpty().withMessage('Tienes que poner tu email').bail()
        .isEmail().withMessage('Tienes que poner tu email correctamente').bail()
        .custom((value, { req }) => {
            let email = req.body.email.toLowerCase();
            let findingEmail = User.findByField('email', email)
            if(findingEmail == undefined){
                throw new Error ('Este email no existe')
            }
            return true
        }),
    check('password')
        .notEmpty().withMessage('Tienes que poner tu contraseña').bail()
]


module.exports = validations;
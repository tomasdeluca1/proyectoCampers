const { check } = require ('express-validator');
const path = require ('path')
const usuarios = require ('../database/usersDetalle.json')

const reviewValidations = [
    check('viajero')
        .notEmpty().withMessage('Tienes que completar con tu nombre').bail()
        .isLength({ min: 2}).withMessage('Tiene que ser mayor a dos letras'),
    check('destino')
        .notEmpty().withMessage('Tienes que completar con el destino de tu viaje').bail()
        .isLength({ min: 2}).withMessage('Tiene que ser mayor a dos letras'),
    check('estrellas')
        .notEmpty().withMessage('Tienes que calificar tu viaje').bail()
        ,
    check('rate').custom((value, { req }) => {
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
    .isEmail().withMessage('Tiene que ser un correo electronico valido').bail()
    .custom((value, { req }) => {
        let entryEmail = req.body.email.toLowerCase();

        for(let i = 0; i < usuarios.length; i++){
            if(entryEmail == usuarios[i].email){
                throw new Error ('Este email ya esta registrado')
            }
        }

        return true
    })
]




module.exports = reviewValidations;
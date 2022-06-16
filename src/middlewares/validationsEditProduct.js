const {check} = require ('express-validator');
const path = require ('path');

const validations = [
    check('marcaDelProducto')
        .notEmpty().withMessage('Tienes que completar el campo con la marca del producto'),
    check('modeloDelProducto')
        .notEmpty().withMessage('Tienes que completar el campo con el modelo del producto'),
    check('descripcionDelProducto')
        .notEmpty().withMessage('Tienes que completar el campo con la descripcion del producto'),
    check('capacidadDelProducto')
        .notEmpty().withMessage('Tienes que completar el campo con la capacidad del producto').bail()
        .isNumeric().withMessage('Tienes que completar con un número'),
    check('imagenDelProducto').custom((value, { req }) => {
        let file = req.file;
        let validExtension = ['.jpg', '.png', '.PNG', '.JPG'];

        if (file){ 
            let fileExtension = path.extname(file.originalname);
            if(!validExtension.includes(fileExtension)){
                throw new Error (`Las extensiones tienen que ser ${validExtension.join(', ')}"`)
            }
        }
        return true;
    })
]

module.exports = validations;
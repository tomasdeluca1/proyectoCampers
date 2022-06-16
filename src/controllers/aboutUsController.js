const todasLasReviews = require("../database/reviewsDetalle.json")
const fs = require('fs')
const multer = require('multer')
const { validationResult } = require ('express-validator')



const json = __dirname + '/../database/reviewsDetalle.json'

const controller = {
    index: function(req, res){
        res.render('aboutUs/aboutUs', {reviews : todasLasReviews});
    },
    
    create: function (req ,res, next){
        let errors = validationResult(req)

        if(errors.isEmpty()){
            let archivoReviewsParaElId = fs.readFileSync(json, {encoding: 'utf-8'});
            let archivoReviewsParaElIdJSON = JSON.parse(archivoReviewsParaElId);
            let id = 0;
            if(archivoReviewsParaElIdJSON.length > 0){
                id = archivoReviewsParaElIdJSON.length + 1;
            }

            
                var review = {
                id,
                nombre: req.body.viajero,
                email: req.body.email,
                destino: req.body.destino,
                rate: req.body.rate,
                estrellas: req.body.estrellas,
                titulo:req.body.adventureTitle,
                descripcion:req.body.adventureDescription
            }
            
            //Guardar la info
            //Primero: leer que cosas ya habia!

            let archivoReviews = fs.readFileSync(json, {encoding: 'utf-8'});
            if (archivoReviews == ""){
                reviews = []
            } else {
                reviews = JSON.parse(archivoReviews)
                console.log(review);reviews.push(review);
            };
            
        
           reviewsJSON = JSON.stringify(reviews, null, ' ')
            fs.writeFileSync(json, reviewsJSON);
            res.redirect('/aboutUs')
        } else {
            res.render('./products/productCreation', {errors: errors.mapped(), oldData: req.body})
        }

}
}




module.exports = controller;
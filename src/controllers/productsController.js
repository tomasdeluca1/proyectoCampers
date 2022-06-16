const todosLosProductos = require("../database/productosDetalle.json")
const fs = require('fs')
const multer = require('multer')
const req = require("express/lib/request")
const { Console } = require("console")
const { validationResult } = require ('express-validator')

const json = __dirname + '/../database/productosDetalle.json'

const controller = {
    productDetail: function(req, res){
        res.render('./products/productDetail', {infoProductos : todosLosProductos})
    },
    productCreation: function(req, res){
        res.render('./products/productCreation', {infoProductos : todosLosProductos})
    },
    create: function (req ,res, next){
        let errors = validationResult(req)

        if(errors.isEmpty()){
            let archivoProductosParaElId = fs.readFileSync(json, {encoding: 'utf-8'});
            let archivoProductosParaElIdJSON = JSON.parse(archivoProductosParaElId);
            let id = 0;
            if(archivoProductosParaElIdJSON.length > 0){
                id = archivoProductosParaElIdJSON.length + 1;
            }

            if(req.file){
                let image = req.file.filename
                var producto = {
                id,
                marca: req.body.marcaDelProducto,
                modelo: req.body.modeloDelProducto,
                img: image,
                detalle: req.body.descripcionDelProducto,
                capacidad: req.body.capacidadDelProducto,
            }
            }
            //Guardar la info
            //Primero: leer que cosas ya habia!

            let archivoProductos = fs.readFileSync(json, {encoding: 'utf-8'});
            if (archivoProductos == ""){
                productos = []
            } else {
                productos = JSON.parse(archivoProductos)
            };
            productos.push(producto);
            productosJSON = JSON.stringify(productos, null, ' ')
            fs.writeFileSync(json, productosJSON);
            res.redirect('/products')
        } else {
            res.render('./products/productCreation', {errors: errors.mapped(), oldData: req.body})
        }

    },
    getProductById: function (req, res){
        let idProducto = req.params.idProducto;

        let archivoProductos = fs.readFileSync(json, {encoding: 'utf-8'});

        if (archivoProductos == ""){
            productos = []
        } else {
            productos = JSON.parse(archivoProductos)
        };

        let mostrarProducto;

        for (let i = 0; i < productos.length; i++) {
            if(productos[i].id == idProducto){
                mostrarProducto = productos[i];
            }
        };

        for (let i = 0; i < todosLosProductos.length; i++){
            if(idProducto == null || idProducto == 0 || idProducto == undefined){
                res.render('error404')
            } else if (idProducto == todosLosProductos[i].id){
                res.render('./products/productDescription', {mostrarProducto: mostrarProducto})
            }
        }
    },
    edit: function(req, res){
        let idProducto = req.params.idProducto;
        let productoEdit;

        for (let i = 0; i < todosLosProductos.length; i++){
            if(idProducto == null || idProducto == 0 || idProducto == undefined){
                res.render('error404')
            } else if (idProducto == todosLosProductos[i].id){
                productoEdit = todosLosProductos[i]
                res.render('./products/productEdit', {producto: productoEdit})
            }
        }
    },
    edition: function(req, res){
        let errors = validationResult(req)

        if(errors.isEmpty()){
            let idProducto = req.params.idProducto;

            let archivoProductos = fs.readFileSync(json, {encoding: 'utf-8'});

            if (archivoProductos == ""){
                productos = []
            } else {
                productos = JSON.parse(archivoProductos)
            };


            let imageOriginal;

            for (let i = 0; i < productos.length; i++) {
                if(productos[i].id == idProducto){
                    imageOriginal = productos[i].img;
                };
            };

            var productoModificado;

            for (let i = 0; i < productos.length; i++){
                if (idProducto == productos[i].id){
                    if(req.file){
                        let image = req.file.filename;
                        productoModificado = {
                            id: productos[i].id,
                            marca: req.body.marcaDelProducto,
                            modelo: req.body.modeloDelProducto,
                            img: image,
                            detalle: req.body.descripcionDelProducto,
                            capacidad: req.body.capacidadDelProducto,
                        }
                    } else if(req.file == undefined){
                        productoModificado = {
                            id: productos[i].id,
                            marca: req.body.marcaDelProducto,
                            modelo: req.body.modeloDelProducto,
                            img: imageOriginal,
                            detalle: req.body.descripcionDelProducto,
                            capacidad: req.body.capacidadDelProducto,
                        }
                    }
                }
            };
            for (let i = 0; i < productos.length; i++){
                if (idProducto == productos[i].id){
                    productos[i] = productoModificado;
                }
            };
            productosJSON = JSON.stringify(productos, null, ' ')
            fs.writeFileSync(json, productosJSON)
            res.redirect('/products');
        } else {
            let idProducto = req.params.idProducto;
            let productoEdit;
            for (let i = 0; i < todosLosProductos.length; i++){
                if(idProducto == todosLosProductos[i].id){
                    productoEdit = todosLosProductos[i]
                }
            }
            res.render('./products/productEdit', {errors: errors.mapped(), oldData: req.body, producto: productoEdit})
        };
    },
    delete: function (req, res) {
        let id = req.params.idProducto;

        let archivoProductos = fs.readFileSync(json, {encoding: 'utf-8'});
                
        if (archivoProductos == ""){
            productos = []
        } else {
            productos = JSON.parse(archivoProductos);
        };

        archivoProductos = productos.filter(numero => numero.id != id);
        console.log(archivoProductos)

        productosJSON = JSON.stringify(archivoProductos, null, ' ');
        fs.writeFileSync(json, productosJSON);
        res.redirect('/products');
    },
}




module.exports = controller;
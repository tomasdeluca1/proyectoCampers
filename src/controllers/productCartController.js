const todosLosProductos = require("../database/productosDetalle.json")

const controller = {
    productCart: function(req, res){
        res.render('./productCart/productCart')
    },
}



module.exports = controller;
const express = require('express');
const app = express();
const methodOverride = require ('method-override')
const session = require('express-session')
const cookies = require('cookie-parser')


const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware')
const adminPermissions = require('./middlewares/adminMiddleware')


app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')


//Middlewares
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(session({
    secret: 'Secreto',
    resave: false,
    saveUninitialized: false,
}));
app.use(cookies());

app.use(userLoggedMiddleware);
app.use(adminPermissions);



//Rutas
const main = require ('./routes/main');
const productCart = require ('./routes/productCart');
const products= require ('./routes/products');
const users = require ('./routes/users');
const aboutUs= require('./routes/aboutUs');
const req = require('express/lib/request');


app.use('/', main)
app.use('/', productCart)
app.use('/products', products)
app.use('/', users)
app.use('/', aboutUs)


//Inicializacion del servidor
app.listen(5000, ()=>{
    console.log("Server 5000 running");
});
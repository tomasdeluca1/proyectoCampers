const User = require('../models/users')

function userLoggedMiddleware(req, res, next){
    res.locals.isLogged = false;

    let emailInCookie = req.cookies.userEmail;
    let userFromCookie = User.findByField('email', emailInCookie);

    if(userFromCookie){
        req.session.userLogged = userFromCookie;
    };

    if(req.session && req.session.userLogged){
        res.locals.isLogged = true;
        //Con esto los datos se transforman en datos locales y no datos que vienen de la web.
        res.locals.userLogged = req.session.userLogged;
    };

    next();
}

module.exports = userLoggedMiddleware;
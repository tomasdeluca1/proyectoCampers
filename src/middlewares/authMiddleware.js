function authMiddleware (req, res, next){
    if(req.session.userLogged == undefined){
        res.redirect('login')
    }
    next();
}

module.exports = authMiddleware;
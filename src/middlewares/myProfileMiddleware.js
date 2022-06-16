function myProfileMiddleware(req, res, next){
    let id = parseInt(req.params.id);
    if(req.session.userLogged.id !== id){
        res.render('error404')
    }
    next()
}



module.exports = myProfileMiddleware;
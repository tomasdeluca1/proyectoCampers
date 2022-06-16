
function adminMiddleware (req, res, next){

    let user = req.session.userLogged;
    res.locals.admin = false;

    if(user && user.typeOfUser == 1){
        res.locals.admin = true;
    }
    next();

}

module.exports = adminMiddleware;
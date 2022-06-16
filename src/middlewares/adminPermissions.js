function adminPermissions (req, res, next){
    let user = req.session.userLogged;

    if(!user || user && user.typeOfUser == 2){
        return res.render('error404')
    } 
    next();
}

module.exports = adminPermissions;
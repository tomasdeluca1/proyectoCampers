const fs = require('fs')
const { validationResult } = require ('express-validator')
const bcrypt = require ('bcryptjs')

const User = require ('../models/users');



const controller = {
    login: function(req, res){
        res.render('./users/login')
    },
    register: function(req, res){
        res.render('./users/register')
    },
    registration: function(req, res){
        let errors = validationResult(req);
        function image(){
            let imagen = 'avatarDefault.png'
            if (req.file) {
                return req.file.filename;
            } else {
                return imagen;
            }
        }
        if(errors.isEmpty()){
            // let userData = {
            //     name: req.body.firstName,
            //     lastName: req.body.lastName,
            //     email: req.body.email.toLowerCase(),
            //     password: bcrypt.hashSync(req.body.password, 10),
            //     avatar: image(),
            //     phoneNumber: req.body.phoneNumber,
            // }

            let typeOfUser = User.creatingTypeOFUser(req.body.email)

            let userData = {
                ...req.body,
                email: req.body.email.toLowerCase(),
                password: bcrypt.hashSync(req.body.password, 10),
                password2: '',
                avatar: image(),
                typeOfUser: typeOfUser,
            }
            delete userData.password2;

            let userCreated = User.create(userData);
            res.redirect('login')
        } else {
            res.render('users/register', {errors: errors.mapped(), oldData: req.body})
        }
    }, 
    loginProcess: function(req, res){
        let errors = validationResult(req)

        if(errors.isEmpty()){
            let email = req.body.email.toLowerCase()
            let userToLogin = User.findByField('email', email)
            let password = req.body.password;


            if(userToLogin){
                let verifyingPassword = bcrypt.compareSync(password, userToLogin.password)
                if(verifyingPassword){
                    delete userToLogin.password
                    req.session.userLogged = userToLogin;

                    if(req.body.rememberUser){
                        res.cookie('userEmail', email, { maxAge: (1000 * 60) * 2 })
                    }

                    return res.redirect('home');
                }
                return res.render('users/login', {errors: {password:{msg: 'La contraseña es invalida'}}})} 
        } else {
            res.render('users/login', {errors: errors.mapped(), oldData: req.body})
        }
    },
    profile: function(req, res){
        res.render('./users/userProfile', {
            user: req.session.userLogged
        })
    },
    logout: function(req, res){
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('home');
    },
    allUsers: function(req, res){
        let allUsers = User.findAll();
        res.render('./users/allUsers', { users: allUsers })
    },
    search: function(req, res){
        let loQueBuscoElAdmin = req.query.searchingUsers.toLowerCase().trim().replace('-', ' ').replace('_', ' ').replace('.', ' ');

        

        let getAllUsers = User.findAll();

        let coincidences = [];

        for (let i = 0; i < getAllUsers.length; i++) {
            if(getAllUsers[i].firstName.toLowerCase().includes(loQueBuscoElAdmin) || getAllUsers[i].lastName.toLowerCase().includes(loQueBuscoElAdmin) || getAllUsers[i].userName.toLowerCase().includes(loQueBuscoElAdmin) || (getAllUsers[i].firstName + ' ' + getAllUsers[i].lastName).toLowerCase().includes(loQueBuscoElAdmin)){
                coincidences.push(getAllUsers[i])
            }
        }

        if(!loQueBuscoElAdmin){
            coincidences = [];
        }

        res.render('users/userResults', { usersResults : coincidences })
    }
}



module.exports = controller;


// 1. Guardar al usuario en la DB
// 2. Buscar al usuario que se quiere loggear por su Email
// 3. Buscar a un usuario por su Id
// 4. Editar la info de un usuario
// 5. Eliminar a un usuario de la DB

const fs = require('fs')
const path = require('path')

const user = {
    fileName: __dirname + '/../database/usersDetalle.json',

    getData: function(){
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },

    generateId: function(){
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if(lastUser){
            return lastUser.id + 1;
        }
        return 1
    },

    findAll: function(){
        return this.getData();
    },

    findByPk: function(id){
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id === id);
        return userFound
    },

    findByField: function(field, text){
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] === text);
        return userFound;
    },

    create: function(userData){
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData
        }
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '))
        return newUser
    },

    delete: function(id){
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '))
        return true
    },

    creatingTypeOFUser: function(email){
        let admins = ['frandelqueran@gmail.com']
        let emailLowerCase = email.toLowerCase()

        if(emailLowerCase.includes(admins)){
            return 1
        } else {
            return 2
        }
    }
}













module.exports = user;
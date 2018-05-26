let schemas = require('./schema')
let mongoose = require('mongoose')  
let schema = mongoose.Schema    

let registerSchema = new schema(schemas.getRegisterSchema())  

let register = mongoose.model('RegisterPlayRoom', registerSchema)  
function getRegister() {
  return register
}

module.exports = { 
    getRegister: getRegister
}
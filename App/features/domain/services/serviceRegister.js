'use strict'

let {register} = require('../entities/Register')
let {find} = require('../repository/crud')


let getAllRegister = async (req) => {
    let filter = {headquarters: req.headquarters}
    let projection = '-_id -__v'
    let result = await find(register, filter, projection)
    return result
}


module.exports = { // Exporta todos los metodos
    getAllRegister
  }


/* jshint esversion: 6 */

let schemas = require('./schema')
let mongoose = require('mongoose')  // mongoose es algo que nos permite facilidad a la hora de manejar esquemas y hacer consultar
let schema = mongoose.Schema    // se defina una variable Schema

let url = 'mongodb://system:root@ds229458.mlab.com:29458/prestemosudea'
var moon = mongoose.connect(url, {
  useMongoClient: true
})
function close () {
  moon.close()
}

let implementSchema = new schema(schemas.getImplementsSchema())  // Creacion del esquema como tal
let inventorySchema = new schema(schemas.getInventorySchema())

let implement = mongoose.model('Implements', implementSchema)  // creacion del modelo, este es que conecta con la bd, se le pasa el esquema de la tabla a//Creacion del esquema como tal
let inventory = mongoose.model('Inventory', inventorySchema)                                         // la que va a mapear

function getImplements () {
  return implement
}

function getInventory () {
  return inventory
}

module.exports = { // Exporta todos los modelos
  getImplements: getImplements,
  getInventory: getInventory,
  close: close
}

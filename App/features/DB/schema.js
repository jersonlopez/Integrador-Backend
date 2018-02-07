/* jshint esversion: 6 */

let inventorySchemaJSON = {
  inventory: [{}]
}

function getInventorySchema () {
  return inventorySchemaJSON
}

let implementsSchemaJSON = { // estructura del esquema, en formato json, excelente para nodo porque json surge de js y node esta basado en js
  typeImplement: String,
  quantity: Number
}

function getImplementsSchema () {
  return implementsSchemaJSON
}

module.exports = { // Exporta todos los metodos
  getImplementsSchema: getImplementsSchema,
  getInventorySchema: getInventorySchema
}

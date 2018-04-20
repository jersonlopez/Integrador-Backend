/* jshint esversion: 6 */

let implementsSchemaJSON_play = { // estructura del esquema, en formato json, excelente para nodo porque json surge de js y node esta basado en js
    typeImplement: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
}

  function getImplementsSchema() {
    return implementsSchemaJSON_play
  }
  
  module.exports = { // Exporta todos los metodos
    getImplementsSchema: getImplementsSchema
  }
  
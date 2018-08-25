'use strict'

let {resource} = require('../entities/Resource')
let {register} = require('../entities/Register')
let {save, update, find, remove} = require('../repository/crud')

let saveResource = async (req) => {
    let filter = { name: req.name, headquarters: req.headquarters }
    let projection = '-__v'
    let doc = await find(resource ,filter, projection)
    
    if (doc.length !== 0) {
      
        let updateQuantity;
        updateQuantity = parseInt(doc[0].quantity) + parseInt(req.quantity)
        console.log(updateQuantity);
        
        let filterUpdate = { _id: doc[0]._id }
        let set = { $set: { quantity: updateQuantity } }
  
        update(resource ,filterUpdate, set)
        return { "message": `Cantidad de ${req.name} Actulizada` }
      } else {
        let resources = new resource({
          headquarters: req.headquarters, name: req.name, quantity: req.quantity
          })

        await save(resources) 

        let registers = new register({
          resource: req.name, headquarters:req.headquarters, quantityLoan: 0, quantityDevolution: 0
        })

        await save(registers)
        return { "message": "Implemento guardado exitosamente" }
      }

};

let getAllResouces = async (req) => {
    let filter = { headquarters: req.headquarters }
    let projection = '-_id -__v'
    let result = await find(resource, filter, projection)
    return result
}

/*
function getByImplement(req, res) {
  implement.find({ typeImplement: req.body.typeImplement }, '-_id -__v', function (err, doc) {
    if (doc.length === 0) {
      res.send({ "message": "No se encuentra este implemento en nuestro inventario" })
    } else {
      res.status(200).jsonp(doc)
    }

  })
}*/


let decreaseImplement= async(req)=> {

  let filter = { name: req.name, headquarters: req.headquarters }
  let projection = '-__v'
  let doc = await find(resource ,filter, projection)

  if (doc.length !== 0) {
      let updateQuantity;
      let oldQuantity;
      oldQuantity = doc[0].quantity;
      updateQuantity = parseInt(doc[0].quantity) - parseInt(req.quantity)
      if (req.quantity < oldQuantity) {
        let set = { $set: { quantity: updateQuantity } }
        await update(resource, filter, set)
        return { "message": `Cantidad de ${req.name} Actulizada` }
      }
      else {
        return { "message": `La cantidad de ${req.name} ingresada es invalida` }
      }
    }else{
      return { "message": `Este implemento no existe en la base de datos` }
    }
  }

let deleteImplement = async (req) => {
  let filter = { name : req.name, headquarters: req.headquarters}
  await remove(resource, filter)
  return { "message": "Implemento eliminado correctamente" }
};

module.exports = { // Exporta todos los metodos
  saveResource,
  getAllResouces,
  deleteImplement,
  decreaseImplement
}

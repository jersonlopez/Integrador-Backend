'use strict'

let {resource} = require('../entities/Resource')
let {register} = require('../entities/Register')
let {save, update, find, remove} = require('../repository/crud')

let saveResource = async (req) => {
    let filter = { name: req.name }
    let projection = '-__v'
    let doc = await find(resource ,filter, projection)
    
    if (doc.length !== 0) {
      console.log("oe entre el if");
      
        let updateQuantity;
        updateQuantity = parseInt(doc[0].quantity) + parseInt(req.quantity)
        console.log(updateQuantity);
        
        let filterUpdate = { _id: doc[0]._id }
        let set = { $set: { quantity: updateQuantity } }
  
        let upgrade = update(resource ,filterUpdate, set)
        return { "message": `Cantidad de ${req.name} Actulizada` }
      } else {
        let resources = new resource({
          headquarters: req.headquarters, name: req.name, quantity: req.quantity
          })

        let keepResource =await save(resources) 
        
        console.log("#############################\n")
        console.log(keepResource)
        console.log("\n#############################\n")

        let registers = new register({
          resource: req.name, quantityLoan: 0, quantityDevolution: 0
        })

        let keep = await save(registers)
        return { "message": "Implemento guardado exitosamente" }
      }

};

let getAllResouces = async () => {
    let filter = {}
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

  let filter = { name: req.name }
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

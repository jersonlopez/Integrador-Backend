'use strict'

let {resource} = require('../entities/Resource')
let {register} = require('../entities/Register')
let {save, update,find} = require('../repository/crud')

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
        return { "message": `Cantidad de ${req.typeImplement} Actulizada` }
      } else {
        let resource = new resource({
            typeResource: req.typeResource, name: req.name, quantity: req.quantity
          })

        let keepResource =await save(resource)  

        let register = new register({
          typeResource: req.typeResource, quantityLoan: 0, quantityDevolution: 0, quantityServiceRendered: 0
        })

        let keep = await  save(register)
        return { "message": "Implemento guardado exitosamente" }
      }

};

let getAllResouces = async () => {
    let filter = {}
    let projection = '-_id -__v'

    let result = await find(resource, filter, projection)
    return result
}


function getByImplement(req, res) {
  implement.find({ typeImplement: req.body.typeImplement }, '-_id -__v', function (err, doc) {
    if (doc.length === 0) {
      res.send({ "message": "No se encuentra este implemento en nuestro inventario" })
    } else {
      res.status(200).jsonp(doc)
    }

  })
}

function decreaseImplement(req, res) {
  implement.find({ typeImplement: req.body.typeImplement }, '-__v', function (err, doc) {
    if (doc.length !== 0) {
      let updateQuantity;
      let oldQuantity;
      oldQuantity = doc[0].quantity;
      updateQuantity = parseInt(doc[0].quantity) - parseInt(req.body.quantity)
      if (req.body.quantity < oldQuantity) {
        implement.findOneAndUpdate({ _id: doc[0]._id }, { $set: { quantity: updateQuantity } }, function (err) {
          res.send({ "message": `Cantidad de ${req.body.typeImplement} Actulizada` })
        })
      }
      else {
        res.send({ "message": `La cantidad de ${req.body.typeImplement} ingresada es invalida` })
      }
    }
  })
}

function deleteImplement(req, res) {
  implement.findOneAndRemove({typeImplement: req.params.typeImplement}, function(err) {
      if (!err) {
        res.send({ "message": "Implemento eliminado correctamente" });
      }
    });
};

module.exports = { // Exporta todos los metodos
  saveResource,
  getAllResouces,
  deleteImplement: deleteImplement,
  getByImplement: getByImplement,
  decreaseImplement : decreaseImplement
}

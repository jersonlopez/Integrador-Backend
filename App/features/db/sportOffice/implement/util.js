let modelImplement = require('./model')
let modelRegister = require('../register/model')

implement = modelImplement.getImplements()
register = modelRegister.getRegister()

function saveImplements(req, res) { // función para guardar implemento
  implement.find({ typeImplement: req.body.typeImplement }, '-__v', function (err, doc) {

    if (doc.length !== 0) {
      let updateQuantity;
      let oldQuantity;
      oldQuantity = doc[0].quantity;
      updateQuantity = parseInt(doc[0].quantity) + parseInt(req.body.quantity)

      implement.findOneAndUpdate({ _id: doc[0]._id}, {$set:{quantity: updateQuantity }}, function (err) {
        res.send({ "message": `Cantidad de ${req.body.typeImplement} Actulizada` })
      })
    } else {
      let Register = new register({
        typeImplement: req.body.typeImplement, quantityLoan: 0, quantityDevolution: 0, quantityServiceRendered: 0
      })
      Register.save(function () {
        res.send({ "message": "Implemento guardado exitosamente" })
      })

      let Implement = new implement({
        typeImplement: req.body.typeImplement, quantity: req.body.quantity
      })

      Implement.save(function (err) {
        console.log(err);

      })
    }

  });
};

function getAllImplements(req, res) {
  implement.find({}, '-_id -__v', function (err, doc) {
    res.status(200).jsonp(doc)
  })
};

function getByImplement(req, res) {
  implement.find({typeImplement : req.body.typeImplement}, '-_id -__v', function (err, doc) {
    if(doc.length === 0){
      res.send({ "message": "No se encuentra este implemento en nuestro inventario" })
    }else{
      res.status(200).jsonp(doc)
    }

  })
}


function deleteImplement(req, res) {
  implement.findOneAndRemove({ typeImplement: req.params.typeImplement }, function (err) {
    if (!err) {
      res.send({ "message": "Implemento eliminado correctamente" });
    }
  });
}

module.exports = { // Exporta todos los metodos
  saveImplements: saveImplements,
  getAllImplements: getAllImplements,
  deleteImplement: deleteImplement,
  getByImplement : getByImplement
}

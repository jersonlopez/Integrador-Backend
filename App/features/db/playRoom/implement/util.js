let modelImplement = require('./model')
let modelRegister = require('../register/model')


register_play = modelRegister.getRegister()
implement_play = modelImplement.getImplements()


function saveImplements(req, res) {
  implement_play.find({ typeImplement: req.body.typeImplement }, '-__v', function (err, doc) {

    if (doc.length !== 0) {
      let updateQuantity;
      let oldQuantity;
      oldQuantity = doc[0].quantity;
      updateQuantity = parseInt(doc[0].quantity) + parseInt(req.body.quantity)


      implement_play.findOneAndUpdate({ _id: doc[0]._id }, { $set: { quantity: updateQuantity } }, function (err) {
        res.send({ "message": `Cantidad de ${req.body.typeImplement} Actulizada` })
      })
    } else {
      let Register = new register_play({
        typeImplement: req.body.typeImplement, category: req.body.category, quantityLoan: 0, quantityDevolution: 0, quantityServiceRendered: 0
      })
      Register.save(function () {
        res.send({ "message": "Implemento guardado exitosamente" })
      })

      let Implement = new implement_play({
        typeImplement: req.body.typeImplement, category: req.body.category, quantity: req.body.quantity
      })
      Implement.save(function (err) {
        console.log(err);

      })

    }

  });
};

function getAllImplements(req, res) {
  implement_play.find({}, '-_id -__v', function (err, doc) {
    res.status(200).jsonp(doc)
  })
};

function getByImplement(req, res) {
  implement_play.find({ typeImplement: req.body.typeImplement }, '-_id -__v', function (err, doc) {
    if (doc.length === 0) {
      res.send({ "message": "No se encuentra este implemento en nuestro inventario" })
    } else {
      res.status(200).jsonp(doc)
    }
  })
}


function decreaseImplement(req, res) {
  implement_play.find({ typeImplement: req.body.typeImplement }, '-__v', function (err, doc) {

    if (doc.length !== 0) {
      let updateQuantity;
      let oldQuantity;
      oldQuantity = doc[0].quantity;
      updateQuantity = parseInt(doc[0].quantity) - parseInt(req.body.quantity)
      if (req.body.quantity <= oldQuantity) {
        implement_play.findOneAndUpdate({ _id: doc[0]._id }, { $set: { quantity: updateQuantity } }, function (err) {
          res.send({ "message": `Cantidad de ${req.body.typeImplement} Actulizada` })
        })
      }
      else {
        res.send({ "message": `Cantidad de ${req.body.typeImplement} ingresada es invalida` })
      }
    }
  })
}

function deleteImplement(req, res) {
  implement_play.findOneAndRemove({ typeImplement: req.params.typeImplement }, function (err) {
    if (!err) {
      res.send({ "message": "Implemento eliminado correctamente" });
    }
  });
};

module.exports = { // Exporta todos los metodos
  saveImplements: saveImplements,
  getAllImplements: getAllImplements,
  deleteImplement: deleteImplement,
  getByImplement: getByImplement,
  decreaseImplement: decreaseImplement
}

let modelImplement = require('./model')

implement_play = modelImplement.getImplements()


function saveImplements(req, res) { // función para guardar implemento
  implement_play.find({ typeImplement: req.body.typeImplement }, '-__v', function (err, doc) {

    if (doc.length !== 0) {
      let updateQuantity;
      let oldQuantity;
      oldQuantity = doc[0].quantity;
      updateQuantity = doc[0].quantity + req.body.quantity;

      implement_play.findOneAndUpdate({ _id: doc[0]._id}, {$set:{quantity: updateQuantity }}, function (err) {
        res.send({ "message": `Cantidad de ${req.body.typeImplement} Actulizada` })
      })
    } else {

      let Implement = new implement_play({
        typeImplement: req.body.typeImplement, category: req.body.category, quantity: req.body.quantity
      })
      Implement.save(function () {
        res.send({ "message": "Implemento ingresado adecudamente" })
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
  implement_play.find({typeImplement : req.body.typeImplement}, '-_id -__v', function (err, doc) {
    if(doc.length === 0){
      res.send({ "message": "No se encuentra este implemento en nuestro inventario" })
    }else{
      res.status(200).jsonp(doc)
    }
  })
}


function deleteImplement(req, res) {
  implement_play.findOneAndRemove({ typeImplement: req.params.typeImplement }, function (err) {
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

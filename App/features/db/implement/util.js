let model = require('./model')

implement = model.getImplements()

function saveImplements (req, res) { // función para guardar implemento

  implement.find({}, '-_id -__v', function (err, doc) {   //// PROBARRRRRR
    let i = 0;
    for (i; i < doc.length; i++) {
      if (req.body.typeImplement == doc[i].typeImplement) {
        doc[i].quantity = doc[i].quantity + req.body.quantity;
        implement.findOne({ typeImplement: req.params.typeImplement }, function (err, implement) {
          if (err) return handleError(err);
          implement.quantity = doc[i].quantity;
          implement.save(function () {
            res.send("Actualizamos tus datos");
          });
        });
      } else {
        let newImplement = new implement({
          typeImplement: req.body.typeImplement, quantity: req.body.quantity
        });
        newImplement.save(function () {
          res.send("Implemento registrado exitosamente" /*+ newImplement*/)
        })
      }
    }
  });
};


function getAllImplements (req, res) {
  implement.find({}, '-_id -__v', function (err, doc) {
    res.status(200).jsonp(doc)
  })
};

module.exports = { // Exporta todos los metodos
  saveImplements: saveImplements,
  getAllImplements: getAllImplements
}

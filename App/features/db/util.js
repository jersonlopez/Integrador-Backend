let model = require('./model')

implement = model.getImplements()

function saveImplements(req, res) { // función para guardar implemento
  let newImplement = new implement({
    typeImplement: req.body.typeImplement, quantity: req.body.quantity
  })

  newImplement.save(function () {
    res.send(newImplement)
  })
};

function getAllImplements(req, res) {
  implement.find({}, '-_id -__v', function (err, doc) {
    res.status(200).jsonp(doc)
  })
};

module.exports = { // Exporta todos los metodos
  saveImplements: saveImplements,
  getAllImplements: getAllImplements
}

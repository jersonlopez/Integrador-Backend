let model = require('./model')

implement = model.getImplements()

function saveImplements(req, res) { // función para guardar implemento
  implement.find( {typeImplement: req.body.typeImplement}, '-_id -__v', function (err, doc) {   //// PROBARRRRRR
    let updateQuantity;
    let oldQuantity;
    oldQuantity = doc[0].quantity;
    updateQuantity = doc[0].quantity + req.body.quantity;
    let Implement = new implement({
      typeImplement : req.body.typeImplement, quantity : updateQuantity
    })
    Implement.save(function () {
      res.send("Actualizada cantidad de " + req.body.typeImplement /*+ newImplement*/)
    })
    implement.findOneAndRemove({typeImplement:req.body.typeImplement, quantity: oldQuantity}, function(err) {
    });  
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

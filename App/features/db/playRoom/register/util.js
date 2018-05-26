let modelRegister = require ('./model')

register_Play = modelRegister.getRegister()  



function getAllRegister (req, res) {
    register_Play.find({}, '-_id -__v ', function (err, doc) {
      res.status(200).jsonp(doc)
  });
}

module.exports = { 
  getAllRegister : getAllRegister
}


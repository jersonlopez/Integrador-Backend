const modelLoan = require('./model')
const modelDevolution = require('../devolution/model')
const {
  studentInformation,
  facultyInformation
} = require('../../../consumptionMares/consumptionMares')
const modelImplement = require('../implement/model')
const modelRegister = require('../register/model')


let loan_play = modelLoan.getLoan()
let studentData
let devolution = modelDevolution.getDevolution()
let implement_play = modelImplement.getImplements()
let register_play = modelRegister.getRegister()


async function getSanction(req, res) {
  let sanctionTime;

  await studentInformation(req.body.id).then((data) => {
    if (data.data.length == 0) {
      res.send({
        "message": "Por favor ingrese una cedula valida"
      })
    } else {
      studentData = {
        id: req.body.id,
        name: data.data[0].nombre + " " + data.data[0].apellidos,
        phone: data.data[0].telefono,
        email: data.data[0].emailInstitucional
      }
    }
  })

  await facultyInformation(req.body.id).then((data) => {
    studentData.faculty = data.data[0].facultad
  })
  devolution.find({
    id: req.body.id
  }, '-_id -__v -attendant -typeImplement -observation', function (err, doc) {
    if (doc.length > 0) {
      let timeSanction = doc[doc.length - 1].timeSanction
      if (parseInt(timeSanction) > 0) {
        res.send({
          "message": "USUARIO SANCIONADO; aun tiene " + timeSanction + " Dias de sancion"
        });
        return
      }
    }
    if (err) {
      console.log(err);
    }
    res.send(studentData);
  });

};


async function saveLoan(req, res) {
  let doc1 = await implement_play.find({ typeImplement: req.body.typeImplement }, '-__v')
  if (doc1[0].quantity < req.body.quantity) {
    res.send({ "message": "No hay implementos disponibles en este momento" })
  } else {
    await implement_play.findOneAndUpdate({ typeImplement: req.body.typeImplement }, { $set: { quantity: doc1[0].quantity - req.body.quantity } }, function (err) {
    });
    let newLoan = new loan_play({
      id: studentData.id,
      name: studentData.name,
      state: "Activo",
      typeImplement: req.body.typeImplement,
      faculty: studentData.faculty,
      phone: studentData.phone,
      attendant: req.body.attendant,
      email: studentData.email,
      loanDate: new Date().getTime(),
      hourIn: (new Date).getHours() + ":" + (new Date).getMinutes() + ":" + (new Date).getSeconds(),
      quantity: req.body.quantity
    })
    newLoan.save(function (err, success) {
      console.log(err);
    })
    let doc = await register_play.find({ typeImplement: req.body.typeImplement }, '-__v')
    register_play.findOneAndUpdate({ _id: doc[doc.length - 1]._id }, { $set: { quantityLoan: doc[0].quantityLoan + 1 } }, function (err) {
      res.send({ "message": "Prestamo efectuado exitosamente" })
    });
  }
};

function getAllLoan(req, res) {
  loan_play.find({}, '-_id -__v', function (err, doc) {
    res.status(200).jsonp(doc)
  })
};

function getActualLoans(req, res) {
  loan_play.find({ state: "Activo" }, '-_id -__v', function (err, doc) {
    res.status(200).jsonp(doc)
  })
};

function getLatestLoans(req, res) {
  loan_play.find({}, '-_id -__v', function (err, doc) {
    let tam = doc.length - 10;
    let i, j, k;
    let ti;
    let quantityImplement = 0;
    let registerRecord = [];
    i = tam
    while (i < doc.length) {
      j = i;
      while (j < doc.length) {
        if (doc[i].typeImplement === doc[j].typeImplement) {
          quantityImplement = quantityImplement + 1;
        }
        j = j + 1;
      }
      let ban = true;
      k = 0;
      while (k < registerRecord.length) {
        if (registerRecord[k].typeImplement === doc[i].typeImplement) {
          ban = false;
        }
        k = k + 1;
      }
      if(ban){
        registerRecord.push({typeImplement: doc[i].typeImplement, quantity: quantityImplement})
      }
      quantityImplement = 0;
      i = i + 1; 
    }
    res.status(200).jsonp(registerRecord)
  })
};


module.exports = {
  saveLoan: saveLoan,
  getSanction: getSanction,
  getAllLoan: getAllLoan,
  getActualLoans: getActualLoans,
  getLatestLoans : getLatestLoans
}
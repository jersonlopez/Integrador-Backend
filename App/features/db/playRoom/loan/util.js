const modelLoan = require('./model')
const modelDevolution = require('../devolution/model')
const {
  studentInformation,
  facultyInformation
} = require('../../../consumptionMares/consumptionMares')

let loan_play = modelLoan.getLoan()
let studentData
let devolution = modelDevolution.getDevolution()


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


function saveLoan(req, res) {
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
    hourIn: (new Date).getHours() + ":" + (new Date).getMinutes() + ":" + (new Date).getSeconds()
  })
  newLoan.save(function () {
    res.send({
      "message": "prestamo efectuado"
    })
  })
};

function getAllLoan(req, res) {
  loan_play.find({}, '-_id -__v', function (err, doc) {
    res.status(200).jsonp(doc)
  })
};

function getActualLoans(req, res) {
  loan_play.find({state: "Activo"}, '-_id -__v', function (err, doc) {
    res.status(200).jsonp(doc)
  })
};


module.exports = {
  saveLoan: saveLoan,
  getSanction: getSanction,
  getAllLoan: getAllLoan,
  getActualLoans: getActualLoans
}
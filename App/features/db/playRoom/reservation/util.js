const {
    authenticacion,
    studentInformation
} = require('../../../consumptionMares/consumptionMares')
const modelReservation = require('./model')


let reservation = modelReservation.getReservation()
let studentData

async function saveReservation(req, res) {

    let rule = 4 * 3600000
    let until = new Date().getTime() + rule

    await authenticacion(req.body.usuario, req.body.clave).then((data) => {

        if (!!parseInt(data.data) == false) {
            res.send({
                "message": "Usuario o Contraseña Incorrectos"
            })
        } else {
            if (parseInt(data.data) != parseInt(req.body.id)) {
                res.send({
                    "message": "No es usuario activo de la Universidad de Antioquia"
                })
            } else {
                studentData = {
                    id: parseInt(data.data)
                }
            }
        }
    });

    reservation.find({ id: req.body.id }, '-_id -__v -attendant -typeImplement -observation', function (err, doc) {

        if (doc.length > 0) {
            let rightNow = new Date().getTime()
            let untilUser = doc[doc.length - 1].until
            if (parseInt(rightNow) <= parseInt(untilUser)) {
                res.send({ "message": "Ya tiene una reserva agendada; no puede hacer más reservas" });
            } else {
                sendReservation(req, res, until)
            }
        } else {
            sendReservation(req, res, until)
        }
    });
};


async function sendReservation(req, res, until) {
    let i = 0;

    await studentInformation(req.body.id).then((data) => {
        studentData.name = data.data[0].nombre + " " + data.data[0].apellidos
        studentData.phone = data.data[0].telefono
        studentData.email = data.data[0].emailInstitucional
    })

    let newReservation = new reservation({
        id: studentData.id,
        name: studentData.name,
        resevationDate: req.body.resevationDate,
        typeConsole: req.body.typeConsole,
        phone: studentData.phone,
        hourIn: req.body.hourIn,
        controlQuantity: req.body.controlQuantity,
        email: studentData.email,
        videoGame: req.body.videoGame,
        role: "Responsable",
        until: until
    })
    newReservation.save(function (err, success) {
        console.log(err)
    })

    while (i < req.body.companion.length) {

        await studentInformation(req.body.companion[i].id).then((data) => {
            studentData.name = data.data[0].nombre + " " + data.data[0].apellidos
            studentData.phone = data.data[0].telefono
            studentData.email = data.data[0].emailInstitucional
        })
        let newReservation = new reservation({
            id: req.body.companion[i].id,
            name: studentData.name,
            resevationDate: req.body.resevationDate,
            typeConsole: req.body.typeConsole,
            phone: studentData.phone,
            hourIn: req.body.hourIn,
            controlQuantity: req.body.controlQuantity,
            email: studentData.email,
            videoGame: req.body.videoGame,
            role: "Acompañante",
            until: until
        })
        newReservation.save(function () { })
        i++
    }
    res.send({
        "message": "RESERVACION GUARDADA"
    })
}



function getAllReservation(req, res) {
    loan.find({}, '-_id -__v', function (err, doc) {
        res.status(200).jsonp(doc)
    })
};



module.exports = {
    saveReservation,
    getAllReservation
}
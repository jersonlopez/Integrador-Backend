let scheduleInstance = require('node-schedule');

let modelDevolutionSportsOffices = require('../sportOffice/devolution/model')
let modelDevolutionPlayRoom = require('../playRoom/devolution/model')

let devolutionSportsOffices = modelDevolutionSportsOffices.getDevolution()
let devolutionPlayRoom = modelDevolutionPlayRoom.getDevolution()


function getSanctionSportOffices() {
    return devolutionSportsOffices.find({ timeSanction: { $gt: 0 } }, '-_id -__v -typeImplement -observation -attendant')
        .exec().then((data) => {
            return data
        }).catch((err) => {
            return { err: err }
        })
};

async function updateSanctionSportOffices() {
    let array = await getSanctionSportOffices()
    for (let i = 0; i <= array.length - 1; i++) {
        if (array[i].timeSanction > 0) {
            let newSanction = array[i].timeSanction - 1

            devolutionSportsOffices.findOneAndUpdate({ id: array[i].id }, { timeSanction: newSanction })
                .exec().then((data) => {
                    console.log("actualizado con exito ")
                }).catch((err) => {
                    return { err: err }
                })

        }
    }
}

function getSanctionPlayRoom() {
    return devolutionPlayRoom.find({ timeSanction: { $gt: 0 } }, '-_id -__v -typeImplement -observation -attendant')
        .exec().then((data) => {
            return data
        }).catch((err) => {
            return { err: err }
        })
};

async function updateSanctionPlayRoom() {
    let array = await getSanctionPlayRoom()
    for (let i = 0; i <= array.length - 1; i++) {
        if (array[i].timeSanction > 0) {
            let newSanction = array[i].timeSanction - 1

            devolutionPlayRoom.findOneAndUpdate({ id: array[i].id }, { timeSanction: newSanction })
                .exec().then((data) => {
                    console.log("actualizado con exito ")
                }).catch((err) => {
                    return { err: err }
                })

        }
    }
}


function schedule() {
    let rule = new schedule.RecurrenceRule();

    rule.dayOfWeek = [0, new schedule.Range(1, 5)];
    rule.hour = 23;
    rule.minute = 0;

    let j = scheduleInstance.scheduleJob(rule, function () {
        updateSanctionSportOffices()
        updateSanctionPlayRoom() 
    });

}

module.exports = { schedule }

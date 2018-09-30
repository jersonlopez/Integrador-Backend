'use strict'

const scheduleInstance = require('node-schedule');

let { devolution } = require('../domain/entities/Devolution')
let { update, find } = require('../domain/repository/crud')


let getSanctionSportOffices = async () => {

    let filter = { timeSanction: { $gt: 0 } }
    let projection = '-_id -__v -typeImplement -observation -attendant'
    return(await find(devolution, filter, projection)
    .then((data) => {
        return data
    }).catch((err) => {
        return { err: err }
    }))
};

async function updateSanctionSportOffices() {
    let array = await getSanctionSportOffices()
    for (let i = 0; i <= array.length - 1; i++) {
        if (array[i].timeSanction > 0) {
            let newSanction = array[i].timeSanction - 1

            let filter = { id: array[i].id }
            let set = { timeSanction: newSanction }
            return(await update(devolution, filter, set)
            .then((data) => {
                console.log("actualizado con exito ")
            }).catch((err) => {
                console.log("hubo un error actulizando las sanciones:\n ", err)
            }))

        }
    }
}


function schedule() {
    let rule = new scheduleInstance.RecurrenceRule();

    rule.dayOfWeek = [0, new scheduleInstance.Range(1, 5)];
    rule.hour = 23;
    rule.minute = 0;

    let j = scheduleInstance.scheduleJob(rule, function () {
        updateSanctionSportOffices()
    });

}

module.exports = { schedule }

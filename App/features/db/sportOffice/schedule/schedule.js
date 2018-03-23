let scheduleInstance = require('node-schedule');

let modelDevolution = require('../devolution/model')

let devolution = modelDevolution.getDevolution()

function getSanction() {
    return devolution.find({ timeSanction: { $gt: 0 } }, '-_id -__v -typeImplement -observation -attendant')
        .exec().then((data) => {
            return data
        }).catch((err) => {
            return { err: err }
        })
};

async function updateSanction() {
    let array = await getSanction()
    for (let i = 0; i <= array.length - 1; i++) {
        if (array[i].timeSanction > 0) {
            let newSanction = array[i].timeSanction - 1

            devolution.findOneAndUpdate({ id: array[i].id }, { timeSanction: newSanction })
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
        updateSanction()
    });

}

module.exports = { schedule }

let schedule = require('node-schedule');

let modelDevolution = require('../devolution/model')

let devolution = modelDevolution.getDevolution()

function getSanction() {
    return devolution.find({/*timeSanction: { $gte : 1 }*/ }, '-_id -__v -typeImplement -observation -attendant')
        .exec().then((data) => {
            return data
        }).catch((err) => {
            return { err: err }
        })
};

async function updateSanction() {
    let rule = new schedule.RecurrenceRule();

    rule.dayOfWeek = [0, new schedule.Range(1, 5)];
    //rule.hour = 11;
    rule.minute = 4;

    /* let j = schedule.scheduleJob(rule, function () {
        console.log('Today is recognized by Rebecca Black! .......');
    }); */

    let array = await getSanction()

    for (let i = 0; i <= array.length - 1; i++) {
        if (array[i].timeSanction > 0) {
            let newSanction = array[i].timeSanction - 1

            devolution.findOneAndUpdate({id: array[i].id }, {timeSanction: newSanction})
                .exec().then((data) => {
                    console.log("actualizado con exito ")
                }).catch((err) => {
                    return { err: err }
                })

        }
    }
}

updateSanction()


function test() {
    let rule = new schedule.RecurrenceRule();

    rule.dayOfWeek = [0, new schedule.Range(1, 5)];
    //rule.hour = 10;
    rule.minute = 4;

    let j = schedule.scheduleJob(rule, function () {
        console.log('Today is recognized by Rebecca Black! .......');
    });
}

module.exports = { test }

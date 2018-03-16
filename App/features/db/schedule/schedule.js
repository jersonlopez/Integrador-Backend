
let schedule = require('node-schedule');

function test() {
    let rule = new schedule.RecurrenceRule();

    rule.dayOfWeek = [0, new schedule.Range(1, 5)];
    //rule.hour = 10;
    rule.minute = 4;

    let j = schedule.scheduleJob(rule, function () {
        console.log('Today is recognized by Rebecca Black! .......');
    });
}

module.exports = {test}

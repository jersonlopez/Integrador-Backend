const { schedule } = require("./App/features/db/schedule/schedule")
const { db } = require("./conection")

const {} = require('./App/features/calendar/listEvent')


let app = require('./server')

require('http').Server(app)

app.listen(app.get('port'), () => {
    console.log(`It's the best app... http://localhost:${app.get('port')}`)
})

schedule
db

module.exports = app;
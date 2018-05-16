const express = require('express')

const {schedule} = require("./App/features/db/schedule/schedule")
const {db} = require("./conection")

let app = new express()


require('./server')(app)

app.listen(app.get('port'), () => {
  console.log(`It's the best app... ${app.get('port')}`)
})

schedule
db
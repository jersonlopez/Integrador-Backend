const express = require('express')

const {schedule} = require("./App/features/db/sportOffice/schedule/schedule")
const {db} = require("./conection")

let app = new express()
db

require('./server')(app)

app.listen(app.get('port'), () => {
  console.log(`It's the best app... ${app.get('port')}`)
})

schedule

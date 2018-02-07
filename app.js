/* jshint esversion: 6 */

const express = require('express')

const config = require('./config')

let app = new express()

require('./server')(app)

app.listen(app.get('port'), () => {
  console.log(`It's the best app... ${app.get('port')}`)
})

const express = require('express')

var app = new express()

require('./server')(app)

app.listen(app.get('port'), () => {
  console.log(`It's the best app... ${app.get('port')}`)
})

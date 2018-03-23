const mongoose = require('mongoose')

let url = 'mongodb://system:root@ds229458.mlab.com:29458/prestemosudea'

mongoose.connection.on('error', (err) => {
    console.log('ERROR:', err)
  })
  
let moon = mongoose.connect(url)

exports.db = moon
const { schedule } = require('./App/features/schedule/schedule')
const { moon } = require("./conection")


let app = require('./server')

require('http').Server(app)

app.listen(app.get('port'), () => {
    console.log(`It's the best app... http://localhost:${app.get('port')}`)
})

schedule()
moon

module.exports = app;
/*jshint esversion: 6 */

const morgan = require('morgan');

const config = require('./config');
const routes = require('./App/routes');

module.exports = (app) =>{
    app.set('port', config.port);

    app.use(morgan(config.morganMode));

    app.use('/',routes);

}
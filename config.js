/* jshint esversion: 6 */

const path = require('path')

const rootPath = path.resolve(__dirname, '.')
const port = process.env.Dev ? 3200 : 8080
const morganMode = process.env.Dev ? 'dev' : 'tiny'

module.exports = {
  rootPath,
  port,
  morganMode
}

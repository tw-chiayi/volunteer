
var conf = require("./../config");

var knex = require('knex')({
  client: 'pg',
  connection: conf.database
});

module.exports = knex;
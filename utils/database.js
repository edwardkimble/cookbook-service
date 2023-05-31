//
// database.js
//
// Exports 
// dbConnection: connection object to our MySQL database in AWS RDS
//

const mysql = require('mysql');
const fs = require('fs');
const ini = require('ini');

const config = require('./config.js');

const cookbook_config = ini.parse(fs.readFileSync(config.cookbook_config, 'utf-8'));
const endpoint = cookbook_config.rds.endpoint;
const port_number = cookbook_config.rds.port_number;
const user_name = cookbook_config.rds.user_name;
const user_pwd = process.env.AWS_RDS_PW ?? '';
const db_name = cookbook_config.rds.db_name;

//
// creates connection object, but doesn't open connnection:
//
let dbConnection = mysql.createConnection(
  {
    host: endpoint,
    port: port_number,
    user: user_name,
    password: user_pwd,
    database: db_name,
    multipleStatements: true  // allow multiple queries in one call
  }
);

module.exports = dbConnection;
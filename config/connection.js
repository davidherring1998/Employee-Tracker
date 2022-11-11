const mysql = require('mysql2');

const connect = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Punkypunk!98',
      database: 'employee_tracker_db'
    },
    console.log(`Connected to the classlist_db database.`)
  );

module.exports = { connect };
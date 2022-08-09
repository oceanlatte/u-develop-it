const mysql = require('mysql2'); // requiring the npm pkg

// file is called CONNECTION and it is IN the 'db' directory
// bc we are connecting all db files through the npm pkg

// this is how we are connecting the database from MySQL 2 npm pkg
// to be able to have access to the data in our application
// we have hardcoded the database we are using 'election'

// ---Connects app to the MySQL database---
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'h0tch33tos',
  database: 'election'
});


// exporting 'db' to be used elsewhere in the application
module.exports = db; 
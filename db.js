const mysql = require('mysql');
const db = mysql.createConnection({

    host: '142.44.161.115',
    port: '3306',
    user: 'BCAFE',
    password: 'Bcafe##403',
    database: 'DBCAFE'

});

db.connect((err) => {
    if (err) {
        throw err;

    }

    console.log('mysql is connected ...');

});
module.exports = db;
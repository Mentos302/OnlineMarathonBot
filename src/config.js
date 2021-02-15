module.exports = {
    startmsg() {
        console.log(`Bot has been started...`)
    },
    TOKEN: `1172794219:AAH6OjXfr0Wgo03Zz-5QJjt34TYtyF2WGCo`,
    sqlConnect(name) {
        const moment = require('moment');
        const mysql = require("mysql2");
        const connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            database: "marathon",
            password: "root"
        });
        connection.connect(function(err) {
            if (err) {
                return console.error("Error: " + err.message);
            } else {
                if (name != undefined) { console.log(`[${moment().format('hh:mm')}] ${name} connected to DB and start to using bot`); }
            }
        });
        return connection
    }
}
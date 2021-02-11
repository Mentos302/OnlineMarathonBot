module.exports = {
    startmsg() {
        console.log(`Bot has been started...`)
    },
    TOKEN: `1172794219:AAH6OjXfr0Wgo03Zz-5QJjt34TYtyF2WGCo`,
    sqlConnect() {
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
                console.log("MySQL is connected!");
            }
        });
        return connection
    }
}
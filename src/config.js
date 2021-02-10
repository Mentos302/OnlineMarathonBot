module.exports = {
    startmsg() {
        console.log(`Bot has been started...`)
    },
    TOKEN: ``,
    sqlConnect() {
        const mysql = require("mysql2");
        const connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            database: "datingbot",
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
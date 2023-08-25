const { Client } = require("pg");
const db = new Client(process.env.DB_URL);
db.connect().then(console.log("Connecté à la DB !"));

module.exports = db;

const { Client } = require("pg");
const db = new Client("postgresql://etudiant:js4life@pg.oclock.lan/trombi");
db.connect().then(console.log("Connecté à la DB !"));

module.exports = db;

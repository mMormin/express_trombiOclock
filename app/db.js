const { Client } = require("pg");
const client = new Client("postgresql://etudiant:js4life@pg.oclock.lan/trombi");
client.connect().then(console.log("Connecté à la DB !")).catch((err) => console.log(err));

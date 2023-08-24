// destructuring
const { Router } = require('express')
const { Client } = require('pg')

// sans destructuring, on importe tout le module pg
// const pg = require('pg')
// const client = new pg.Client('postgresql://etudiant:js4life@pg.oclock.lan/trombi')


const client = new Client('postgresql://etudiant:js4life@pg.oclock.lan/trombi')

client.connect().then(console.log("Connecté à la DB !")).catch((err) => console.log(err))

// callback

const query = "SELECT * FROM student LIMIT 5;"

client.query(query, (error, result) => {
    if (error) {
        console.log(error);
    }
    if (result) {
        console.log(result);
    }
    client.end()
})


require("dotenv").config();

const express = require("express");

const router = require("./app/router");

const app = express();

const port = process.env.PORT;

app.set("view engine", "ejs");
app.set("views", "./app/views");

app.use(express.static("./public"));
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(port, () => {
  console.log("📡 Listening on http://localhost:" + port);
});

//const promos = require("../docs/data/promos.json");

const db = require("../db.js");

const promoController = {
  homePage: (req, res) => {
    res.render("index");
  },
  promosListPage: (req, res, next) => {
    const query = "SELECT * FROM promo ORDER BY name ASC;"
    db.query(query)
      .then((result) => {
        const promos = result.rows;
        res.render("promosList", { promos });
      })
      .catch((error) => {
        res.locals.error = { code: 404, message: error };
        next();
      });
  },
  promoPage: (req, res, next) => {
    const { id } = req.params;

    const query = {
      text: "SELECT * FROM promo WHERE id = $1",
      values: [id],
    };

    db.query(query)
      .then((result) => {
        const promo = result.rows[0];
        res.render("promo", { promo });
      })
      .catch((error) => {
        res.locals.error = { code: 404, message: error };
        next();
      });
  },
};

module.exports = promoController;

//const promos = require("../docs/data/promos.json");

require("../db.js");

const promos = "SELECT * FROM promo;";

const promoController = {
  homePage: (res) => {
    res.render("index");
  },
  promosListPage: (res) => {
    client
      .query(promos)
      .then((data) => {
        res.render("promosList", { promos: data });
        client.end();
      })
      .catch((error) => {
        console.log(error);
      });
  },
  promoPage: (req, res, next) => {
    client
      .query(promos)
      .then((data) => {
        const { id } = req.params;
        const promo = data.find((promo) => promo.id === Number(id));

        if (!promo) {
          res.locals.error = {
            code: 404,
            message: "Aucune promo correspondante !",
          };
          return next();
        }
        
        res.render("promo", { promo });
        client.end();
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

module.exports = promoController;

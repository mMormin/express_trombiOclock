const db = require("../db.js");

const promoController = {
  homePage: (res) => {
    res.render("index");
  },

  promosListPage: async (res, next) => {
    const query = "SELECT * FROM promo ORDER BY name ASC;";

    try {
      const promos = await db.query(query).rows;

      res.render("promosList", { promos });
    } catch (error) {
      res.locals.error = { code: 404, message: error };

      return next();
    }
  },

  promoPage: async (req, res, next) => {
    const { id } = req.params;

    const query = {
      text: "SELECT * FROM promo WHERE id = $1",
      values: [id],
    };

    try {
      const promo = await db.query(query).rows[0];

      res.render("promo", { promo });
    } catch (error) {
      res.locals.error = { code: 404, message: error };

      return next();
    }
  },
};

module.exports = promoController;

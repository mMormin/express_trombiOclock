const promos = require("../docs/data/promos.json");

const promoController = {
  homePage: (req, res) => {
    res.render("index");
  },
  promosListPage: (req, res) => {
    res.render("promosList", { promos });
  },
  promoPage: (req, res, next) => {
    const { id } = req.params;
    const promo = promos.find((promo) => promo.id === Number(id));

    if (!promo) {
      res.locals.error = {
        code: 404,
        message: "Aucune promo correspondante !",
      };
      return next();
    }

    return res.render("promo", { promo });
  },
};

module.exports = promoController;

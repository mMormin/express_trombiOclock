const dataMapper = require("./dataMapper.js");

const promoController = {
  homePage: (req, res) => {
    res.render("index");
  },

  promosListPage: async (req, res, next) => {
    try {
      const promos = await dataMapper.getAllPromos();

      res.render("promosList", { promos });
    } catch (error) {
      res.locals.error = { code: 404, message: error };

      return next();
    }
  },

  promoPage: async (req, res, next) => {
    const { id } = req.params;

    try {
      const promo = await dataMapper.getPromoById(id);

      res.render("promo", { promo });
    } catch (error) {
      res.locals.error = { code: 404, message: error };

      return next();
    }
  },
};

module.exports = promoController;

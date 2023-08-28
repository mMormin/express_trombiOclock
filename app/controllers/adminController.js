const dataMapper = require("./dataMapper.js");

const adminController = {
  addStudentPage: async (req, res, next) => {
    try {
      const promos = await dataMapper.getAllPromos();

      res.render("./admin/studentAdd", { promos });
    } catch (error) {
      res.locals.error = { code: 404, message: error };

      return next();
    }
  },

  addStudent: async (req, res, next) => {
    const data = req.body;
    const firstName = data.first_name;
    const lastName = data.last_name;
    const githubUsername = data.github_username;
    const promoId = data.promo;

    const newUserData = [firstName, lastName, githubUsername, promoId];

    try {
      dataMapper.postStudent(newUserData);

      const promo = await dataMapper.getPromoById(promoId);

      res.render("promo", { promo });
    } catch (error) {
      res.locals.error = { code: 404, message: error };

      return next();
    }
  },
};

module.exports = adminController;

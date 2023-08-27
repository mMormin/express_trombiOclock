const db = require("../db.js");

const studentController = {
  studentsByPromoPage: async (req, res, next) => {
    const { id } = req.params;
    const promoId = Number(id);

    const promoIdPromise = studentController.getPromoById(promoId);
    const studentsByPromoPromise = studentController.getPromoById(promoId);
    const promises = [promoIdPromise, studentsByPromoPromise];

    try {
      const results = await Promise.allSettled(promises);

      // Destructuring
      const [{value:promo}, {value: students}] = results;

      // À l'ancienne le couz
      // const promo = results[0].value;
      // const students = results[1].value;

      res.render("students", { promo, students });
    } catch (error) {
      res.locals.error = { code: 404, message: error };

      return next();
    }
  },
  

  getPromoById: async (promoId) => {
    const query = {
      text: "SELECT * FROM promo WHERE id = $1",
      values: [promoId],
    };

    try {
      const result = await db.query(query);

      return result.rows[0];
    } catch (error) {
      console.log(error);
    }
  },

  getStudentsByPromo: async (promoId) => {
    const query = {
      text: "SELECT * FROM student WHERE promo_id = $1 ORDER BY first_name ASC",
      values: [promoId],
    };

    try {
      const result = await db.query(query);

      return result.rows;
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = studentController;

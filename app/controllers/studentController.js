//const promos = require("../../docs/data/promos.json");
//const students = require("../../docs/data/students.json");

const db = require("../db.js");

const studentController = {
  studentsByPromoPage: (req, res, next) => {
    const { id } = req.params;
    const promoId = Number(id);
    const promo = studentController.getPromoById(promoId);

    if (!promo) {
      res.locals.error = {
        code: 404,
        message: "Aucune promo correspondante !",
      };
      return next();
    }

    const studentList = studentController.getStudentsByPromo(promoId);

    if (!studentList.length) {
      res.locals.error = {
        code: 404,
        message: "Aucune promo correspondante !",
      };
      return next();
    }

    return res.render("students", { students: studentList, promo });
  },

  getPromoById: (promoId) => {
    const query = {
      text: "SELECT * FROM promo WHERE id = $1",
      values: [promoId],
    };

    db.query(query)
      .then((result) => {
        const promo = result.rows[0]
        return promo;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  getStudentsByPromo: (promoId) => {
    const query = {
      text: "SELECT * FROM student WHERE promo = $1 ORDER BY first_name ASC",
      values: [promoId],
    };

    db.query(query)
      .then((result) => {
        const students = result.rows;
        return students;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

module.exports = studentController;

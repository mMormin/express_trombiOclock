//const promos = require("../../docs/data/promos.json");
//const students = require("../../docs/data/students.json");

require("../db.js");

const promos = "SELECT * FROM promo;";
const students = "SELECT * FROM student;";

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

    return res.render("students", { studentList, promo });
  },

  getPromoById: (promoId) => {
    client
      .query(promos)
      .then((data) => {
        const promoData = data.find((promo) => promo.id === promoId);
        return promoData;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  getStudentsByPromo: (promoId) => {
    client
      .query(students)
      .then((data) => {
        const Studentsdata = data.filter(
          (student) => student.promo === promoId
        );
        return Studentsdata;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

module.exports = studentController;

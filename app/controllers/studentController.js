const promos = require("../../docs/data/promos.json");
const students = require("../../docs/data/students.json");

const studentController = {

  studentsByPromoPage: (req, res, next) => {
    const { id } = req.params;
    const promoId = Number(id);
    const promo = studentController.getPromoById(promoId);

  if (!promo) {
            res.locals.error = { code: 404, message: "Aucune promo correspondante !" }
            return next()
        }

    const studentList = studentController.getStudentsByPromo(promoId);

    if (!studentList.length) {
      res.locals.error = { code: 404, message: "Aucune promo correspondante !" }
      return next()
  }

    return res.render("students", { studentList, promo });
  },

  getPromoById: (promoId) => {
    const data = promos.find((promo) => promo.id === promoId);
    return data;
  },

  getStudentsByPromo: (promoId) => {
    const data = students.filter((student) => student.promo === promoId);
    return data;
  },
};

module.exports = studentController;

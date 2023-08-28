const db = require("../db.js");

const dataMapper = require("./dataMapper.js");

const studentController = {
  studentsByPromoPage: async (req, res, next) => {
    const { id } = req.params;
    const promoId = Number(id);

    const getPromoByIdPromise = dataMapper.getPromoById(promoId);
    const getStudentsByPromoPromise = dataMapper.getStudentsByPromo(promoId);
    const promises = [getPromoByIdPromise, getStudentsByPromoPromise];

    try {
      const results = await Promise.allSettled(promises);

      // Destructuring
      const [{ value: promo }, { value: students }] = results;
      // &&|| À l'ancienne le couz
      // const promo = results[0].value;
      // const students = results[1].value;

      res.render("students", { promo, students });
    } catch (error) {
      res.locals.error = { code: 404, message: error };

      return next();
    }
  },
  studentPage: async (req, res, next) => {
    const { id } = req.params;

    const getStudentByIdPromise = dataMapper.getStudentById(id);
    const getPromoByIdPromise = dataMapper.getPromoById(id);
    const promises = [getStudentByIdPromise, getPromoByIdPromise];
    
    try {
      const results = await Promise.allSettled(promises);
      const [{ value: student }, { value: promo }] = results;

      res.render("student", { student, promo });
      
    } catch (error) {
      res.locals.error = { code: 404, message: error };
    }
  },
};

module.exports = studentController;

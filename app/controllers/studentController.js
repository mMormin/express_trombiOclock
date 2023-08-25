//const promos = require("../../docs/data/promos.json");
//const students = require("../../docs/data/students.json");

const db = require("../db.js");

const studentController = {
  studentsByPromoPage: (req, res, next) => {
    const { id } = req.params;
    const promoId = Number(id);
    studentController.getPromoById(promoId).then((promo) => {
      studentController.getStudentsByPromo(promoId).then((students) => {
        res.render("students", { students, promo });
      })

      
    });

    // if (!promo) {
    //   res.locals.error = {
    //     code: 404,
    //     message: "Aucune promo correspondante !",
    //   };
    //   return next();
    // }


    // if (!studentList.length) {
    //   res.locals.error = {
    //     code: 404,
    //     message: "Aucune éléve trouvé !",
    //   };
    //   return next();
    // }
  },

  getPromoById: (promoId) => {
    let promo;

    const query = {
      text: "SELECT * FROM promo WHERE id = $1",
      values: [promoId],
    };

    return db
      .query(query)
      .then((result) => {
        promo = result.rows[0];
        return promo;
      })
      .catch((error) => {
        console.log(error);
      });
  },

  getStudentsByPromo: (promoId) => {
    const query = {
      text: "SELECT * FROM student WHERE promo_id = $1 ORDER BY first_name ASC",
      values: [promoId],
    };

    return db.query(query)
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

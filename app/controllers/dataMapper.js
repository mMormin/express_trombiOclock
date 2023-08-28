const db = require("../db.js");

const dataMapper = {
  getAllPromos: async () => {
    const query = "SELECT * FROM promo ORDER BY name ASC;";

    const result = await db.query(query);

    if (!result.rowCount) {
      throw new Error("Aucun promo trouvée !");
    }

    return result.rows;
  },

  getPromoById: async (id) => {
    const query = {
      text: "SELECT * FROM promo WHERE id = $1",
      values: [id],
    };

    const result = await db.query(query);

    if (!result.rowCount) {
      throw new Error("Aucun promo correspondante !");
    }

    return result.rows[0];
  },

  getStudentsByPromo: async (id) => {
    const query = {
      text: "SELECT * FROM student WHERE promo_id = $1 ORDER BY first_name ASC",
      values: [id],
    };

    const result = await db.query(query);

    if (!result.rowCount) {
      throw new Error("Aucun étudiant correspondant !");
    }

    return result.rows;
  },

  getStudentById: async (id) => {
    const query = {
      text: "SELECT * FROM student WHERE id = $1",
      values: [id],
    };

    const result = await db.query(query);

    if (!result.rowCount) {
      throw new Error("Aucun étudiant correspondant !");
    }

    return result.rows[0];
  },
};

module.exports = dataMapper;

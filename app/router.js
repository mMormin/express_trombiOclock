const express = require("express");
const router = express.Router();

const promoController = require("./controllers/promoController");
const studentController = require("./controllers/studentController");

router.get("/", promoController.homePage);
router.get("/promos", promoController.promosListPage);
router.get("/promo/:name/:id", promoController.promoPage);
router.get("/promo/:name/:id/students", studentController.studentsByPromoPage);
router.get("/promo/:name/:id/students/:id", studentController.studentPage);

router.use("*", (req, res) => {
  res.render("404");
});

module.exports = router;

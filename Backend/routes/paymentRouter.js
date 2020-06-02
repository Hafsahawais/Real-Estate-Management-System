const express = require("express");
const router = express.Router();
const paymentController = require("../controller/payment.controller");

router.get("/", paymentController.PayPage);

module.exports = router;

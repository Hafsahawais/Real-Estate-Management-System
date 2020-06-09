const express = require("express");
const router = express.Router();
const paymentController = require("../controller/payment.controller");

router.post("/", paymentController.oneTimePayment);

module.exports = router;

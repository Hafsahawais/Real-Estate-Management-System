const express = require("express");
const router = express.Router();
const paymentController = require("../controller/payment.controller");

router.post("/", paymentController.makePayment);

module.exports = router;

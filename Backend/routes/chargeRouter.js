const express = require("express");
const router = express.Router();
const chargeController = require("../controller/charge.controller");


router.post("/", chargeController.ChargePayment);

module.exports = router;

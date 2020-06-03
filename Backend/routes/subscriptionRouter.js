const express = require("express");
const router = express.Router();
const subscriptionController = require("../controller/subscription.controller");

router.post("/", subscriptionController.Suscribe);

module.exports = router;

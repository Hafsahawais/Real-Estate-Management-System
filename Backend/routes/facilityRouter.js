const express = require("express");
var router = express.Router();
var facilityController = require("../controller/facility.controller");

router.post("/vehicle/:userId", facilityController.vehicleRegistration);
router.post("/ground", facilityController.groundReservation);

module.exports = router;

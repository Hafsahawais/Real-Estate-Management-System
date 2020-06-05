const express = require("express");
var router = express.Router();
var facilityController = require("../controller/facility.controller");

router.post("/vehicle/:userId", facilityController.vehicleRegisteration);
router.post("/ground", facilityController.groundReservation);

module.exports = router;

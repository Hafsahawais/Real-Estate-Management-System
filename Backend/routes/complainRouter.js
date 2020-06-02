const express = require("express");
var router = express.Router();
var complainController = require("../controller/complain.controller");

router.get("/", complainController.AllComplainList);
router.post("/new", complainController.AddComplain);
router.get("/:complainId", complainController.findOneComplain);
router.delete("/:complainId", complainController.deleteComplain);
router.patch("/:complainId", complainController.updateComplain);

module.exports = router;

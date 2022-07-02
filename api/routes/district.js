const express = require("express");
const { validation } = require("../configs/helper");
const router = express.Router();
const districtController = require("../controllers/district");

router.post("/id", [validation.verifyToken], districtController.getById);
router.post("/kota", [validation.verifyToken], districtController.getByCityId);

module.exports = router;

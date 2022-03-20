const allstations = require("../controllers/allstations.controller");

const express = require("express");
const router = express.Router();

router.post("/GetAll", allstations.sendData);
router.get("/GetAll", allstations.getData)

module.exports = router;
const allstations = require("../controllers/allstations.controller");

const express = require("express");
const router = express.Router();

router.post("/AddStation", allstations.addStation);
router.get("/GetAll", allstations.getData);
module.exports = router;
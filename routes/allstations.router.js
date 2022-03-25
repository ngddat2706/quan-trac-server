const allStations = require("../controllers/allstations.controller");

const express = require("express");
const router = express.Router();

router.post("/AddStation", allStations.addStation);
router.get("/GetAll", allStations.getAllStation);
router.post('/updateStation',allStations.updateStation);
module.exports = router;
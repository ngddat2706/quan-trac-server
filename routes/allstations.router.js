const allstations = require("../controllers/allstations.controller");

const express = require("express");
const router = express.Router();

router.get("/GetAll", (req, res)=>{
    res.send("All Station Data");
});

module.exports = router;
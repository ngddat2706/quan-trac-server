const allstations = require("../controllers/allstations.controller");

const express = require("express");
const router = express.Router();

router.get("/GetAll?withValue=True", (req, res)=>{
    res.send("All station Data");
});

module.exports = router;
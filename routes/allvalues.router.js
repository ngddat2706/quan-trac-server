const allvalues = require("../controllers/allvalues.controller");

const express = require("express");
const router = express.Router();

router.get("/GetAll", (req, res)=>{
    res.send("All Values Data");
});

module.exports = router;
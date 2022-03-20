const allvalues = require("../controllers/allvalues.controller");

const express = require("express");
const router = express.Router();

router.get("/GetAll/:stationId?/:pageNum?/:pageSize?/:interval?/:startTime?/:endTime?", (req, res)=>{
    res.status(200).send({
        stationId: req.params.stationId,
        pageNum: req.params.pageNum,
        pageSize: req.params.pageSize,
        interval: req.params.interval,
        startTime: req.params.startTime,
        endTime: req.params.endTime,
    });
});

module.exports = router;
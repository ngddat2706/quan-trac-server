const allvalues = require("../controllers/allvalues.controller");
const auth = require('../middlewares/auth')

const express = require("express");
const router = express.Router();

router.post("/AddValue", allvalues.addValue);
router.get("/GetAll", allvalues.getValue);

//Test take value use Authentication
router.get("/GetAll/Test", auth.authenticateToken, (req, res)=>{
    res.status(200).send({
        stationId: req.query.stationId,
        pageNum: req.query.pageNum,
        pageSize: req.query.pageSize,
        interval: req.query.interval,
        startTime: req.query.startTime,
        endTime: req.query.endTime,
    });
});

module.exports = router;
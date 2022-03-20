const notification = require("../controllers/notification.controller");

const express = require("express");
const router = express.Router();

router.post("/Test", notification.fcm);

module.exports = router;
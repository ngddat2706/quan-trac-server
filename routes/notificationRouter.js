const notification = require("../controllers/notificationController.js");

const express = require("express");
const router = express.Router();

router.post("/Test", notification.fcm);

module.exports = router;
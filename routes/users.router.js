const usersController = require("../controllers/users.controller");

const express = require("express");
const router = express.Router();

router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.get("/user-profile", usersController.userProfile);

module.exports = router;
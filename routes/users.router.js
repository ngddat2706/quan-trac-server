const usersController = require("../controllers/users.controller");
const auth = require('../middlewares/auth')
const express = require("express");
const router = express.Router();

router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.get("/user-profile",auth.authenticateToken, usersController.userProfile);

module.exports = router;
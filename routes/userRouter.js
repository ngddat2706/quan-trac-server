const usersController = require("../controllers/userController.js");
const auth = require('../middlewares/auth.js')
const express = require("express");
const router = express.Router();

router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.get("/user-profile",auth.authenticateToken, usersController.userProfile);

module.exports = router;
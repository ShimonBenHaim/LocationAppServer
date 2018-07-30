const express = require("express");

// Use the controller for clean code
const UserController = require("../constrollers/user");

const router = express.Router();

router.post("/signup",
 UserController.createUser);

router.post("/login",
 UserController.userLogin);

module.exports = router;

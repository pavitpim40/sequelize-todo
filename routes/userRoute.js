const express = require("express");
const userController = require("../controllers/userController");
const AuthenWithpassportJWT = require("../middlewares/passportJwt");
const router = express.Router();


router.post("/register", userController.register);
router.patch("/update",AuthenWithpassportJWT, userController.updateUser);
router.post("/login", userController.login);
module.exports = router;

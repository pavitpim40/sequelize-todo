const express = require("express");
const userController = require("../controllers/userController");
const UserMiddleware = require("../middlewares/userAuthorize");
const router = express.Router();

router.post("/register", userController.register);
router.patch("/update",UserMiddleware.getUserByToken, userController.updateUser);
router.post("/login", userController.login);
module.exports = router;

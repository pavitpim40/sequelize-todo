const express = require("express");
const UserMiddleware = require("../middlewares/user");
const todoController = require("../controllers/todoController");
const router = express.Router();

router.post("/",UserMiddleware.findUser, todoController.createTodo);
router.patch("/",UserMiddleware.findUser, todoController.updateTodo);
router.delete("/:id",UserMiddleware.findUser, todoController.deleteTodo);
router.get("/",UserMiddleware.findUser, todoController.getAllTodo);
router.get("/:id",UserMiddleware.findUser, todoController.getTodoById);
module.exports = router;

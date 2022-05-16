const { Todo, User } = require("../models");
const createError = require("../utils/createError");
// ## CREATE TODO
exports.createTodo = async (req, res, next) => {
  try {
    const { userId, title, completed, dueDate } = req.body;
    const todo = await Todo.create({ title, completed, dueDate, userId });
    res.status(201).json({todo,message: "todo created successfully"});
  } catch (error) {
    next(error);
  }
};

// ## UPDATE TODO
exports.updateTodo = async (req, res, next) => {
  try {
    const { userId, todoId, title, completed, dueDate } = req.body;
    const todo = await Todo.findOne({ where: { id: todoId, userId: userId } });
    if (!todo) {
      createError("todo not found", 404);
    }
   const result = await Todo.update(
      { title, completed, dueDate },
      { where: { id: todoId, userId: userId } }
    );
    if (result[0] === 0) {
      createError("Todo with this id is not found", 400);
    }
    res.status(201).json({
      message: "todo updated successfully",
      updatedTodo: { ...todo.dataValues, title, completed, dueDate },
    });
  } catch (error) {
    next(error);
  }
};

// ## DELETE TODO
exports.deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body; //destructure
    const result = await Todo.destroy({ where: { id: id, userId: userId } }); //เอามา row เดียว
    if (result === 0) {
      createError("todo is not found", 400);
    }
    res.status(204).json({ message: "todo deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// ## GET ALL TODO
exports.getAllTodo = async (req, res, next) => {
  try {
    const { userId } = req.body;
    console.log(userId);
    const todos = await Todo.findAll({ where: { userId: userId } });
    if (todos.length === 0) {
      createError("todo not found", 404);
    }

    res.status(200).json(todos);
  } catch (error) {
    next(error);
  }
};

// ## GET TODO BY ID
exports.getTodoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const todo = await Todo.findOne({
      where: { id, userId: userId },
      attribute: ["id", "title", "completed", "dueDate"],
    });
    if (!todo) {
      createError("todo not found", 404);
    }
    res.status(200).json(todo);
  } catch (error) {
    next(error);
  }
};

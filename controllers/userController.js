const createError = require("../utils/createError");
const { User } = require("../models");
exports.register = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword, birthDate } = req.body;
    if (password !== confirmPassword) {
      // # Method 1
      //   return res.status(400).json({ message: "passwords do not match" });

      // # Method 2
      createError("passwords do not match", 400);
    }
    const user = await User.create({ username, email, password, birthDate });
    res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, oldPassword, newPassword, confirmNewPassword, birthDate } =
      req.body;
    console.log(newPassword, confirmNewPassword);
    const user = await User.findOne({ where: { id } });

    if (!user) {
      createError("user not found", 404);
    }

    if (oldPassword !== user.password) {
      createError("old password is not correct", 400);
    }

    if (newPassword !== confirmNewPassword) {
      createError("new passwords do not match", 400);
    }
    const result = await User.update(
      { email, password: newPassword, birthDate },
      { where: { id: user.id } }
    );
    res.status(200).json({ message: "user updated successfully", result });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

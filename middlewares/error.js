module.exports = (err, req, res, next) => {
  console.log(err);
  if (err.name === "SequelizeValidationError") {
    err.statusCode = 400;
  }
  res.status(err.statusCode || 500).json({
    message: err.message,
  });
};

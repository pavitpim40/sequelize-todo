const jwt = require("jsonwebtoken");
const { User } = require("../models/");
const createError = require("../utils/createError");

exports.getUserByToken = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith("Bearer")) {
      createError("you are unauthorized", 401);
    }
    const [, token] = authorization.split(" ");
    if (!token) {
      createError("you are unauthorized", 401);
    }
    const SECRET_KEY = process.env.JWT_SECRET_KEY || "1QAZ2WSX3EDC";
    const decoded = jwt.verify(token, SECRET_KEY);
  
    const user = await User.findOne({ where: { id: decoded.id } });
    if (!user) {
      createError("you are unauthorized", 401);
    }
    console.log(decoded.iat*1000, new Date(user.lastUpdatedPassword).getTime())
    if(decoded.iat*1000 < new Date(user.lastUpdatedPassword).getTime()){
      createError("token is outdate", 401);
    }
    
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
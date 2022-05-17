const {Strategy:JwtStrategy,ExtractJwt} = require ('passport-jwt');
const passport = require('passport');
const {User} = require('../models');
const option = {
    secretOrKey: process.env.JWT_SECRET_KEY || "1QAZ2WSX3EDC",
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}
/*
## passport.use(option,callback) ## จะทำ code พวกนี้ให้
## เมื่อตรวจสอบเสร็จจะไปเรียกใช้ callback (done function)

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
*/

passport.use(new JwtStrategy(option,async(payload,done)=>{

    try {

    // เขียนเหมือนการทำงานของ UserAuthorize แต่่่ไม่ต้อง decode เอง
    const user = await User.findOne({ where: { id: payload.id } });
    if (!user) {
    //   createError("you are unauthorized", 401);
        done(new Error('user not found'),false);
    }
    console.log(decoded.iat*1000, new Date(user.lastUpdatedPassword).getTime())
    if(decoded.iat*1000 < new Date(user.lastUpdatedPassword).getTime()){
        done(new Error('you are unauthorized'),false);
    }
    // ส่ง user เข้าไปใน req เพื่อให้ middleware ตัวถัดไปทำงาน
    done(null,user) // req.user = user
        
    } catch (error) {
        done(error,false);
    }
   
}))
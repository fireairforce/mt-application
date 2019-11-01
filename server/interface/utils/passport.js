import passport from "koa-passport";
import LocalStrategy from "passport-local";
import UserModel from "../../dbs/models/users";
import mongoose from "mongoose";
const User = mongoose.model('UserModel');
// 使用passport这个中间价来处理一下登录这边的逻辑
passport.use(
  new LocalStrategy(async function(username, password, done) {
    let where = {
      username,
    };
    let result = await User.findOne(where);
    if (result) {
      //　使用数据库里面查询到的密码和输入的密码来做一个对比保证登录信息校验
      // 如果数据库里面有这条信息
      if (result.password === password) {
        return done(null, result);
      } else {
        return done(null, false, "密码错误");
      }
    } else {
      return done(null, false, "用户不存在");
    }
  }),
);

// 让用户每次登录进来的时候都通过session去进行一个自动化的验证(序列化)
passport.serializeUser(function(user, done) {
  done(null, user);
});

// 反序列化
passport.deserializeUser(function(user, done) {
  return done(null, user);
});

export default passport;

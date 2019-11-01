import Router from "koa-router";
import Redis from "koa-redis";
import nodeMailer from "nodemailer";
import UserModel from "../dbs/models/users";
import Passport from "./utils/passport";
import Email from "../dbs/config";
import axiso from "./utils/axios";
import mongoose from "mongoose";

let router = new Router({
  prefix: "/users",
});

let Store = new Redis().client;
const User = mongoose.model("UserModel");

router.post("/signup", async (ctx) => {
  // 这里要使用koa-bodyparser这个中间件去取值(把post的值映射到ctx.request.body上面去了)
  const { username, password, email, code } = ctx.request.body;
  if (code) {
    const saveCode = await Store.hget(`nodemail: ${username}`, "code");
    const saveExpire = await Store.hget(`nodemail: ${username}`, "expire");
    if (code === saveCode) {
      // 检查验证码是否过期
      if (new Date().getTime() > saveExpire) {
        ctx.body = {
          code: -1,
          msg: "验证码已过期，请重新尝试",
        };
        return false;
      }
    } else {
      ctx.body = {
        code: -1,
        msg: "请填写正确的验证码",
      };
    }
  } else {
    ctx.body = {
      code: -1,
      msg: "请填写验证码",
    };
  }
  let user = await User.find({
    username,
  });
  // 如果数据库里面已经存在这个用户了
  if (user.length) {
    ctx.body = {
      code: -1,
      msg: "该用户名已被注册了",
    };
    return;
  }
  // 如果数据库里面没有这个用户，那就相当于去注册一个了
  let nuser = await User.create({
    username,
    password,
    email,
  });
  if (nuser) {
    let res = axios.post(`users/signup`, {
      username,
      password,
    });
    if (res.data && res.data.code === 0) {
      ctx.body = {
        code: 0,
        msg: "注册成功",
      };
    } else {
      ctx.body = {
        code: -1,
        msg: "error",
      };
    }
  }
  // 如果往库里写入数据发生了异常
  else {
    ctx.body = {
      code: -1,
      msg: "注册失败",
    };
  }
});

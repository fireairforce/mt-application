import Router from "koa-router";
import Redis from "koa-redis";
import nodeMailer from "nodemailer";
import User from '../dbs/models/users';
import Passport from "./utils/passport";
import Email from "../dbs/config";
import axios from "./utils/axios";

let router = new Router({
  prefix: "/users",
});

let Store = new Redis().client;

// 这个是注册的接口
router.post("/signup", async (ctx) => {
  // 这里要使用koa-bodyparser这个中间件去取值(把post的值映射到ctx.request.body上面去了)
  const { username, password, email, code } = ctx.request.body;
  if (code) {
    const saveCode = await Store.hget(`nodemail:${username}`, "code");
    // console.log('saveCode: ', saveCode);
    const saveExpire = await Store.hget(`nodemail:${username}`, "expire");
    // console.log('saveExpire: ', saveExpire);
    if (code === saveCode) {
      // 检查验证码是否过期
      if (new Date().getTime() - saveExpire > 0) {
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
      return ;
    }
  } else {
    ctx.body = {
      code: -1,
      msg: "请填写验证码",
    };
    return ;
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
    //   这里利用登录接口来完成注册功能
    let res = await axios.post(`users/signin`, {
      username,
      password,
    });
    if (res.data && res.data.code === 0) {
      ctx.body = {
        code: 0,
        msg: "注册成功",
      };
      return;
    } else {
      ctx.body = {
        code: -1,
        msg: "error",
      };
      return;
    }
  }
  // 如果往库里写入数据发生了异常
  else {
    ctx.body = {
      code: -1,
      msg: "注册失败",
    };
    return;
  }
});

// 登陆接口
router.post(`/signin`, async (ctx, next) => {
  // 这里就做一个验证就行了,使用在passport里面写的local策略即可
  return Passport.authenticate('local', function(err, user, info, status) {
    if (err) {
      ctx.body = {
        code: -1,
        msg: err,
      };
    } else {
      if (user) {
        ctx.body = {
          code: 0,
          msg: "登录成功",
          user,
        };
        return ctx.login(user);
      } else {
        ctx.body = {
          code: 1,
          msg: info,
        };
      }
    }
  })(ctx,next);
});

// 验证码验证部分
router.post(`/verity`, async (ctx, next) => {
  let { username } = ctx.request.body;
  const saveExpire = await Store.hget(`nodemail:${username}`, "expire");
  // console.log('saveExpire: ', saveExpire);
  // console.log('new Date().getTime(): ', new Date().getTime());
  if (saveExpire && new Date().getTime() - saveExpire < 0) {
    ctx.body = {
      code: -1,
      msg: "验证请求过于频繁,1分钟发送一次",
    };
    return false;
  }
  let transporter = nodeMailer.createTransport({
    host: Email.smtp.host,
    post: 587,
    secure: false,
    auth: {
      user: Email.smtp.user,
      pass: Email.smtp.pass,
    },
  });
  let ko = {
    code: Email.smtp.code(),
    expire: Email.smtp.expire(),
    email: ctx.request.body.email,
    user: ctx.request.body.username,
  };
  let mailOptions = {
    from: `"认证邮件" <${Email.smtp.user}>`,
    to: ko.email,
    subject: "美团网注册码",
    html: `您的邀请码是 ${ko.code}`,
  };
  await transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return console.log(err);
    } else {
      //   把数组在redis里面做一次存储
      Store.hmset(
        `nodemail:${ko.user}`,
        "code",
        ko.code,
        "expire",
        ko.expire,
        "email",
        ko.email,
      );
    }
  });
  // let qq = await Store.hget(`nodemail:${username}`, "expire");
  // console.log(qq);
  ctx.body = {
    code: 0,
    msg: "验证码已发送，可能会有延时，有效期为1min",
  };
});

router.get(`/exit`, async (ctx, next) => {
  await ctx.logout();
  if (!ctx.isAuthenticated()) {
    ctx.body = {
      code: 0,
    };
  } else {
    ctx.body = {
      code: -1,
    };
  }
});

router.get(`/getUser`, async (ctx) => {
  // 这里会先验证一下(这个api值ctx自带的一个api)
  if (ctx.isAuthenticated()) {
    const { username, email } = ctx.session.passport.user;
    ctx.body = {
      user: username,
      email,
    };
  } else {
    ctx.body = {
      user: "",
      email: "",
    };
  }
});

export default router;

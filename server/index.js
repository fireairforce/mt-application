import Koa from "koa";
import consola from "consola";
import { Nuxt, Builder } from "nuxt";

import mongoose from "mongoose";
import bodyParser from "koa-bodyparser";
import session from "koa-generic-session";
import Redis from "koa-redis";
import json from "koa-json";
import dbConfig from "./dbs/config";
import passport from "./interface/utils/passport";
import users from "./interface/users";
import { initSchemas } from "./dbs/init";

const app = new Koa();

// Import and Set Nuxt.js options
const config = require("../nuxt.config.js");
config.dev = app.env !== "production";

app.keys = ['mt','keyskeys'];
app.proxy = true;
// 使用session这个中间件来配置一下存储
app.use(session({
  key:'mt',
  prefix:'mt:uid',
  store: new Redis()
}))

app.use(bodyParser({
  // 支持的拓展类型
  extendTypes:['json','form','text']
}))
app.use(json());

// 连接上数据库
mongoose.connect(dbConfig.dbs,{
  useNewUrlParser: true
})

app.use(passport.initialize());
app.use(passport.session());

async function start() {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config);

  const {
    host = process.env.HOST || "127.0.0.1",
    port = process.env.PORT || 3000,
  } = nuxt.options.server;

  // 初始化数据库模型
  initSchemas(); 
  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  //  获取到所有的路由表(使用koa-router这个中间价完成起来)
  app.use(users.routes()).use(users.allowedMethods());
  app.use((ctx) => {
    ctx.status = 200;
    ctx.respond = false; // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx; // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res);
  });
  app.listen(port, host);
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true,
  });
}

start();

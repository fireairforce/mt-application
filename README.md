## Notes

使用的是`create-nuxt-app`来对项目进行了一个创建。

```bash
npx create-nuxt-app mt-app
```

注意最好不要打开`prettier`这个配置，我觉得好傻逼哦....

安装完成之后重新安装一次依赖然后再进行编译:`npm install --update-libary`

注意`server`文件夹下面的文件刚开始是没有支持`es6`的。

我们修改一下`npm run dev`和`npm start`的启动脚本:

```json
"scripts": {
    "dev": "cross-env NODE_ENV=development nodemon server/index.js --watch server --exec babel-node",
    "build": "nuxt build",
    "start": "cross-env NODE_ENV=production node server/index.js  --exec babel-node",
    "generate": "nuxt generate",
    "lint": "eslint --ext .js,.vue --ignore-path .gitignore ."
},
```

同时把`babel`配置和处理一下:

```
npm install babel-cli babel-preset-es2015
```

新建一个`.babelrc`:

```json
{
  "presets": ["es2015"]
}
```

然后`server`目录下就可以使用`es6`的语法了。

在`nuxt.config.js`里面可以去添加一些配置:

```js
css: [
    'element-ui/lib/theme-chalk/index.css',
    'element-ui/lib/theme-chalk/reset.css',
    '~assets/css/main.css'
  ],
```

`mongodb`数据库的导入命令:

```bash
mongoimport -d dbs -c test pois.dat
# dbs是数据库名称  test 是数据结合collections的名称  pois.dat是数据源
```

有个配置修复栈溢出的脚本来自于[blog](https://blog.csdn.net/weixin_45115705/article/details/98784259)

## Usage

其实这框架用起来和`umi`差不多。里面`layouts`里面能够写一些模板，不过如果你想使用自定义的一些模板，需要在`pages`文件里面的`vue`文件里面去进行一个单独的配置(`xxx`就是`layouts`文件夹下面的文件名):

```js
export default {
  layout: "xxx",
};
```

关于`element-ui`的表单验证算得上是一个比较复杂的功能了。在`pages/register`这个页面里面有个还行的示例`demo`吧，可以参考一波。

## Service Api

后端接口服务使用`koa`框架完成，结合了一系列`koa`中间件。
数据存储采用`mongodb`数据库，缓存利用了`redis`服务器。

|            接口             |      说明      |
| :-------------------------: | :------------: |
|       `/users/signup`       |      注册      |
|       `/users/verify`       |     验证码     |
|       `/users/sigin`        |      登录      |
|        `/users/exit`        |      退出      |
|      `/users/getUser`       |  获取用户信息  |
|     `/geo/getPosition`      | 根据 IP 查地址 |
|       `/geo/province`       |    获取省份    |
|     `/geo/province/:id`     |    获取省份    |
|         `/geo/city`         |    获取城市    |
|       `/geo/hotCity`        |  获取热门城市  |
|         `/geo/menu`         |  获取美食菜单  |
|        `/search/top`        |                |
| `/search/resultsByKeywords` |                |
|     `/search/hotPlace`      |                |
|    `/search/product/:id`    |                |

## Run

```bash
# 本地环境
npm run dev
# 打包
npm run build
```

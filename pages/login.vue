<template>
  <div class="page-login">
    <div class="login-header">
      <a href="/" class="logo"></a>
    </div>
    <div class="login-panel">
      <div class="banner">
        <img
          src="http://s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg"
          alt="美团网"
          width="480"
          height="370"
        />
      </div>
      <div class="form">
        <h4 v-if="error" class="tips"><i /> {{ error }}</h4>
        <p><span>账号登录</span></p>
        <el-input v-model="username" prefix-icon="profile"></el-input>
        <el-input
          v-model="password"
          prefix-icon="password"
          type="password"
        ></el-input>
        <div class="foot">
          <el-checkbox v-model="checked">7天之内自动登录</el-checkbox>
          <b>忘记密码？</b>
        </div>
        <el-button class="btn-login" type="success" size="mini" @click="login">
          登录
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import CryptoJS from "crypto-js";
export default {
  layout: "blank",
  data: () => {
    return {
      error: "",
      username: "",
      password: "",
      checked: "",
    };
  },
  methods: {
    login() {
      let self = this;
      // self.$axios(`/geo/getPosition`).then(res=>{
      //   console.log(res);
      // })
      self.$axios
        .post(`/users/signin`, {
          //   这里要解码一下，不然服务端收到乱码
          username: window.encodeURI(self.username),
          password: CryptoJS.MD5(self.password).toString(),
        })
        .then(({ status, data }) => {
          if (status === 200) {
            if (data && data.code === 0) {
              location.href = "/";
            } else {
              self.error = data.msg;
            }
          } else {
            self.error = `服务器出错`;
          }
          //   加个定时器，定时清空error信息
          setTimeout(function() {
            self.error = "";
          }, 1500);
        });
    },
  },
};
</script>
<style lang="scss">
@import "@/assets/css/login/index.scss";
</style>

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
              >
          </div>
          <div class="form">
              <h4 v-if="error" class="tips">
                  <i /> {{ error }}
              </h4>
              <p><span>账号登录</span></p>
              <el-input v-model="username" prefix-icon="profile"></el-input>
              <el-input v-model="password" prefix-icon="password" type="password"></el-input>
              <div class="foot">
                  <el-checkbox v-model="checked">7天之内自动登录</el-checkbox>
                  <b>忘记密码？</b>
              </div>
              <el-button
                class="btn-login"
                type="success"
                size="mini"
                @click="login"
              >
                登录
              </el-button>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  layout: 'blank',
  data: () => {
      return {
          error:'',
          username:'',
          password:'',
          checked: ''
      }
  },
  methods:{
      login(){
          console.log(`test login`);
      }
  }
}
</script>
<style lang="scss">
    @import "@/assets/css/login/index.scss";
</style>
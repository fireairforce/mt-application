<template>
  <div class="page-register">
    <article class="header">
      <header>
        <a href="/" class="site-logo"></a>
        <span class="login">
          <em class="bold">已有美团账号</em>
          <a href="/login">
            <el-button type="primary" size="small">登录</el-button>
          </a>
        </span>
      </header>
    </article>
    <section>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="昵称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
          <el-button size="mini" round @click="sendMsg">发送验证码</el-button>
          <span class="status">{{ statusMsg }}</span>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input v-model="ruleForm.code" maxlength="4"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input v-model="ruleForm.pwd" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="cpwd">
          <el-input v-model="ruleForm.cpwd" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register">同意以下协议并注册</el-button>
          <div class="error">{{error}}</div>
        </el-form-item>
        <el-form-item>
          <a href="http://www.meituan.com/about/terms" class="f1" target="_blank">《美团网用户协议》</a>
        </el-form-item>
      </el-form>
    </section>
  </div>
</template>

<script>
import CryptoJS from "crypto-js";
export default {
  data() {
    return {
      statusMsg: "",
      error: "",
      ruleForm: {
        name: "",
        code: "",
        pwd: "",
        cpwd: "",
        email: ""
      },
      rules: {
        name: [
          {
            required: true,
            type: "string",
            message: "请输入昵称",
            //   在失去焦点的时候触发规则
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            type: "email",
            message: "请输入邮箱",
            trigger: "blur"
          }
        ],
        pwd: [
          {
            required: true,
            message: "请输入密码",
            //   在失去焦点的时候触发规则
            trigger: "blur"
          }
        ],
        cpwd: [
          {
            required: true,
            message: "确认密码",
            trigger: "blur"
          },
          {
            //   第二个参数是一个自定义的表单校验规则
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error(`请再次输入密码`));
              } else if (value !== this.ruleForm.pwd) {
                callback(new Error(`两次输入密码不同`));
              } else {
                callback();
              }
            }
          }
        ]
      }
    };
  },
  layout: "blank",
  methods: {
    // 发送验证码
    sendMsg() {
      const self = this;
      let namePass, emailPass;
      if (self.timerid) {
        return false;
      }
      //  首先校验一下姓名
      this.$refs["ruleForm"].validateField("name", valid => {
        namePass = valid;
      });
      self.statusMsg = "";
      if (namePass) {
        return false;
      }
      this.$refs["ruleForm"].validateField("email", valid => {
        emailPass = valid;
      });
      if (!namePass && !emailPass) {
        self.$axios
          .post(`/users/verity`, {
            //  通过数据的双向绑定往data里面取值
            username: encodeURIComponent(self.ruleForm.name),
            email: self.ruleForm.email
          })
          .then(({ status, data }) => {
            if (status === 200 && data && data.code === 0) {
              // 验证码的倒计时
              let count = 60;
              self.statusMsg = `验证码已发送,剩余${count--}秒`;
              self.timerid = setInterval(function() {
                self.statusMsg = `验证码已发送,剩余${count--}秒`;
                if (count === 0) {
                  // 如果时间到了，就将定时器清空
                  clearInterval(self.timerid);
                }
              }, 1000);
            } else {
              self.statusMsg = data.msg;
            }
          });
      }
    },
    register() {
      let self = this;
      //  验证所有的校验规则是否通过了
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          self.$axios
            .post(`/users/signup`, {
              username: window.encodeURIComponent(self.ruleForm.name),
              //  这里对密码的存储进行一个加密,记得MD5大写，后面要加上toString()
              password: CryptoJS.MD5(self.ruleForm.pwd).toString(),
              email: self.ruleForm.email,
              code: self.ruleForm.code
            })
            .then(({ status, data }) => {
              if (status === 200) {
                if (data && data.code === 0) {
                  //  注册完成之后直接跳转到登录界面
                  location.href = "/login";
                } else {
                  self.error = data.msg;
                }
              } else {
                self.error = `服务器出错，错误码:${status}`;
              }
              setTimeout(function() {
                self.error = "";
              }, 1500);
            });
        }
      });
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/css/register/index.scss";
</style>
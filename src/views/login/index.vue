<template>
  <div class="login-container">
      <div class="logo">
        <img src="../../assets/logo.png" alt="智能交通视频检测系统">
      </div>
      <div class="login-box">
        <div class="fl">
          <h1>欢迎使用<strong>智能交通视频检测系统</strong></h1>
        </div>
        <el-form class="login-form fr" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
          <div class="title-container">
            <h3 class="title">登录</h3>
          </div>
          <el-form-item prop="username">
            <span class="svg-container svg-container_login">
              <i class="iconfont icon-people"></i>
            </span>
            <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="请输入用户名" />
          </el-form-item>

          <el-form-item prop="password">
            <span class="svg-container">
            <i class="iconfont icon-unlock"></i>
            </span>
            <el-input name="password" :type="passwordType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="请输入密码" />
            <span class="show-pwd" @click="showPwd">
              <i class="el-icon-view"></i>
            </span>
          </el-form-item>
          <el-form-item>
            <el-checkbox class="ml-10" v-model="auto">记住密码</el-checkbox>
          </el-form-item>
          <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
        </el-form>
      </div>
  </div>
</template>

<script>
import { isvalidUsername } from '@/tools/validate'
// import LangSelect from '@/components/LangSelect'

export default {
  // components: { LangSelect },
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能少于6位数'))
      } else {
        callback()
      }
    }
    return {
      auto:false,
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          let postObj=Object.assign({},this.loginForm)
          postObj.username=this.baseJs.Encrypt(postObj.username.trim())
          postObj.password=this.baseJs.Encrypt(postObj.password)
          this.$store.dispatch('LoginByUsername', postObj).then(() => {
            this.loading = false
            if(this.auto==true){
              this.baseJs.Cookies.set('userName',postObj.username,{expries:7});
              this.baseJs.Cookies.set('checkPass',postObj.password,{expries:7});
            }else{
              this.baseJs.Cookies.remove('userName',postObj.username);
              this.baseJs.Cookies.remove('checkPass',postObj.password);
            }
            this.$router.push({ path: '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    afterQRScan() {
      // const hash = window.location.hash.slice(1)
      // const hashObj = getQueryObject(hash)
      // const originUrl = window.location.origin
      // history.replaceState({}, '', originUrl)
      // const codeMap = {
      //   wechat: 'code',
      //   tencent: 'code'
      // }
      // const codeName = hashObj[codeMap[this.auth_type]]
      // if (!codeName) {
      //   alert('第三方登录失败')
      // } else {
      //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
      //     this.$router.push({ path: '/' })
      //   })
      // }
    }
  },
  created() {
    let a=this.baseJs.Encrypt('admin')
    console.log(a,1,this.baseJs.Decrypt(a))
    let accountInfo = this.baseJs.Cookies.get('userName','checkPass'),
        userName,checkPass;
    console.log(accountInfo);
    // let accountInfo = Cookies.get('checkPass','loginParamscheckPassCoookies');
    //如果cookie里没有账号信息
    if(Boolean(accountInfo) == false){
        console.log('cookie中没有检测到账号信息！');
        userName=process.env.USERNAME
        checkPass=process.env.PASSWORD
    }else{
      //如果cookie里有账号信息
      userName=this.baseJs.Decrypt(this.baseJs.Cookies.get('userName'));
      checkPass=this.baseJs.Decrypt(this.baseJs.Cookies.get('checkPass'));
      this.auto=true;

    }
    this.loginForm={
      username: userName,
      password: checkPass
    }
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 32px;
    width: 85%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      font-size: 16px;
      padding: 6px 5px 6px 15px;
      color: #a3afc1;
      height: 32px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px #ecf0f6 inset !important;
        -webkit-text-fill-color: #333 !important;
      }
    }
  }
  .el-form-item {
    border-bottom: 1px solid rgba(163, 175, 193, 0.5);
    background:transparent;
    color: #a3afc1;
    .el-form-item__content{line-height:32px;}
    &:last-of-type{border-bottom:none;}
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background:$bg url('../../assets/login_bg.jpg') no-repeat center top/100% auto;
  // background-color: $bg;
  .logo{margin:2.5% 0 0 3.6%;}
  .login-box{height:292px;position:absolute;top:50%;right:5.6%;left:12.5%;margin-top:-146px;
    h1{
      margin: 0;
      line-height:292px;
      letter-spacing: 7px;
      color: #e7f0ff;
      font-size:32px;
    }
  }
  .login-form {
    background-color: #ecf0f6;
    width: 368px;
    padding:24px;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 10px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title-container {
    position: relative;
    .title {
      font-size: 24px;
      font-weight:bold;
      font-stretch: normal;
      line-height: 24px;
      margin:8px 0 12px;
      letter-spacing: 0px;
      color: #4d545e;
    }
    .set-language {
      color: #fff;
      position: absolute;
      top: 5px;
      right: 0px;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
@media screen and (max-width: 1600px) {
    .login-container {
        background:$bg url('../../assets/login_bg.jpg') no-repeat center top;
    }
}
@media screen and (max-width: 1140px) {
    .login-container {
        .login-box{
          right: 3%;
          left: 5%;
        }
    }
}
</style>

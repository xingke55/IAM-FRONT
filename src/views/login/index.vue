<!-- eslint-disable vue/html-closing-bracket-newline -->
<template>
  <div v-loading="loading" class="container">
    <div class="login-content">
      <div class="login-container">
        <!-- <div class="login-header">
          <div :class="loginClass('acc')" @click="handleActiveClass('acc')">账号登录</div>
          <div :class="loginClass('code')" @click="handleActiveClass('code')">扫码登录</div>
        </div> -->
        <div class="content">
          <el-form
            v-if="!isqrCode"
            ref="loginForm"
            style="max-width: 600px"
            :model="ruleForm"
            :rules="rules"
            label-width="auto"
            class="demo-ruleForm"
            status-icon
          >
            <el-form-item
              label="用户名"
              prop="username"
            ><el-input v-model="ruleForm.username" style="width: 100%; height: 40px">
              <template
                slot="prepend"
              ><Icon icon-class="user" class="erweima" /></template></el-input
            ></el-form-item>
            <el-form-item
              label="密码"
              prop="password"
            ><el-input
              v-model="ruleForm.password"
              :type="passwordType"
              style="width: 100%; height: 40px"
            ><template slot="append">
              <div>
                <i v-show="visible" @click="show">
                  <Icon icon-class="eyes-open" class="eyes-img" />
                </i>
                <i v-show="!visible" @click="show">
                  <Icon icon-class="eyes-close" class="eyes-img" />
                </i>
              </div> </template></el-input
            ></el-form-item>
            <el-form-item label="验证码" prop="captcha">
              <el-input v-model="ruleForm.captcha" style="width: 65%; height: 40px" />
              <!-- <div ref="codeRef" class="code" @click="getImageCaptcha"></div> -->
              <div class="code-class">
                <img :src="imageCaptcha" alt="" @click="getImageCaptcha">
              </div>
            </el-form-item>
            <div class="login-btn">
              <el-checkbox v-model="ruleForm.rememberMe" label="记住密码" size="large" />
              <el-button
                type="primary"
                @click="login()"
                @keydown.enter.native="login()"
              >登录</el-button
              >
            </div>
          </el-form>
          <div v-if="isqrCode">
            <div id="div_qrcodelogin" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon/Icon.vue'
import {
  getImageCaptcha,
  setRedirectUri,
  auth,
  navigate,
  congress,
  clear,
  get
} from '@/api/user.js'
import CONSTS from '@/utils/const.js'
export default {
  name: 'Login',
  components: {
    Icon
  },
  data() {
    const checkUsername = (rule, value, callback) => {
      if (value.trim() === '') {
        return callback('用户名长度不能为空')
      }

      return callback()
    }
    const checkPassword = (rule, value, callback) => {
      if (value.trim() === '') {
        return callback('密码不能为空')
      }

      callback()
    }
    const checkCaptcha = (rule, value, callback) => {
      if (value.trim() === '') {
        return callback('验证码不能为空')
      }
      return callback()
    }
    return {
      ruleForm: {
        username: 'admin',
        password: '',
        captcha: '',
        rememberMe: true
      },
      activeClass: 'acc',
      isqrCode: false,
      imageCaptcha: '',
      loading: false,
      passwordType: 'password',
      visible: false,
      providers: [],
      rules: {
        username: { validator: checkUsername, trigger: 'blur' },
        password: { validator: checkPassword, trigger: 'blur' },
        captcha: { validator: checkCaptcha, trigger: 'blur' }
      },
      state: ''
    }
  },
  computed: {
    loginClass() {
      return (style) => {
        if (style === this.activeClass) {
          return 'active-class'
        }
      }
    }
  },
  created() {
    if (this.getUrl(CONSTS.REDIRECT_URI) !== '') {
      setRedirectUri(this.getUrl(CONSTS.REDIRECT_URI))
    }
    if (this.getUrl(CONSTS.CONGRESS)) {
      this.congressLogin(this.getUrl(CONSTS.CONGRESS))
    }
    if (
      localStorage.getItem(CONSTS.REMEMBER) &&
      JSON.parse(localStorage.getItem(CONSTS.REMEMBER))
    ) {
      this.ruleForm.username = localStorage.getItem('username')
      this.ruleForm.password = localStorage.getItem('password')
    }
    clear()
    this.keyDownListener = document.addEventListener('keydown', this.keyDownListener)
    const remember_me = localStorage.getItem(CONSTS.REMEMBER)
    get(remember_me)
      .then((res) => {
        if (res.code !== 0) {
          console.log(res.message)
        } else {
          if (res.data.state) {
            this.state = res.data.state
            // 初始化图像验证码
            getImageCaptcha({ state: this.state }).then((res) => {
              this.imageCaptcha = res.data.image
            })
          }
        }
      })
      .catch((err) => {
        Promise.reject(err)
      })
    this.getImageCaptcha()
  },
  destroyed() {
    document.removeEventListener('keydown', this.keyDownListener)
  },
  methods: {
    keyDownListener(e) {
      const key = window.event.keyCode
      if (key === 13) {
        this.login()
      }
    },
    show() {
      this.visible = !this.visible
      if (!this.visible) this.passwordType = 'password'
      else this.passwordType = 'text'
    },
    login() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true
          const loginForm = {
            authType: 'normal',
            state: this.state,
            ...this.ruleForm
          }
          localStorage.setItem(
            CONSTS.REMEMBER,
            this.ruleForm.rememberMe === true ? 'true' : 'false'
          )
          localStorage.setItem('password', this.ruleForm.password)
          localStorage.setItem('username', this.ruleForm.username)
          this.$store
            .dispatch('user/login', loginForm)
            .then((res) => {
              if (res.code !== 0) {
                // ElMessage.error(res.message)
                this.getImageCaptcha()
              } else {
                // 清空路由复用信息?
                auth(res.data)
                // navigate({})
                this.$router.push({ path: '/' })
              }
              // this.$router.push({ path: this.redirect || '/' })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getImageCaptcha() {
      getImageCaptcha({ state: this.state })
        .then((res) => {
          this.imageCaptcha = res.data.image
        })
        .catch((e) => {
          console.log(e)
        })
    },
    handleActiveClass(style) {
      this.activeClass = style
      this.isqrCode = style !== 'acc'
    },
    getUrl(value) {
      const params = window.location.search.substring(1).split('&')
      for (let i = 0; i < params.length; i++) {
        const param = params[i].split('=')
        if (param[0] === value) {
          return param[1]
        }
      }
      return ''
    },
    congressLogin(c) {
      congress(c)
        .then((res) => {
          if (res.code !== 0) {
            console.log(res.msg)
          } else {
            // 设置用户token信息
            auth(res.data)
            navigate({})
          }
        })
        .catch((e) => {
          console.log(e)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  width: 100vw;
  height: 100vh;
  .login-content {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  /* align-content: center; */
  .login-header {
    display: flex;
    justify-content: space-between;
    height: 40px;
    cursor: pointer;
  }
  .login-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .code {
    width: 100px;
    display: flex;
    align-items: center;
  }
  .active-class {
    color: #409eff;
  }
  .login-container {
    width: 20vw;
  }
  .code-class {
    display: inline-block;
    width: 35%;
    vertical-align: top;
  }
  ::v-deep .content {
    min-height: 50vh;

    .el-input-group__append,
    .el-input-group__prepend {
      padding: 0 10px !important;
    }
    .el-input-group__append {
      cursor: pointer;
    }
  }
}
</style>

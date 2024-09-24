<template>
  <div class="container">
    <div class="content">
      <div class="form-content">
        <div class="left">
          <el-form
            key="first"
            ref="firstRef"
            :rules="formEditorRules"
            :model="firstFormEditor"
            label-width="120px"
            label-position="right"
            size="mini"
          >
            <el-form-item label="姓名：">
              <el-input v-model="firstFormEditor.displayName" disabled />
            </el-form-item>
            <el-form-item label="账号：">
              <el-input v-model="firstFormEditor.username" disabled />
            </el-form-item>
            <el-form-item label="当前密码：" prop="oldPassword">
              <el-input v-model="firstFormEditor.oldPassword" show-password />
            </el-form-item>
            <el-form-item label="新密码：" prop="password">
              <el-input v-model="firstFormEditor.password" show-password />
            </el-form-item>
            <el-form-item label="确认密码：" prop="confirmPassword">
              <el-input v-model="firstFormEditor.confirmPassword" show-password />
            </el-form-item>
          </el-form>
          <div class="submit">
            <el-button size="mini" type="primary" @click="handleSubmit">保存</el-button>
          </div>
        </div>
        <div class="right">
          <ul>
            <div>密码强度</div>
            <li v-for="(item, index) in policMessageList" :key="index">{{ item }}</li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import { passwordpolicy, changePassword } from '@/api/configPassword.js'

export default {
  name: 'ConfigPassword',
  data() {
    const validateOldPassword = (rule, value, callback) => {
      if (value === '') {
        return callback('密码不能为空')
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value === '') {
        return callback('密码不能为空')
      }
      const data = this.policy
      if (data.minLength !== 0 && data.maxLength !== 0) {
        const inputLength = value.length
        if (inputLength < data.minLength || inputLength > data.maxLength) {
          //  = "限定新密码长度为"+data.minLength+"-"+data.maxLength+"位"

          return callback('密码长度不符合！')
        }
      }

      if (data.lowerCase > 0) {
        const strArr = Array.from(value)
        const abc = []
        strArr.forEach(function(value, index, array) {
          const code = value.charCodeAt()
          if (code >= 'a'.charCodeAt(0) && code <= 'z'.charCodeAt(0)) {
            abc.push(value)
          }
        })
        if (abc.length < data.lowerCase) {
          //  = "限定新密码至少需要包含"+data.lowerCase+"位【a-z】小写字母"
          return callback(`新密码至少需要包含${data.lowerCase}位小写字母`)
        }
      }
      if (data.upperCase > 0) {
        const strArr = Array.from(value)
        const ABC = []
        strArr.forEach(function(value, index, array) {
          const code = value.charCodeAt()
          if (code >= 'A'.charCodeAt(0) && code <= 'Z'.charCodeAt(0)) {
            ABC.push(value)
          }
        })
        if (ABC.length < data.upperCase) {
          //  = "限定新密码至少需要包含"+data.lowerCase+"位【A-Z】大写字母"
          return callback(`新密码至少需要包含${data.upperCase}位大写字母`)
        }
      }
      if (data.digits > 0) {
        const strArr = Array.from(value)
        const number = []
        strArr.forEach(function(value, index, array) {
          var regPos = /^[0-9]+.?[0-9]*/ // 判断是否是数字。
          if (regPos.test(value)) {
            number.push(value)
          }
        })
        if (number.length < data.digits) {
          //  = "限定新密码至少需要包含"+data.digits+"位【0-9】阿拉伯数字";

          return callback(`新密码至少需要包含${data.digits}位阿拉伯数字`)
        }
      }
      if (data.specialChar > 0) {
        // eslint-disable-next-line no-array-constructor
        var AllNumIsSame = new Array('’', '”', '!', '@', '#', '$', '%', '^', '&', '*', '.')
        const strArr = Array.from(value)
        const number = []
        strArr.forEach(function(value, index, array) {
          if (AllNumIsSame.indexOf(value) !== -1) {
            // $.type 是jquery的函数，用来判断对象类型
            number.push(value)
          }
        })
        if (number.length < data.specialChar) {
          //  = "限定新密码至少需要包含"+data.specialChar+"位特殊字符";

          return callback(`新密码至少需要包含${data.specialChar}位特殊字符`)
        }
      }
      callback()
    }
    const validateConfirmPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('密码不能为空'))
      }
      if (value !== this.firstFormEditor.password) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    return {
      firstFormEditor: {
        displayName: JSON.parse(localStorage.getItem('user')).displayName,
        username: JSON.parse(localStorage.getItem('user')).username,
        oldPassword: '',
        password: '',
        confirmPassword: ''
      },
      formEditorRules: {
        oldPassword: [{ required: true, validator: validateOldPassword, trigger: 'blur' }],
        password: [{ required: true, validator: validatePassword, trigger: 'blur' }],
        confirmPassword: [{ required: true, validator: validateConfirmPassword, trigger: 'blur' }]
      },
      policy: {},
      policMessageList: []
    }
  },
  created() {
    this.getPasswordpolicy()
  },
  methods: {
    getPasswordpolicy() {
      passwordpolicy().then((res) => {
        this.policy = res.data
        this.policMessageList = res.data.policMessageList
      })
    },
    handleSubmit() {
      changePassword(this.firstFormEditor).then(res => {
        if (res.code === 0) {
          return this.$message.success('修改成功')
        }
        if (res.code === 1) {
          this.$message.error(res.message)
        }
      }).catch(e => {
        console.log(e)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  background-color: #fff;
  min-height: calc(100vh - 141px);
  display: flex;
  justify-content: center;
  .content {
    width: 80vw;
    .form-content {
      padding-top: 10px;
      display: flex;
    }
  }
}
.submit {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.right {
  width: 30vw;
  li {
    margin: 10px;
  }
}
.left {
  flex: 1;
}
</style>

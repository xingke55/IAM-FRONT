<template>
  <div class="container">
    <div class="content">
      <el-tabs v-model="activeName" @tab-click="handleTabClick">
        <el-tab-pane
          label="基本信息"
          name="first"
        ><el-form
          key="first"
          ref="firstRef"
          :rules="formEditorRules"
          :model="firstFormEditor"
          label-width="120px"
          label-position="right"
          size="mini"
        >
          <el-form-item label="姓名：" prop="displayName">
            <el-input v-model="firstFormEditor.displayName" />
          </el-form-item>
          <el-form-item label="登录账号" prop="username">
            <el-input v-model="firstFormEditor.username" disabled />
          </el-form-item>
          <el-form-item label="性别：">
            <el-radio-group v-model="firstFormEditor.gender" size="mini">
              <el-radio-button :label="2">男</el-radio-button>
              <el-radio-button :label="1">女</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-col :span="12"><el-form-item label="员工编号：" prop="employeeNumber">
            <el-input v-model="firstFormEditor.employeeNumber" disabled />
          </el-form-item></el-col>
          <el-col :span="12"><el-form-item label="域账号" prop="windowsAccount">
            <el-input v-model="firstFormEditor.windowsAccount" disabled />
          </el-form-item></el-col>
          <el-col :span="12"><el-form-item label="手机号码" prop="mobile">
            <el-input v-model="firstFormEditor.mobile" disabled />
          </el-form-item></el-col>
          <el-col :span="12"><el-form-item label="电子邮箱" prop="email">
            <el-input v-model="firstFormEditor.email" disabled />
          </el-form-item></el-col>
          <el-col :span="12"> <el-form-item label="用户类型" prop="userType">
            <el-select v-model="firstFormEditor.userType" placeholder="请选择" disabled>
              <el-option
                v-for="item in userTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item></el-col>
          <el-col :span="12"> <el-form-item label="用户状态" prop="userState">
            <el-select v-model="firstFormEditor.userState" placeholder="请选择" disabled>
              <el-option
                v-for="item in userStateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item></el-col>
          <el-col :span="12"><el-form-item label="排序" prop="loginUrl">
            <el-input v-model="firstFormEditor.loginUrl" disabled />
          </el-form-item></el-col>
          <el-col :span="12"> <el-form-item label="状态：" prop="status">
            <el-select v-model="firstFormEditor.status" placeholder="请选择" disabled>
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item></el-col>

        </el-form>
        </el-tab-pane>
        <el-tab-pane
          label="个人信息"
          name="second"
        ><el-form
          key="second"
          ref="secondRef"
          :rules="formEditorRules"
          :model="secondFormEditor"
          label-width="120px"
          label-position="right"
          size="mini"
        ><el-col
           :span="12"
         ><el-form-item label="姓：">
           <el-input v-model="secondFormEditor.familyName" /> </el-form-item></el-col>
          <el-col
            :span="12"
          ><el-form-item label="中间名：">
            <el-input v-model="secondFormEditor.middleName" /> </el-form-item></el-col>
          <el-col
            :span="12"
          ><el-form-item label="名：">
            <el-input v-model="secondFormEditor.givenName" /> </el-form-item></el-col>
          <el-col :span="12">
            <el-form-item label="昵称：">
              <el-input v-model="secondFormEditor.nickName" /> </el-form-item></el-col>
          <el-col
            :span="12"
          ><el-form-item label="证件类型：">
            <el-select v-model="secondFormEditor.idType" placeholder="请选择">
              <el-option
                v-for="item in idTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select> </el-form-item></el-col>
          <el-col :span="12">
            <el-form-item label="证件号码：">
              <el-input v-model="secondFormEditor.idCardNo" /> </el-form-item></el-col>
          <el-col
            :span="12"
          ><el-form-item label="婚姻状态：">
            <el-select v-model="secondFormEditor.married" placeholder="请选择">
              <el-option
                v-for="item in marriedOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select> </el-form-item></el-col>
          <el-col :span="12">
            <el-form-item label="出生日期：">
              <el-input v-model="secondFormEditor.birthDate" /> </el-form-item></el-col>
          <el-col
            :span="12"
          ><el-form-item label="学历：">
            <el-input v-model="secondFormEditor.education" /> </el-form-item></el-col>
          <el-col :span="12">
            <el-form-item label="毕业院校：">
              <el-input v-model="secondFormEditor.graduateFrom" /> </el-form-item></el-col>
          <el-col :span="12">
            <el-form-item label="毕业时间：">
              <el-input v-model="secondFormEditor.graduateDate" /> </el-form-item></el-col>
          <el-col
            :span="12"
          ><el-form-item label="工作时间：">
            <el-input v-model="secondFormEditor.startWorkDate" /> </el-form-item></el-col>
          <el-col
            :span="12"
          ><el-form-item label="时区">
            <el-input v-model="secondFormEditor.timeZone" /> </el-form-item></el-col>
          <el-col
            :span="12"
          ><el-form-item label="语言偏好：">
            <el-input v-model="secondFormEditor.preferredLanguage" /> </el-form-item></el-col>
          <el-col
            :span="12"
          ><el-form-item label="个人主业：">
            <el-input v-model="secondFormEditor.webSite" /> </el-form-item></el-col>
          <el-col :span="12">
            <el-form-item label="即时通讯：">
              <el-input v-model="secondFormEditor.defineIm" /> </el-form-item></el-col> </el-form></el-tab-pane>
        <el-tab-pane
          label="机构信息"
          name="third"
        ><el-form
          key="third"
          ref="thirdRef"
          :rules="formEditorRules"
          :model="thirdFormEditor"
          label-width="120px"
          label-position="right"
          size="mini"
        >
          <el-col
            :span="12"
          ><el-form-item label="所属组织：">
            <el-input v-model="thirdFormEditor.organization" /> </el-form-item></el-col>
          <el-col
            :span="12"
          ><el-form-item label="分支机构：">
            <el-input v-model="thirdFormEditor.division" /> </el-form-item></el-col>
          <el-col
            :span="12"
          ><el-form-item label="部门编号：">
            <el-input v-model="thirdFormEditor.departmentId" disabled /> </el-form-item></el-col>
          <el-col
            :span="12"
          ><el-form-item label="部门名称：">
            <el-input v-model="thirdFormEditor.departmentId" /> </el-form-item></el-col>
          <el-col :span="12">
            <el-form-item label="成本中心：">
              <el-input v-model="thirdFormEditor.costCenter" /> </el-form-item></el-col>
          <el-col
            :span="12"
          ><el-form-item label="级别：">
            <el-input v-model="thirdFormEditor.jobLevel" /> </el-form-item></el-col>
          <el-col
            :span="12"
          ><el-form-item label="职位：">
            <el-input v-model="thirdFormEditor.jobTitle" /> </el-form-item></el-col>
          <el-col
            :span="12"
          ><el-form-item label="上级经理：">
            <el-input v-model="thirdFormEditor.manager" /> </el-form-item></el-col>
          <el-col
            :span="12"
          ><el-form-item label="助理：">
            <el-input v-model="thirdFormEditor.assistant" /> </el-form-item></el-col>
          <el-col :span="12">
            <el-form-item label="办公地址：">
              <el-input v-model="thirdFormEditor.workOfficeName" /> </el-form-item></el-col>
          <el-col
            :span="12"
          ><el-form-item label="入职时间：">
            <el-input v-model="thirdFormEditor.entryDate" /> </el-form-item></el-col>
          <el-col
            :span="12"
          ><el-form-item label="离职时间：">
            <el-input v-model="thirdFormEditor.quitDate" /> </el-form-item></el-col> </el-form></el-tab-pane>
        <el-tab-pane
          label="机构扩展"
          name="fourth"
        ><el-form
          key="fourth"
          ref="fourthRef"
          :rules="formEditorRules"
          :model="fourthFormEditor"
          label-width="120px"
          label-position="right"
          size="mini"
        >
          <el-col
            :span="12"
          ><el-form-item label="工作电话：">
            <el-input v-model="fourthFormEditor.workPhoneNumber" /> </el-form-item></el-col>
          <el-col
            :span="12"
          ><el-form-item label="工作邮件：">
            <el-input v-model="fourthFormEditor.workEmail" /> </el-form-item></el-col>
          <el-col
            :span="12"
          ><el-form-item label="国家：">
            <el-input v-model="fourthFormEditor.workCountry" /> </el-form-item></el-col>
          <el-col
            :span="12"
          ><el-form-item label="省：">
            <el-input v-model="fourthFormEditor.workRegion" /> </el-form-item>‘</el-col>
          <el-col :span="12">
            <el-form-item label="城市：">
              <el-input v-model="fourthFormEditor.workLocality" /> </el-form-item></el-col>
          <el-col
            :span="12"
          ><el-form-item label="地址：">
            <el-input v-model="fourthFormEditor.workStreetAddress" /> </el-form-item></el-col>
          <el-col
            :span="12"
          ><el-form-item label="邮编：">
            <el-input v-model="fourthFormEditor.workPostalCode" /> </el-form-item></el-col>
          <el-col
            :span="12"
          ><el-form-item label="传真：">
            <el-input v-model="fourthFormEditor.workFax" /> </el-form-item></el-col> </el-form></el-tab-pane>
        <el-tab-pane
          label="家庭信息"
          name="fifth"
        ><el-form
          key="fifth"
          ref="fifthRef"
          :rules="formEditorRules"
          :model="fifthFormEditor"
          label-width="120px"
          label-position="right"
          size="mini"
        >
          <el-col
            :span="12"
          ><el-form-item label="家庭邮箱：">
            <el-input v-model="fifthFormEditor.homeEmail" /> </el-form-item></el-col>
          <el-col
            :span="12"
          ><el-form-item label="家庭电话：">
            <el-input v-model="fifthFormEditor.homePhoneNumber" /> </el-form-item></el-col>
          <el-col
            :span="12"
          ><el-form-item label="家庭传真：">
            <el-input v-model="fifthFormEditor.homeFax" /> </el-form-item></el-col>
          <el-col
            :span="12"
          ><el-form-item label="家庭邮编：">
            <el-input v-model="fifthFormEditor.homePostalCode" /> </el-form-item>‘</el-col>
          <el-col :span="12">
            <el-form-item label="国家：">
              <el-input v-model="fifthFormEditor.homeCountry" /> </el-form-item></el-col>
          <el-col
            :span="12"
          ><el-form-item label="省：">
            <el-input v-model="fifthFormEditor.homeRegion" /> </el-form-item></el-col>
          <el-col
            :span="12"
          ><el-form-item label="城市：">
            <el-input v-model="fifthFormEditor.homeLocality" /> </el-form-item></el-col>
          <el-col
            :span="12"
          ><el-form-item label="家庭地址：">
            <el-input v-model="fifthFormEditor.homeStreetAddress" /> </el-form-item></el-col> </el-form></el-tab-pane>
      </el-tabs>
      <div class="submit">
        <el-button size="mini" type="primary" @click="handleSubmit">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { profileGet, profileUpdate } from '@/api/configProfile.js'
export default {
  name: 'ConfigProfile',
  data() {
    return {
      activeName: 'first',
      formEditorRules: {
        displayName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        username: [{ required: true, message: '请输入登录账号', trigger: 'blur' }],

        userType: [{ required: true, message: '请选择用户类型', trigger: 'change' }],
        userState: [{ required: true, message: '请选择用户状态', trigger: 'change' }],
        sortIndex: [{ required: true, message: '请输入排序', trigger: 'blur' }],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }]
      },
      firstFormEditor: {
        gender: 1,
        displayName: '',
        username: '',
        loginUrl: '',
        status: '',
        userState: '',
        email: '',
        userType: '',
        employeeNumber: '',
        windowsAccount: '',
        iconBase64: '',
        mobile: '',
        sortIndex: 1
      },
      secondFormEditor: {
        familyName: '',
        middleName: '',
        givenName: 0,
        nickName: '',
        idType: '',
        idCardNo: '',
        married: '',
        birthDate: '',
        education: '',
        graduateFrom: '',
        graduateDate: '',
        startWorkDate: '',
        timeZone: '',
        preferredLanguage: '',
        webSite: '',
        defineIm: ''
      },
      thirdFormEditor: {
        organization: '',
        division: '',
        departmentId: '',
        costCenter: '',
        jobLevel: '',
        jobTitle: '',
        manager: '',
        assistant: '',
        entryDate: '',
        quitDate: '',
        workOfficeName: ''
      },
      fourthFormEditor: {
        workPhoneNumber: '',
        workEmail: '',
        workCountry: '',
        workRegion: '',
        workLocality: '',
        workStreetAddress: '',
        workPostalCode: '',
        workFax: ''
      },
      fifthFormEditor: {
        homePhoneNumber: '',
        homeFax: '',
        homePostalCode: '',
        homeCountry: '',
        homeRegion: '',
        homeLocality: '',
        homeStreetAddress: '',
        homeEmail: ''
      },
      formCpn: {},
      userTypeOptions: [
        { label: '内部员工', value: 'EMPLOYEE' },
        { label: '供应商', value: 'SUPPLIER' },
        { label: '客户', value: 'CUSTOMER' },
        { label: '承包商', value: 'CONTRACTOR' },
        { label: '经销商', value: 'DEALER' },
        { label: '合作伙伴', value: 'PARTNER' },
        { label: '外部用户', value: 'EXTERNAL' },
        { label: '实习生', value: 'INTERN' },
        { label: '临时用户', value: 'TEMP' }
      ],

      userStateOptions: [
        { label: '在职', value: 'RESIDENT' },
        { label: '离职', value: 'WITHDRAWN' },
        { label: '停薪留职', value: 'INACTIVE' },
        { label: '退休', value: 'RETIREE' }
      ],
      statusOptions: [
        { label: '活动', value: '1' },
        { label: '不活动', value: '2' },
        { label: '禁用', value: '4' },
        { label: '锁定', value: '5' },
        { label: '已删除', value: '9' }
      ],
      idTypeOptions: [
        { label: '未知', value: '0' },
        { label: '身份证', value: '1' },
        { label: '护照', value: '2' },
        { label: '学生证', value: '3' },
        { label: '军人证', value: '4' }
      ],
      marriedOptions: [
        { label: '未知', value: '0' },
        { label: '单身', value: '1' },
        { label: '已婚', value: '2' },
        { label: '离异', value: '3' },
        { label: '丧偶', value: '4' }
      ]
    }
  },
  created() {
    this.profileGet()
  },
  methods: {
    handleTabClick() {
      if (!this.formCpn[this.activeName]) {
        this.formCpn[this.activeName] = this.$refs[`${this.activeName}Ref`]
      } else {
        return
      }
    },
    profileGet() {
      profileGet()
        .then((res) => {
          for (let index = 0; index < 5; index++) {
            let formName = ''
            if (index === 0) {
              formName = 'firstFormEditor'
            } else if (index === 1) {
              formName = 'secondFormEditor'
            } else if (index === 2) {
              formName = 'thirdFormEditor'
            } else if (index === 3) {
              formName = 'fourthFormEditor'
            } else {
              formName = 'fifthFormEditor'
            }
            for (const key in this[formName]) {
              this[formName][key] = res.data[key]
            }
          }
          this.$nextTick(() => {
            this.formCpn['first'] = this.$refs[`firstRef`]
          })
        })
        .catch()
    },
    handleSubmit() {
      const allFomPromise = Object.keys(this.formCpn).map((key, index) => {
        return new Promise((resolve) => {
          this.formCpn[key].validate((res) => {
            resolve(res)
          })
        })
      })
      Promise.all(allFomPromise)
        .then((res) => {
          // 找出第一个校验报错的表单
          const index = res.indexOf(false)
          if (index === -1) {
            // 无报错
            console.log('提交')
            const data = Object.assign(
              {},
              this.firstFormEditor,
              this.secondFormEditor,
              this.thirdFormEditor,
              this.fourthFormEditor,
              this.fifthFormEditor
            )
            profileUpdate(data)
              .then((res) => {
                if (res.code === 2 && res.message === null) {
                  this.$message.success('提交成功')
                  this.profileGet()
                }
              })
              .catch((e) => {
                console.log(e)
              })
          } else {
            let formIndex
            if (index === 0) {
              formIndex = 'first'
            } else if (index === 1) {
              formIndex = 'second'
            } else if (index === 2) {
              formIndex = 'third'
            } else if (index === 3) {
              formIndex = 'fourth'
            } else {
              formIndex = 'fifth'
            }
            this.activeName = formIndex
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
  background-color: #fff;
  min-height: calc(100vh - 141px);
  display: flex;
  justify-content: center;
  .content {
    width: 80vw;
  }
}
.submit {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>

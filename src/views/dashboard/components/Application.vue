<template>
  <div class="container">
    <div class="content">
      <div class="svg-header">
        <div class="svg-icon-left">
          <svg
            t="1725429943931"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1671"
            width="30"
            height="30"
          >
            <path
              fill="red"
              d="M951.901 244.015l-413.3-238.57a33.606 33.606 0 0 0-33.909 0L91.3 244.016c-10.426 6.12-16.99 17.221-16.99 29.346v477.184c0 12.149 6.447 23.343 16.99 29.37l413.3 238.662c5.213 2.933 11.101 4.515 16.99 4.515 5.794 0 11.775-1.582 16.988-4.515l413.3-238.661c10.427-6.121 16.99-17.222 16.99-29.37V273.36a33.908 33.908 0 0 0-16.966-29.346zM892.23 726.016l-370.618 213.97-370.642-213.97v-427.87L521.588 84.178l370.642 213.97v427.869z m8.797 5.073"
              p-id="1672"
            />
            <path
              fill="red"
              d="M285.207 348.393a34.095 34.095 0 0 0-46.336 12.567 33.908 33.908 0 0 0 12.474 46.36l235.94 136.215v269.498a33.745 33.745 0 0 0 33.884 33.885 33.745 33.745 0 0 0 33.886-33.885V543.977L791.9 407.227a34.025 34.025 0 0 0 12.451-46.36 34.025 34.025 0 0 0-46.336-12.474l-236.404 136.54-236.405-136.54z m0 0"
              p-id="1673"
            /></svg><span>应用</span>
        </div>

        <el-select v-model="value" placeholder="请选择" @change="filterByValue">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <ul v-if="appList.length">
        <template v-for="(app, index) in appList">
          <li :key="index" @click="onAuthz(app)">
            <div style="display: flex; flex-direction: column">
              <img :src="app.iconBase64" alt=""> <span>{{ app.appName }}</span>
            </div>
          </li>
        </template>
      </ul>
      <div v-else class="empty">暂无数据</div>
    </div>
  </div>
</template>
<script>
import { getAppList } from '@/api/application.js'
export default {
  name: 'Application',
  data() {
    return {
      appList: [],
      value: '',
      options: [
        { value: '', label: 'All' },
        { value: 'none', label: '暂无' },
        { value: '1011', label: '企业服务/数据分析' },
        { value: '1012', label: '企业服务/电子办公' },
        { value: '1013', label: '企业服务/综合OA' },
        { value: '1014', label: '企业服务/工商法律' },
        { value: '1015', label: '企业服务/营销创意' },
        { value: '1016', label: '企业服务/行政服务' },
        { value: '1017', label: '企业服务/企业福利' },
        { value: '1111', label: '团队协作/项目管理' },
        { value: '1112', label: '团队协作/敏捷研发' },
        { value: '1113', label: '团队协作/设计工具' },
        { value: '1114', label: '团队协作/待办工具' },
        { value: '1211', label: '人力资源/综合人事' },
        { value: '1212', label: '人力资源/招聘管理' },
        { value: '1213', label: '人力资源/背景调查' },
        { value: '1214', label: '人力资源/员工激励' },
        { value: '1215', label: '人力资源/企业文化' },
        { value: '1311', label: '考试培训' },
        { value: '1411', label: '商旅出行' },
        { value: '1511', label: '财务管理/综合财务' },
        { value: '1512', label: '财务管理/费控报销' },
        { value: '1611', label: '表单流程' },
        { value: '1711', label: '表单流程/业务流程' },
        { value: '1712', label: '表单流程/问卷调研' },
        { value: '1811', label: '供应链/资产管理' },
        { value: '1812', label: '供应链/进销存' },
        { value: '1911', label: '客户关系/客户服务' },
        { value: '1912', label: '客户关系/客户管理' }
      ]
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.loading = true
      getAppList({ ...this.form, ...this.page })
        .then((res) => {
          this.appList = res.data
        })
        .catch((e) => {})
    },
    onAuthz(app) {
      if (app.protocol === 'Basic' || app.inducer === 'SP') {
        window.open(app.loginUrl)
        return
      }
      window.open(`${app.baseUrl}/authz/${app.id}`)
    },
    filterByValue() {
      if (this.value !== '') {
        this.appList = this.appList.filter((item) => item.category === this.value)
      } else {
        this.init()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;

  .content {
    .svg-header {
      height: 60px;
      border-bottom: 1px solid #ccc;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .svg-icon-left {
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          margin-left: 10px;
          font-size: 20px;
        }
      }
    }
    width: 80vw;
    background-color: #fff;
    padding: 0 24px;
    min-height: calc(100vh - 141px);
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 25%;
        height: 120px;

        /* width: 254px;

        height: 127px; */
        background-color: #fff;
        display: flex;
        justify-content: center;
        div {
          width: 80%;
          height: 80%;
          border: 1px solid #ccc;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            height: 65px;
            width: 65px;
          }
          span{
            display: block;
            margin-top: 5px;
            font-size: 10px;
          }
          &:hover {
            cursor: pointer;
            box-shadow: 0px 2px 5px 3px rgba(0, 0, 0, 0.15);
            transition: box-shadow 0.3s, border-color 0.3s;
          }
        }
      }
    }
    .empty {
      color: #ccc;
      font-size: 20px;
    }
  }
}
</style>

<template>
  <div>
    <div class="search-header">
      <div>
        <span>开始时间：</span>
        <el-date-picker
          v-model="form.startDate"
          type="datetime"
          style="width: 300px; margin-right: 10px"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </div>
      <div>
        <span>结束时间：</span>
        <el-date-picker
          v-model="form.endDate"
          type="datetime"
          style="width: 300px; margin-right: 10px"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </div>

      <el-button type="primary" @click="search">查询</el-button>
      <el-button @click="resetForm">重置</el-button>
    </div>
    <div class="content-table">
      <div class="content-inner">
        <Table
          v-model="page"
          v-loading="loading"
          v-bind="tableConfig"
          :list-data="listData"
          :list-count="listData.length"
          @pageChange="init()"
        />
      </div>
    </div>
  </div>
</template>
<script>
import Table from '@/components/Table'
import { tableConfig } from './tableConfig/loginTc.js'
import { loginHistoryFetch } from '@/api/audit.js'
export default {
  name: 'AuditLogins',
  components: {
    Table
  },
  data() {
    return {
      form: {
        userName: '',
        displayName: '',
        startDate: '',
        endDate: '',
        nmuber: ''
      },
      page: { pageNumber: 1, pageSize: 10 },
      loading: false,
      showMore: false,
      listData: [],
      tableConfig: {}
    }
  },
  created() {
    this.tableConfig = tableConfig
    this.init()
  },
  methods: {
    init() {
      this.loading = true
      loginHistoryFetch({ ...this.form, ...this.page })
        .then((res) => {
          this.listData = res.data.rows
          this.loading = false
          this.page.pageNumber = res.data.page
        })
        .catch((e) => {
          this.loading = false
        })
    },
    search() {
      this.init()
    },
    resetForm() {
      this.form = {
        userName: '',
        displayName: '',
        startDate: '',
        endDate: '',
        nmuber: ''
      }
      this.page = { pageNumber: 1, pageSize: 10 }
      this.init()
    },
    add() {},
    remove() {},
    handleRemoveClick() {}
  }
}
</script>
<style lang='scss' scoped>
.search-header {
  padding: 20px;
  background-color: #fff;
  display: flex;
  justify-content: flex-start;
  .search-select {
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    align-items: center;
  }
  div {
    margin-right: 12px;
  }
  .showMore {
    display: block;
    margin-top: 10px;
  }
}
.content-table {
  padding-top: 20px;
  min-height: calc(100vh - 150px);
  width: 100%;
  box-sizing: border-box;
  background-color: #f5f7fa;
  .content-inner {
    background-color: #fff;
    padding: 20px;
    width: 100%;
  }
}
</style>

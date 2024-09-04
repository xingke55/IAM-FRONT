<template>
  <div class="dashboard-container">
    <div class="menu-header">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="handleSelect"
      >
        <el-menu-item index="Application">应用</el-menu-item>
        <el-submenu index="Config">
          <template slot="title">配置</template>
          <el-menu-item index="ConfigProfile">我的资料</el-menu-item>
          <el-menu-item index="ConfigPassword">密码修改</el-menu-item>
        </el-submenu>
        <el-submenu index="Audit">
          <template slot="title">审计</template>
          <el-menu-item index="AuditLogins">登录日志</el-menu-item>
          <el-menu-item index="AuditLoginApps">应用访问日志</el-menu-item>
        </el-submenu>
        <el-menu-item index="IAM"
          ><a href="https://localhost:9528" target="_blank"
            >后台</a
          ></el-menu-item
        >
      </el-menu>
    </div>

    <div class="contain-content">
      <component :is="currentCpn" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// 动态注册组件
const cpnFiles = require.context("./components", true, /\.vue/);
const components = {};
cpnFiles.keys().forEach((key) => {
  const cpn = require("./components" + key.split(".")[1]);
  const reqComName = cpn.name || key.replace(/\.\/(.*)\.vue/, "$1");
  components[reqComName] = cpn.default || cpn;
});

export default {
  name: "Dashboard",
  components,
  data() {
    return {
      activeIndex: "Application",
    };
  },
  computed: {
    ...mapGetters(["name"]),
    currentCpn() {
      return this.activeIndex;
    },
  },

  methods: {
    handleSelect(key, keyPath) {
      if (key === "IAM") return;
      this.activeIndex = key;
    },
  },
};
</script>

<style lang="scss" scoped>
.contain-content {
  min-height: calc(100vh - 121px);
  background-color: #f5f7fa;
  padding: 20px 20px 0 20px;
}
.dashboard-container {
  .menu-header {
    display: flex;
    width: 100%;
    background-color: #545c64;
    justify-content: center;
    ::v-deep .el-menu {
      width: 80vw;
      border-bottom: none;
      .el-menu-item{
        box-sizing: border-box;
      }
    }
  }
}
</style>

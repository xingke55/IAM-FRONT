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

        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <ul v-if="appList.length">
        <template v-for="(app,index) in appList">
          <li :key="index" @click="onAuthz($event, app.id)">
            <img :src="app.iconBase64" alt="">
          </li>
        </template>
      </ul>
      <div v-else class="empty">暂无数据</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Application',
  data() {
    return {
      appList: [
        {
          id: '1',
          iconBase64: ''
        }
      ],
      value: '',
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        }
      ]
    }
  },
  methods: {
    onAuthz() {}
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
        width: 254px;
        height: 127px;
        background-color: #fff;
        margin-right: 24px;
        margin-bottom: 12px;
        img {
          height: 65px;
          width: 65px;
        }
        &:hover {
          cursor: pointer;
          box-shadow: 0px 2px 5px 3px rgba(0, 0, 0, 0.15);
        }
      }
      & > li:nth-child(4n) {
        margin-right: 0;
      }
    }
    .empty {
      color: #ccc;
      font-size: 20px;
    }
  }
}
</style>

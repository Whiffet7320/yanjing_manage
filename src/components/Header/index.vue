<template>
  <div class="header">
    <div class="nav1">
      <div class="tit1" v-html="headerTit"></div>
      <div class="tit2">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            admin<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">个人中心</el-dropdown-item>
            <el-dropdown-item command="2">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["headerTit"]),
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    handleCommand(command) {
      if (command == "2") {
        sessionStorage.setItem("token", null);
        sessionStorage.setItem("isLogin", null);
        this.$router.go(0);
        this.$router.push({ path: "/login" });
      }
    },
  },
};
</script>

<style scoped lang='scss'>
.header {
  display: flex;
  position: relative;
  background-color: #fff;
  .nav1 {
    height: 60px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 50px;
    font-size: 14px;
    .tit1 {
      color: #999;
      .active {
        color: #515a61;
        font-weight: 700;
      }
    }
    .tit2 {
      .el-dropdown-link {
        cursor: pointer;
        color: #409eff;
      }
      .el-icon-arrow-down {
        font-size: 12px;
      }
    }
  }
}
</style>

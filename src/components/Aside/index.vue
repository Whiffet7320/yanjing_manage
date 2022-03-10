<template>
  <div class="aside">
    <!-- <div class="nav4" @click="loginOut">
      <img class="pic1" src="../../assets/image/组191.png" alt="" />
      <div class="tit1">切换账号</div>
    </div>-->
    <div class="menu">
      <div class="myisCollBtn">
        <el-button @click="myisColl">
          <i class="el-icon-menu"></i>
        </el-button>
      </div>

      <el-menu
        :default-active="menuActiveIndex"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        background-color="#001529"
        text-color="#fff"
        router
      >
        <el-menu-item :route="{ name: 'Shouye' }" index="1-1">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-s-goods"></i>
            <span>商品</span>
          </template>
          <!-- <el-menu-item :route="{ name: 'Shangpinguanli' }" index="2-1">商品管理</el-menu-item> -->
          <el-menu-item :route="{ name: 'Shangpincangkuguanli' }" index="2-5">商品仓库管理</el-menu-item>
          <!-- <el-menu-item :route="{ name: 'Chicunguanli' }" index="2-6">尺寸管理</el-menu-item> -->
          <el-menu-item :route="{ name: 'Yanseguanli' }" index="2-7">颜色管理</el-menu-item>
          <el-menu-item :route="{ name: 'Tucengguanli' }" index="2-9">涂层管理</el-menu-item>
          <el-menu-item :route="{ name: 'Biaoqianguanli' }" index="2-10">标签管理</el-menu-item>
          <el-menu-item :route="{ name: 'Pianguangduguanli' }" index="2-11">眼镜偏光率管理</el-menu-item>
          <el-menu-item :route="{ name: 'Yanjingdengjifenlei' }" index="2-12">眼镜等级管理</el-menu-item>
          <el-menu-item :route="{ name: 'Yanjingfenleiguanli' }" index="2-8">眼镜分类管理</el-menu-item>
          <el-menu-item :route="{ name: 'Shangpingfenlei' }" index="2-2">商品分类</el-menu-item>
          <!-- <el-menu-item :route="{ name: 'Shangpingpinglun' }" index="2-3"
            >商品评论</el-menu-item
          >-->
          <el-menu-item :route="{ name: 'Yunfeimoban' }" index="2-4">运费模板</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-s-order"></i>
            <span>订单</span>
          </template>
          <el-menu-item :route="{ name: 'Dingdanguanli' }" index="3-1">订单管理</el-menu-item>
        </el-submenu>
        <!-- <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-s-ticket"></i>
            <span>营销</span>
          </template>
          <el-submenu index="4-1">
            <span slot="title">拼团管理</span>
            <el-menu-item :route="{ name: 'Pingtuanshangping' }" index="4-1-1">拼团商品</el-menu-item>
            <el-menu-item :route="{ name: 'Pingtuanliebiao' }" index="4-1-2">拼团列表</el-menu-item>
            <el-menu-item :route="{ name: 'Jishouliebiao' }" index="4-1-3">寄售列表</el-menu-item>
            <el-menu-item :route="{ name: 'Pingtuanjilu' }" index="4-1-4">拼团记录</el-menu-item>
          </el-submenu>
          <el-submenu index="4-2">
            <span slot="title">卖场活动</span>
            <el-menu-item :route="{ name: 'Maichanghuodong' }" index="4-2-1">活动列表</el-menu-item>
          </el-submenu>
        </el-submenu> -->
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-s-custom"></i>
            <span>用户</span>
          </template>
          <el-menu-item :route="{ name: 'Yonghuguanli' }" index="5-1">用户管理</el-menu-item>
          <!-- <el-menu-item :route="{ name: 'Lianghaoliebiao' }" index="5-2">靓号列表</el-menu-item> -->
          <!-- <el-menu-item :route="{ name: 'Tixianliebiao' }" index="5-3">提现列表</el-menu-item> -->
        </el-submenu>
        <!-- <el-submenu index="6">
          <template slot="title">
            <i class="el-icon-share"></i>
            <span>分销</span>
          </template>
          <el-menu-item :route="{ name: 'Fenxiaoshezhi' }" index="6-1">分销设置</el-menu-item>
        </el-submenu> -->
        <!-- <el-submenu index="7">
          <template slot="title">
            <i class="el-icon-s-check"></i>
            <span>财务</span>
          </template>
          <el-submenu index="7-1">
            <span slot="title">财务操作</span>
            <el-menu-item :route="{ name: 'Tixianshenqing' }" index="7-1-1"
              >提现申请</el-menu-item
            >
          </el-submenu>
          <el-submenu index="7-2">
            <span slot="title">佣金记录</span>
            <el-menu-item :route="{ name: 'Yongjinjilu' }" index="7-2-1"
              >佣金记录</el-menu-item
            >
          </el-submenu>
        </el-submenu>-->
        <!-- <el-submenu index="9">
          <template slot="title">
            <i class="el-icon-s-finance"></i>
            <span>文章</span>
          </template>
          <el-menu-item :route="{ name: 'Wenzhangliebiao' }" index="9-1">文章列表</el-menu-item>
        </el-submenu> -->
        <el-submenu index="8">
          <template slot="title">
            <i class="el-icon-s-tools"></i>
            <span>设置</span>
          </template>
          <!-- <el-menu-item :route="{ name: 'Xiaoxiguanli' }" index="8-1">消息管理</el-menu-item> -->
          <!-- <el-menu-item :route="{ name: 'Qitashezhi' }" index="8-2">其他设置</el-menu-item> -->
          <!-- <el-menu-item :route="{ name: 'Lunbotushezhi' }" index="8-3">轮播图设置</el-menu-item>
          <el-menu-item :route="{ name: 'Lunbotuliebiao' }" index="8-4">轮播图列表</el-menu-item>
          <el-menu-item :route="{ name: 'Kaipinyeshezhi' }" index="8-5">开屏页设置</el-menu-item>
          <el-menu-item :route="{ name: 'Shujuzhongxin' }" index="8-6">数据中心</el-menu-item> -->
          <el-menu-item :route="{ name: 'Qitashezhi' }" index="8-2">其他设置</el-menu-item>
          <el-menu-item :route="{ name: 'Guojiaguanli' }" index="8-7">国家管理</el-menu-item>
          <el-menu-item :route="{ name: 'Youhuiquan' }" index="8-8">优惠券管理</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  watch: {
    $route(to) {
      console.log(to.path); //到哪去
      if (to.path == "/Shouye") {
        this.menuActiveIndex = "1-1";
        this.$store.commit("headerTit", "首页");
      } else if (to.path == "/Shangpin/Shangpinguanli") {
        this.menuActiveIndex = "2-1";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">商品管理</span>`
        );
      } else if (to.path == "/Shangpin/Tianjiashangping") {
        this.$store.commit(
          "headerTit",
          `商品 / 商品管理 / <span style="color: #515a61;
        font-weight: 700;">添加/修改商品</span>`
        );
      } else if (to.path == "/Shangpin/TianjiaShangpincangku") {
        this.$store.commit(
          "headerTit",
          `商品 / 商品管理 / <span style="color: #515a61;
        font-weight: 700;">添加/修改商品仓库</span>`
        );
      } else if (to.path == "/Shangpin/Shangpingfenlei") {
        this.menuActiveIndex = "2-2";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">商品分类</span>`
        );
      } else if (to.path == "/Shangpin/Shangpingpinglun") {
        this.menuActiveIndex = "2-3";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">商品评论</span>`
        );
      } else if (to.path == "/Shangpin/Yunfeimoban") {
        this.menuActiveIndex = "2-4";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">运费模板</span>`
        );
      } else if (to.path == "/Shangpin/Shangpincangkuguanli") {
        this.menuActiveIndex = "2-5";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">商品仓库管理</span>`
        );
      } else if (to.path == "/Shangpin/Chicunguanli") {
        this.menuActiveIndex = "2-6";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">尺寸管理</span>`
        );
      } else if (to.path == "/Shangpin/Yanseguanli") {
        this.menuActiveIndex = "2-7";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">颜色管理</span>`
        );
      } else if (to.path == "/Shangpin/Yanjingfenleiguanli") {
        this.menuActiveIndex = "2-8";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">眼镜分类管理</span>`
        );
      } else if (to.path == "/Shangpin/Tucengguanli") {
        this.menuActiveIndex = "2-9";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">涂层管理</span>`
        );
      } else if (to.path == "/Shangpin/Biaoqianguanli") {
        this.menuActiveIndex = "2-10";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">标签管理</span>`
        );
      } else if (to.path == "/Shangpin/Pianguangduguanli") {
        this.menuActiveIndex = "2-11";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">眼镜偏光率管理</span>`
        );
      } else if (to.path == "/Shangpin/Yanjingdengjifenlei") {
        this.menuActiveIndex = "2-12";
        this.$store.commit(
          "headerTit",
          `商品 / <span style="color: #515a61;
        font-weight: 700;">眼镜等级管理</span>`
        );
      } else if (to.path == "/Dingdan/Dingdanguanli") {
        this.menuActiveIndex = "3-1";
        this.$store.commit(
          "headerTit",
          `订单 / <span style="color: #515a61;
        font-weight: 700;">订单管理</span>`
        );
      } else if (to.path == "/Yingxiao/Pingtuanshangping") {
        this.menuActiveIndex = "4-1-1";
        this.$store.commit(
          "headerTit",
          `营销 / 拼团管理 / <span style="color: #515a61;
        font-weight: 700;">拼团商品</span>`
        );
      } else if (to.path == "/Yingxiao/Tianjiapingtuanshangping") {
        this.menuActiveIndex = "4-1-1";
        this.$store.commit(
          "headerTit",
          `营销 / 拼团管理 / 拼团商品 / <span style="color: #515a61;
        font-weight: 700;">添加/编辑商品</span>`
        );
      } else if (to.path == "/Yingxiao/Pingtuanliebiao") {
        this.menuActiveIndex = "4-1-2";
        this.$store.commit(
          "headerTit",
          `营销 / 拼团管理 / <span style="color: #515a61;
        font-weight: 700;">拼团列表</span>`
        );
      } else if (to.path == "/Yingxiao/Jishouliebiao") {
        this.menuActiveIndex = "4-1-3";
        this.$store.commit(
          "headerTit",
          `营销 / 拼团管理 / <span style="color: #515a61;
        font-weight: 700;">寄售列表</span>`
        );
      } else if (to.path == "/Yingxiao/Pingtuanjilu") {
        this.menuActiveIndex = "4-1-4";
        this.$store.commit(
          "headerTit",
          `营销 / 拼团管理 / <span style="color: #515a61;
        font-weight: 700;">拼团记录</span>`
        );
      } else if (to.path == "/Yingxiao/Maichanghuodong") {
        this.menuActiveIndex = "4-2-1";
        this.$store.commit(
          "headerTit",
          `营销 / 卖场活动 / <span style="color: #515a61;
        font-weight: 700;">活动列表</span>`
        );
      } else if (to.path == "/Yonghu/Yonghuguanli") {
        this.menuActiveIndex = "5-1";
        this.$store.commit(
          "headerTit",
          `用户 / <span style="color: #515a61;
        font-weight: 700;">用户管理</span>`
        );
      } else if (to.path == "/Yonghu/Lianghaoliebiao") {
        this.menuActiveIndex = "5-2";
        this.$store.commit(
          "headerTit",
          `用户 / <span style="color: #515a61;
        font-weight: 700;">靓号列表</span>`
        );
      } else if (to.path == "/Yonghu/Tixianliebiao") {
        this.menuActiveIndex = "5-3";
        this.$store.commit(
          "headerTit",
          `用户 / <span style="color: #515a61;
        font-weight: 700;">提现列表</span>`
        );
      } else if (to.path == "/Fenxiao/Fenxiaoshezhi") {
        this.menuActiveIndex = "6-1";
        this.$store.commit(
          "headerTit",
          `分销 / <span style="color: #515a61;
        font-weight: 700;">分销设置</span>`
        );
      } else if (to.path == "/Caiwu/Tixianshenqing") {
        this.menuActiveIndex = "7-1-1";
        this.$store.commit(
          "headerTit",
          `财务 / 财务操作 / <span style="color: #515a61;
        font-weight: 700;">提现申请</span>`
        );
      } else if (to.path == "/Caiwu/Yongjinjilu") {
        this.menuActiveIndex = "7-2-1";
        this.$store.commit(
          "headerTit",
          `财务 / 佣金记录 / <span style="color: #515a61;
        font-weight: 700;">佣金记录</span>`
        );
      } else if (to.path == "/Shezhi/Xiaoxiguanli") {
        this.menuActiveIndex = "8-1";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">消息管理</span>`
        );
      } else if (to.path == "/Shezhi/Qitashezhi") {
        this.menuActiveIndex = "8-2";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">其他设置</span>`
        );
      } else if (to.path == "/Shezhi/Lunbotushezhi") {
        this.menuActiveIndex = "8-3";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">轮播图设置</span>`
        );
      } else if (to.path == "/Shezhi/Lunbotuliebiao") {
        this.menuActiveIndex = "8-4";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">轮播图列表</span>`
        );
      } else if (to.path == "/Shezhi/Kaipinyeshezhi") {
        this.menuActiveIndex = "8-5";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">开屏页设置</span>`
        );
      } else if (to.path == "/Shezhi/Shujuzhongxin") {
        this.menuActiveIndex = "8-6";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">数据中心</span>`
        );
      } else if (to.path == "/Shezhi/Guojiaguanli") {
        this.menuActiveIndex = "8-7";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">国家管理</span>`
        );
      } else if (to.path == "/Shezhi/Youhuiquan") {
        this.menuActiveIndex = "8-8";
        this.$store.commit(
          "headerTit",
          `设置 / <span style="color: #515a61;
        font-weight: 700;">优惠券管理</span>`
        );
      } else if (to.path == "/Wenzhang/Wenzhangliebiao") {
        this.menuActiveIndex = "9-1";
        this.$store.commit(
          "headerTit",
          `文章 / <span style="color: #515a61;
        font-weight: 700;">文章列表</span>`
        );
      }
    }
  },
  data() {
    return {
      activeIndex: 0,
      menuActiveIndex: "",
      userInfo: null,
      isCollapse: false
    };
  },
  methods: {
    myisColl() {
      this.isCollapse = !this.isCollapse;
    },
    loginOut() {
      sessionStorage.setItem("token", null);
      sessionStorage.setItem("isLogin", null);
      this.$router.go(0);
      this.$router.push({ path: "/login" });
    }
  }
};
</script>

<style lang="scss" scoped>
.aside {
  .menu {
    /deep/ .el-menu {
      border-right: 0px;
    }
    /deep/ .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
    }
    .myisCollBtn {
      margin-top: 10px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
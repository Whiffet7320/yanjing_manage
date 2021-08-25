<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">用户管理</div>
      <div class="tit2">
        <!-- <el-tabs v-model="activeName" @tab-click="tabsHandleClick">
          <el-tab-pane label="全部" name="1"></el-tab-pane>
          <el-tab-pane label="微信公众号" name="2"></el-tab-pane>
          <el-tab-pane label="微信小程序" name="3"></el-tab-pane>
        </el-tabs>-->
      </div>
    </div>
    <div class="nav2">
      <!-- <div class="myForm">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="用户搜索：">
            <div class="search">
              <el-input
                size="small"
                placeholder="请输入内容"
                v-model="formInline.search"
                class="input-with-select"
              >
                <el-select
                  class="left-select"
                  v-model="formInline.select"
                  slot="prepend"
                  placeholder="请选择"
                >
                  <el-option label="全部" value="1"></el-option>
                  <el-option label="UID" value="2"></el-option>
                  <el-option label="手机号" value="3"></el-option>
                  <el-option label="用户名称" value="4"></el-option>
                </el-select>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button size="small" icon="el-icon-search" type="primary" @click="onSubmit"
              >搜索</el-button
            >
            <el-button size="small" @click="onReact"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </div>-->
      <div class="tit1">
        <!-- <el-button
          @click="toAddShop"
          size="small"
          type="primary"
          icon="el-icon-plus"
          >添加商品</el-button
        >-->
      </div>
      <div class="myTable">
        <vxe-table :data="tableData">
          <vxe-table-column type="expand" width="30" :fixed="null">
            <template #content="{ row }">
              <template>
                <div class="xiala">
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="item">商品分类：3C数码/手机</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="item">商品市场价格：3C数码/手机</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="item">成本价：{{ row.price }}</div>
                    </el-col>
                  </el-row>
                  <div style="margin-top: 16px"></div>
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="item">收藏：3C数码/手机</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="item">虚拟销量：3C数码/手机</div>
                    </el-col>
                  </el-row>
                </div>
              </template>
            </template>
          </vxe-table-column>
          <vxe-table-column field="user_id" title="ID"></vxe-table-column>
          <vxe-table-column field="avatar" title="头像">
            <template slot-scope="scope">
              <el-image :src="scope.row.avatar" fit="fill" style="width: 40px; height: 40px">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </vxe-table-column>
          <vxe-table-column field="nickname" title="姓名"></vxe-table-column>
          <vxe-table-column field="phone" title="手机号"></vxe-table-column>
          <vxe-table-column field="myIs_vip" title="是否会员"></vxe-table-column>
          <vxe-table-column field="now_money" title="余额"></vxe-table-column>
          <vxe-table-column title="操作状态" width="140">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" @click="seeMingxi(scope.row)" type="text">查看明细</el-button>
                <!-- <el-button size="small" @click="toEditShop(scope.row)" type="text">收益明细</el-button> -->
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
        <el-pagination
          class="fenye"
          @size-change="this.handleSizeChange"
          @current-change="this.handleCurrentChange"
          :current-page="this.yonghuguanliPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </div>
    </div>
    <!-- 查看明细 -->
    <el-dialog title="查看明细" :visible.sync="dialogVisible" width="80%" :before-close="handleClose">
      <div class="myForm">
        <el-form ref="mingxiFrom" :model="mingxiFrom" label-width="80px">
          <el-row>
            <el-col :span="20">
              <el-form-item label="拼团状态：">
                <el-radio-group v-model="mingxiFrom.rad1" size="small">
                  <el-radio-button label="1">积分明细</el-radio-button>
                  <el-radio-button label="2">收益明细</el-radio-button>
                  <el-radio-button label="3">资金余额明细</el-radio-button>
                </el-radio-group>
                <el-button
                  style="margin-left:20px"
                  size="small"
                  type="primary"
                  @click="mingxiOnSubmit"
                >查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="myTable">
        <vxe-table :data="mingxiTableData">
          <vxe-table-column field="user_id" title="ID"></vxe-table-column>
          <vxe-table-column field="myPm" title="支出/获得"></vxe-table-column>
          <vxe-table-column field="number" title="变动金额"></vxe-table-column>
          <vxe-table-column field="balance" title="变动后金额"></vxe-table-column>
          <vxe-table-column field="mark" width='250' title="备注"></vxe-table-column>
          <vxe-table-column field="pay_way" width='120' title="支付方式"></vxe-table-column>
          <vxe-table-column field="myAdd_time" title="时间"></vxe-table-column>
        </vxe-table>
        <el-pagination
          class="fenye"
          @size-change="this.handleSizeChange"
          @current-change="this.handleCurrentChange"
          :current-page="this.yonghuguanliPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.mingxiTotal"
        ></el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["yonghuguanliPage", "yonghuguanliPageSize"])
  },
  watch: {
    yonghuguanliPage: function(page) {
      this.$store.commit("yonghuguanliPage", page);
      this.getData();
    },
    yonghuguanliPageSize: function(pageSize) {
      this.$store.commit("yonghuguanliPageSize", pageSize);
      this.getData();
    }
  },
  data() {
    return {
      activeName: "1",
      formInline: {
        search: "",
        select: ""
      },
      options: [],
      tableData: [],
      total: 51,
      dialogVisible: false,
      mingxiFrom: {
        rad1: "1"
      },
      mingxiTableData: [],
      mingxiTotal: 0,
      mingxiUser_id: ""
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.userIndex({
        limit: this.yonghuguanliPageSize,
        page: this.yonghuguanliPage
      });
      console.log(res.data.data);
      this.total = res.data.total;
      this.tableData = res.data.data;
      this.tableData.forEach(ele => {
        ele.myIs_vip = ele.is_vip == "1" ? "是" : "否";
      });
      const res2 = await this.$api.categoryIndex({
        pid: 0
      });
      res2.data.forEach(ele => {
        ele.value = ele.id;
        ele.label = ele.cate_name;
        if (ele.children) {
          ele.children.forEach(item => {
            item.value = item.id;
            item.label = item.cate_name;
          });
        }
      });
      this.options = res2.data;
    },
    async getMingxiData() {
      const res = await this.$api.user_bill_log({
        user_id: this.mingxiUser_id,
        way: this.mingxiFrom.rad1
      });
      console.log(res.data);
      this.mingxiTableData = res.data.data;
      this.mingxiTableData.forEach(ele => {
        ele.myPm = ele.pm == "1" ? "获得" : "支出";
        ele.myAdd_time = this.formatDate(ele.add_time * 1000);
      });
      this.mingxiTotal = res.data.total;
    },
    tabsHandleClick(tab, event) {
      console.log(tab, event);
    },
    async seeMingxi(row) {
      this.mingxiUser_id = row.user_id;
      this.getMingxiData();
      this.dialogVisible = true;
    },
    onSubmit() {
      console.log("submit!");
    },
    mingxiOnSubmit() {
      this.getMingxiData();
    },
    onReact() {},
    handleClose() {
      this.dialogVisible = false;
    },
    formatDate(date1) {
      var date = new Date(date1);
      var YY = date.getFullYear() + "-";
      var MM =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hh =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var mm =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var ss =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return YY + MM + DD + " " + hh + mm + ss;
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("yonghuguanliPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("yonghuguanliPage", val);
    }
  }
};
</script>

<style lang="scss" scoped>
.index {
}
.nav1 {
  margin: 0 -18px;
  background-color: #fff;
  padding: 20px 32px 0 40px;
  .tit1 {
    color: #17233d;
    font-weight: 500;
    font-size: 20px;
    padding-bottom: 20px;
  }
  .tit2 {
    margin-top: 10px;
    /deep/ .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
      padding-left: 20px;
    }
    /deep/ .el-tabs__header {
      margin: 0 0 1px;
    }
  }
}
.nav2 {
  margin: 18px 0;
  background: #fff;
  border-radius: 6px;
  padding: 24px;
  .myForm {
    /deep/ .el-form-item__label {
      font-size: 12px;
    }
    /deep/ .el-form-item {
      margin-right: 30px;
      margin-bottom: 0;
    }
    .search {
      margin-top: 5px;
      /deep/ .el-select {
        width: 100px;
      }
    }
  }
  .tit1 {
    margin-top: 10px;
  }
  .myTable {
    margin-top: 10px;
    .xiala {
      padding: 10px 20px;
      .item {
        font-size: 12px;
      }
    }
    .flex {
      display: flex;
      align-items: center;
    }
    .fenye {
      margin-top: 10px;
    }
    /deep/ .vxe-table--render-default .vxe-body--column {
      line-height: 14px;
      vertical-align: middle;
    }
    /deep/ .vxe-cell--label {
      font-size: 12px;
    }
    /deep/ .vxe-cell--title {
      font-size: 12px;
    }
    /deep/ .image-slot {
      width: 38px;
      height: 38px;
      border: 1px solid #ddd;
      line-height: 38px;
      text-align: center;
      border-radius: 4px;
    }
  }
}
.myForm {
  /deep/ .el-form-item__label {
    font-size: 12px;
  }
  /deep/ .el-form-item {
    margin-right: 30px;
    margin-bottom: 0;
    vertical-align: middle;
  }
}
.myTable {
  margin-top: 10px;
  .xiala {
    padding: 10px 20px;
    .item {
      font-size: 12px;
    }
  }
  .flex {
    display: flex;
    align-items: center;
  }
  .fenye {
    margin-top: 10px;
  }
  /deep/ .vxe-table--render-default .vxe-body--column {
    line-height: 14px;
    vertical-align: middle;
  }
  /deep/ .vxe-cell--label {
    font-size: 12px;
  }
  /deep/ .vxe-cell--title {
    font-size: 12px;
  }
  /deep/ .image-slot {
    width: 38px;
    height: 38px;
    border: 1px solid #ddd;
    line-height: 38px;
    text-align: center;
    border-radius: 4px;
  }
}
</style>
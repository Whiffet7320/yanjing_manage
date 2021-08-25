<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">订单管理</div>
    </div>
    <div class="nav2">
      <el-row :gutter="10">
        <el-col :span="6"><div class="box"></div></el-col>
        <el-col :span="6"><div class="box"></div></el-col>
        <el-col :span="6"><div class="box"></div></el-col>
        <el-col :span="6"><div class="box"></div></el-col>
      </el-row>
    </div>
    <div class="nav3">
      <div class="myForm">
        <el-form ref="form" :model="form" label-width="80px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="时间选择：">
                <el-radio-group v-model="form.rad1" size="small">
                  <el-radio-button label="全部"></el-radio-button>
                  <el-radio-button label="今天"></el-radio-button>
                  <el-radio-button label="昨天"></el-radio-button>
                  <el-radio-button label="最近7天"></el-radio-button>
                  <el-radio-button label="最近30天"></el-radio-button>
                  <el-radio-button label="本月"></el-radio-button>
                  <el-radio-button label="本年"></el-radio-button>
                </el-radio-group>
                <el-date-picker
                  style="margin-left: 20px; transform: translateY(1px)"
                  size="small"
                  v-model="form.time"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="timestamp"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="提现状态：">
                <el-radio-group v-model="form.rad2" size="small">
                  <el-radio-button label="全部"></el-radio-button>
                  <el-radio-button label="未通过"></el-radio-button>
                  <el-radio-button label="申请中"></el-radio-button>
                  <el-radio-button label="已通过"></el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="提现方式：">
                <el-radio-group v-model="form.rad3" size="small">
                  <el-radio-button label="全部"></el-radio-button>
                  <el-radio-button label="微信"></el-radio-button>
                  <el-radio-button label="支付宝"></el-radio-button>
                  <el-radio-button label="银行卡"></el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="搜索：">
                <div class="search">
                  <el-input
                    size="small"
                    placeholder="请输入内容"
                    v-model="form.search"
                    class="input-with-select"
                  >
                    <el-select
                      class="left-select"
                      v-model="form.select"
                      slot="prepend"
                      placeholder="请选择"
                    >
                      <el-option label="全部" value="1"></el-option>
                      <el-option label="订单号" value="2"></el-option>
                      <el-option label="UID" value="3"></el-option>
                      <el-option label="用户名称" value="4"></el-option>
                      <el-option label="用户电话" value="5"></el-option>
                      <el-option label="商品名称" value="6"></el-option>
                    </el-select>
                    <el-button
                      @click="onSubmit"
                      slot="append"
                      icon="el-icon-search"
                    ></el-button>
                  </el-input>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="myTable">
        <vxe-table :data="tableData">
          <vxe-table-column field="name" title="订单号"></vxe-table-column>
          <vxe-table-column field="role" title="订单状态"></vxe-table-column>
          <vxe-table-column field="age" title="导入方式"></vxe-table-column>
          <vxe-table-column field="sex" title="支付时间"></vxe-table-column>
          <vxe-table-column field="address" title="包裹数"></vxe-table-column>
          <vxe-table-column field="address" title="总费用"></vxe-table-column>
          <vxe-table-column field="address" title="备注"></vxe-table-column>
          <vxe-table-column title="操作状态" width="180">
            <template slot-scope="scope">
              <div class="flex">
                <!-- 任务处理中 -->
                <div
                  v-if="scope.row.status == 3"
                  class="delBtn blue"
                  @click="del(scope.row)"
                  type="text"
                  size="small"
                >
                  可发货
                </div>
                <!-- 可发货 -->
                <div
                  v-if="scope.row.status == 4"
                  class="delBtn blue"
                  @click="del(scope.row)"
                  type="text"
                  size="small"
                >
                  发货中
                </div>
                <!-- 发货中 -->
                <div
                  v-if="scope.row.status == 5"
                  class="delBtn blue"
                  @click="del(scope.row)"
                  type="text"
                  size="small"
                >
                  发货完成
                </div>
                <div
                  class="delBtn"
                  @click="del(scope.row)"
                  type="text"
                  size="small"
                >
                  删除订单
                </div>
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
        <el-pagination
          class="fenye"
          @size-change="this.handleSizeChange"
          @current-change="this.handleCurrentChange"
          :current-page="this.dingdanliebiaoPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["dingdanliebiaoPage", "dingdanliebiaoPageSize"]),
  },
  watch: {
    dingdanliebiaoPage: function (page) {
      this.$store.commit("dingdanliebiaoPage", page);
      this.getData();
    },
    dingdanliebiaoPageSize: function (pageSize) {
      this.$store.commit("dingdanliebiaoPageSize", pageSize);
      this.getData();
    },
  },
  data() {
    return {
      activeName: "3",
      form: {
        rad1: "",
        rad2: "",
        rad3: "",
        time: [],
        search: "",
        select: "",
      },
      tableData: [],
      total: 51,
    };
  },
  methods: {
    onSubmit() {
      console.log(this.form);
    },
    tabsHandleClick(tab, event) {
      console.log(tab, event);
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("dingdanliebiaoPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("dingdanliebiaoPage", val);
    },
  },
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
}
.nav2 {
  margin-top: 20px;
  height: 110px;
  .box {
    background: #fff;
    height: 110px;
    box-shadow: 0px 0 4px 2px #dddddd !important;
  }
}
.nav3 {
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
      margin-top: 3px;
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
</style>
<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">用户提现列表</div>
    </div>
    <div class="nav2">
      <!-- <div class="myForm">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="搜索：">
            <div class="search">
              <el-input
                size="small"
                placeholder="请输入内容"
                v-model="formInline.search"
                class="input-with-select"
              >
              </el-input>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button
              size="small"
              icon="el-icon-search"
              type="primary"
              @click="onSubmit"
              >搜索</el-button
            >
            <el-button size="small" @click="onReact">重置</el-button>
          </el-form-item>
        </el-form>
      </div>-->
      <div class="myTable">
        <vxe-table :data="tableData">
          <vxe-table-column field="id" title="ID"></vxe-table-column>
          <vxe-table-column field="real_name" title="用户姓名"></vxe-table-column>
          <vxe-table-column field="myExtract_type" title="提现方式"></vxe-table-column>
          <vxe-table-column field="bank_code" title="银行卡号"></vxe-table-column>
          <vxe-table-column field="bank_address" title="银行分行地址"></vxe-table-column>
          <vxe-table-column field="alipay_code" title="支付宝账户"></vxe-table-column>
          <vxe-table-column field="wechat" title="微信号"></vxe-table-column>
          <vxe-table-column field="balance" title="提现前余额"></vxe-table-column>
          <vxe-table-column field="extract_price" title="提现金额"></vxe-table-column>
          <vxe-table-column field="mark" title="备注"></vxe-table-column>
        </vxe-table>
        <el-pagination
          class="fenye"
          @size-change="this.handleSizeChange"
          @current-change="this.handleCurrentChange"
          :current-page="this.tixianliebiaoPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["tixianliebiaoPage", "tixianliebiaoPageSize"])
  },
  watch: {
    tixianliebiaoPage: function(page) {
      this.$store.commit("tixianliebiaoPage", page);
      this.getData();
    },
    tixianliebiaoPageSize: function(pageSize) {
      this.$store.commit("tixianliebiaoPageSize", pageSize);
      this.getData();
    }
  },
  data() {
    return {
      tableData: [],
      total: 0
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.user_extract({
        limit: this.tixianliebiaoPageSize,
        page: this.tixianliebiaoPage
      });
      console.log(res.data);
      this.tableData = res.data.data;
      this.tableData.forEach(ele=>{
          if(ele.extract_type == 'bank'){
              ele.myExtract_type = '银行卡'
          }else if(ele.extract_type == 'alipay'){
              ele.myExtract_type = '支付宝'
          }else if(ele.extract_type == 'wx'){
              ele.myExtract_type = '微信'
          }
      })
      this.total = res.data.total;
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("tixianliebiaoPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("tixianliebiaoPage", val);
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
</style>
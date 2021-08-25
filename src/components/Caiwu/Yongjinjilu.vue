<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">佣金记录</div>
    </div>
    <div class="nav2">
      <div class="myForm">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="昵称/ID：">
            <el-input
              size="small"
              v-model="formInline.name"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="佣金范围：">
            <el-row :gutter="4">
              <el-col :span="11">
                <el-input
                  size="small"
                  v-model="formInline.money1"
                  placeholder="¥"
                ></el-input>
              </el-col>
              <el-col :span="1">一</el-col>
              <el-col :span="11">
                <el-input
                  size="small"
                  v-model="formInline.money2"
                  placeholder="¥"
                ></el-input>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" icon="el-icon-search" @click="onSubmit"
              >搜索</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <div class="myTable">
        <vxe-table :data="tableData">
          <vxe-table-column field="id" title="昵称/姓名"></vxe-table-column>
          <vxe-table-column field="name" title="总佣金金额"></vxe-table-column>
          <vxe-table-column field="price" title="账户余额"></vxe-table-column>
          <vxe-table-column field="sales" title="账户佣金"></vxe-table-column>
          <vxe-table-column field="stock" title="提现到账佣金"></vxe-table-column>
          <vxe-table-column title="操作" width="100">
            <template slot-scope="scope">
              <div class="flex">
                <el-button
                  size="small"
                  @click="toEditShop(scope.row)"
                  type="text"
                  >详情</el-button
                >
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
        <el-pagination
          class="fenye"
           @size-change="this.handleSizeChange"
          @current-change="this.handleCurrentChange"
          :current-page="this.pintuanShangpingliebiaoPage"
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
    ...mapState([
      "pintuanShangpingliebiaoPage",
      "pintuanShangpingliebiaoPageSize",
    ]),
  },
  watch: {
    pintuanShangpingliebiaoPage: function (page) {
      this.$store.commit("pintuanShangpingliebiaoPage", page);
      this.getData();
    },
    pintuanShangpingliebiaoPageSize: function (pageSize) {
      this.$store.commit("pintuanShangpingliebiaoPageSize", pageSize);
      this.getData();
    },
  },
  data() {
    return {
      activeName: "3",
      formInline: {
        name: "",
        money1: "",
        money2:"",
      },
      options: [],
      tableData: [],
      total: 51,
    };
  },
  methods: {
      onSubmit(){
          console.log(this.formInline)
      },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("pintuanShangpingliebiaoPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("pintuanShangpingliebiaoPage", val);
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
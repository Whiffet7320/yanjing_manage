<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">优惠券管理</div>
    </div>
    <div class="nav2">
      <div class="tit1">
        <el-button @click="toAddShop" size="small" type="primary" icon="el-icon-plus">添加优惠券</el-button>
      </div>
      <div class="myTable">
        <vxe-table :data="tableData">
          <vxe-table-column field="id" title="ID"></vxe-table-column>
          <vxe-table-column field="coupon_title" title="优惠券标题"></vxe-table-column>
          <vxe-table-column field="myType" title="类型"></vxe-table-column>
          <vxe-table-column field="use_min_price" title="满多少可用"></vxe-table-column>
          <vxe-table-column field="coupon_price" title="优惠金额"></vxe-table-column>
          <vxe-table-column field="myIs_permanent" title="是否无限量"></vxe-table-column>
          <vxe-table-column title="操作状态" width="120">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" @click="tabEdit(scope.row)" type="text">编辑</el-button>
                <el-button size="small" @click="tabDel(scope.row)" type="text">删除</el-button>
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
        <el-pagination
          class="fenye"
          @size-change="this.handleSizeChange"
          @current-change="this.handleCurrentChange"
          :current-page="this.shangpingliebiaoPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </div>
    </div>
    <!-- 编辑消息管理 -->
    <el-dialog title="编辑消息管理" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div class="xxglForm">
        <el-form :model="xxglForm" ref="xxglForm" label-width="80px" class="demo-ruleForm">
          <el-form-item label="优惠券标题" prop="coupon_title">
            <el-input size="small" v-model="xxglForm.coupon_title"></el-input>
          </el-form-item>
          <el-form-item label="满多少可用" prop="use_min_price">
            <el-input size="small" v-model="xxglForm.use_min_price"></el-input>
          </el-form-item>
          <el-form-item label="优惠金额" prop="coupon_price">
            <el-input size="small" v-model="xxglForm.coupon_price"></el-input>
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <el-radio-group v-model="xxglForm.type">
              <el-radio :label="0">通用</el-radio>
              <el-radio :label="1">品类券</el-radio>
              <el-radio :label="2">商品券</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否无限量" prop="is_permanent">
            <el-radio-group v-model="xxglForm.is_permanent">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="submitForm">确定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["shangpingliebiaoPage", "shangpingliebiaoPageSize"])
  },
  watch: {
    shangpingliebiaoPage: function(page) {
      this.$store.commit("shangpingliebiaoPage", page);
      this.getData();
    },
    shangpingliebiaoPageSize: function(pageSize) {
      this.$store.commit("shangpingliebiaoPageSize", pageSize);
      this.getData();
    }
  },
  data() {
    return {
      tableData: [],
      total: 0,
      dialogVisible: false,
      xxglForm: {
        coupon_title: "",
        coupon_price: "",
        use_min_price: "",
        is_permanent: "",
        type: ""
      },
      id: ""
    };
  },
  created() {
    this.$store.commit("shangpingliebiaoPage", 1);
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.coupon({
        page: this.shangpingliebiaoPage,
        limit: this.shangpingliebiaoPageSize
      });
      console.log(res);
      this.tableData = res.data.data;
      this.tableData.forEach(ele => {
        ele.myType =
          ele.type == 0 ? "通用" : ele.type == 1 ? "品类券" : "商品券";
        ele.myIs_permanent = ele.is_permanent == 0 ? "否" : "是";
      });
      this.total = res.data.total;
    },
    toAddShop() {
      this.isAdd = true;
      for (const key in this.xxglForm) {
        this.xxglForm[key] = "";
      }
      this.dialogVisible = true;
    },
    tabEdit(row) {
      console.log(row);
      this.isAdd = false;
      this.id = row.id;
      this.xxglForm.coupon_title = row.coupon_title;
      this.xxglForm.use_min_price = row.use_min_price;
      this.xxglForm.coupon_price = row.coupon_price;
      this.xxglForm.type = row.type;
      this.xxglForm.is_permanent = row.is_permanent;
      this.dialogVisible = true;
    },
    async tabDel(row) {
      const res = await this.$api.deletecoupon(row.id);
      if (res.code == 200) {
        this.$message({
          message: res.message,
          type: "success"
        });
        this.getData();
        this.dialogVisible = false;
      } else {
        this.$message.error(res.message);
      }
    },
    async submitForm() {
      if (this.isAdd) {
        const res = await this.$api.addcoupon({
          ...this.xxglForm
        });
        if (res.code == 200) {
          this.$message({
            message: res.message,
            type: "success"
          });
          this.getData();
          this.dialogVisible = false;
        } else {
          this.$message.error(res.message);
        }
      } else {
        const res = await this.$api.updatecoupon(
          {
            ...this.xxglForm
          },
          this.id
        );
        if (res.code == 200) {
          this.$message({
            message: res.message,
            type: "success"
          });
          this.getData();
          this.dialogVisible = false;
        } else {
          this.$message.error(res.message);
        }
      }
    },
    handleClose() {
      this.dialogVisible = false;
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("shangpingliebiaoPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("shangpingliebiaoPage", val);
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
.xxglForm {
  /deep/ .el-radio__label{
    font-size: 12px;
  }
  /deep/ .el-form-item__label {
    font-size: 12px;
  }
  /deep/ .el-form-item {
    margin-right: 30px;
    margin-bottom: 20px;
  }
  .search {
    margin-top: 3px;
    /deep/ .el-select {
      width: 100px;
    }
  }
}
</style>
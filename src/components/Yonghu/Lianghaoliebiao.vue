<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">靓号列表</div>
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
      </div> -->
      <div class="tit1">
        <el-button
          @click="toAddShop"
          size="small"
          type="primary"
          icon="el-icon-plus"
          >添加靓号</el-button
        >
      </div>
      <div class="myTable">
        <vxe-table :data="tableData">
          <vxe-table-column field="id" title="ID"></vxe-table-column>
          <vxe-table-column field="uniqid_num" title="靓号"> </vxe-table-column>
          <vxe-table-column field="myStatus" title="状态"></vxe-table-column>
          <vxe-table-column field="add_time" min-width='120' title="添加时间"></vxe-table-column>
          <vxe-table-column field="price" title="购买价格"></vxe-table-column>
          <vxe-table-column field="ot_price" title="市场价格"></vxe-table-column>
          <vxe-table-column title="操作状态" width="140">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" @click="delLh(scope.row)" type="text"
                  >删除</el-button
                >
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
        <el-pagination
          class="fenye"
          @size-change="this.handleSizeChange"
          @current-change="this.handleCurrentChange"
          :current-page="this.lianghaoliebiaoPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 添加/编辑靓号 -->
    <el-dialog
      title="添加/编辑靓号"
      :visible.sync="lhDialogVisible"
      width="30%"
      :before-close="lhHandleClose"
    >
      <div class="lhmyForm">
        <el-form
          :model="lhForm"
          :rules="rules"
          ref="lhForm"
          label-width="110px"
          class="demo-ruleForm"
        >
          <el-form-item label="靓号：" prop="uniqid_num">
            <el-input size="small" v-model="lhForm.uniqid_num"></el-input>
          </el-form-item>
          <el-form-item label="购买价格：" prop="price">
            <el-input size="small" v-model="lhForm.price"></el-input>
          </el-form-item>
          <el-form-item label="市场价格：" prop="ot_price">
            <el-input size="small" v-model="lhForm.ot_price"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="submitForm('lhForm')"
              >确定</el-button
            >
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
    ...mapState(["lianghaoliebiaoPage", "lianghaoliebiaoPageSize"]),
  },
  watch: {
    lianghaoliebiaoPage: function (page) {
      this.$store.commit("lianghaoliebiaoPage", page);
      this.getData();
    },
    lianghaoliebiaoPageSize: function (pageSize) {
      this.$store.commit("lianghaoliebiaoPageSize", pageSize);
      this.getData();
    },
  },
  data() {
    return {
      activeName: "1",
      formInline: {
        search: "",
      },
      options: [],
      tableData: [],
      total: 0,
      lhForm: {
        uniqid_num: "",
      },
      lhDialogVisible: false,
      rules: {
        uniqid_num: [
          { required: true, message: "请输入靓号", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入购买价格", trigger: "blur" }],
        ot_price: [
          { required: true, message: "请输入市场价格", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.uniqidIndex({
        limit: this.lianghaoliebiaoPageSize,
        page: this.lianghaoliebiaoPage,
        keyword: this.formInline.search,
      });
      console.log(res.data.data);
      this.total = res.data.total;
      this.tableData = res.data.data;
      this.tableData.forEach((ele) => {
        ele.myStatus = ele.status == "0" ? "未使用" : "已使用";
      });
      const res2 = await this.$api.categoryIndex({
        pid: 0,
      });
      res2.data.forEach((ele) => {
        ele.value = ele.id;
        ele.label = ele.cate_name;
        if (ele.children) {
          ele.children.forEach((item) => {
            item.value = item.id;
            item.label = item.cate_name;
          });
        }
      });
      this.options = res2.data;
    },
    async submitForm(formName) {
      console.log(formName, this.fahuoForm);
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await this.$api.uniqidAdd({
            uniqid_num: this.lhForm.uniqid_num,
            price: this.lhForm.price,
            ot_price: this.lhForm.ot_price,
          });
          console.log(res);
          if (res.code == 200) {
            this.$message({
              message: res.msg,
              type: "success",
            });
            this.getData();
            this.lhDialogVisible = false;
          } else {
            this.$message.error(res.msg);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    lhHandleClose() {
      this.lhDialogVisible = false;
    },
    async delLh(row) {
      const res = await this.$api.uniqidDel({
        id: row.id,
      });
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success",
        });
        this.getData();
      } else {
        this.$message.error(res.msg);
      }
    },
    tabsHandleClick(tab, event) {
      console.log(tab, event);
    },
    onSubmit() {
      console.log("submit!");
    },
    onReact() {},
    toAddShop() {
      this.lhDialogVisible = true;
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("lianghaoliebiaoPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("lianghaoliebiaoPage", val);
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
.lhmyForm {
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
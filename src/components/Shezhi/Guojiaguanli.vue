<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">国家管理</div>
    </div>
    <div class="nav2">
      <div class="tit1">
        <el-button @click="toAddShop" size="small" type="primary" icon="el-icon-plus">添加国家</el-button>
      </div>
      <div class="myTable">
        <vxe-table :data="tableData">
          <vxe-table-column field="id" title="ID"></vxe-table-column>
          <vxe-table-column field="country_pos" title="洲"></vxe-table-column>
          <vxe-table-column field="country_code" title="国家编码"></vxe-table-column>
          <vxe-table-column field="country_name" title="国家(中)"></vxe-table-column>
          <vxe-table-column field="country_english_name" title="国家(英)"></vxe-table-column>
          <vxe-table-column field="two_code" title="二字码"></vxe-table-column>
          <vxe-table-column field="three_code" title="三字码"></vxe-table-column>
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
          <el-form-item label="洲" prop="country_pos">
            <el-input size="small" v-model="xxglForm.country_pos"></el-input>
          </el-form-item>
          <el-form-item label="国家编码" prop="country_code">
            <el-input size="small" v-model="xxglForm.country_code"></el-input>
          </el-form-item>
          <el-form-item label="国家(中)" prop="country_name">
            <el-input size="small" v-model="xxglForm.country_name"></el-input>
          </el-form-item>
          <el-form-item label="国家(英)" prop="country_english_name">
            <el-input size="small" v-model="xxglForm.country_english_name"></el-input>
          </el-form-item>
          <el-form-item label="二字码" prop="two_code">
            <el-input size="small" v-model="xxglForm.two_code"></el-input>
          </el-form-item>
          <el-form-item label="三字码" prop="three_code">
            <el-input size="small" v-model="xxglForm.three_code"></el-input>
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
        country_pos: "",
        country_name: "",
        country_english_name: "",
        two_code: "",
        three_code: "",
        country_code: ""
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
      const res = await this.$api.country({
        page: this.shangpingliebiaoPage,
        limit: this.shangpingliebiaoPageSize
      });
      console.log(res);
      this.tableData = res.data.data;
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
      this.xxglForm.country_pos = row.country_pos;
      this.xxglForm.country_code = row.country_code;
      this.xxglForm.country_name = row.country_name;
      this.xxglForm.country_english_name = row.country_english_name;
      this.xxglForm.two_code = row.two_code;
      this.xxglForm.three_code = row.three_code;
      this.dialogVisible = true;
    },
    async tabDel(row) {
      const res = await this.$api.deletecountry(row.id);
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
        const res = await this.$api.addcountry({
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
        const res = await this.$api.updatecountry(
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
    },
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
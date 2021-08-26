<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">文章列表</div>
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
      <div class="tit1">
        <el-button @click="addWenzhang" size="small" type="primary" icon="el-icon-plus">添加文章</el-button>
      </div>
      <div class="myTable">
        <vxe-table :data="tableData">
          <vxe-table-column field="id" title="ID"></vxe-table-column>
          <vxe-table-column field="title" title="标题"></vxe-table-column>
          <vxe-table-column field="content" min-width="350" title="内容"></vxe-table-column>
          <vxe-table-column field="add_time" title="发布时间"></vxe-table-column>
          <vxe-table-column title="操作状态" width="160">
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
          :current-page="this.wenzhangliebiaoPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </div>
    </div>
    <!-- 添加/编辑靓号 -->
    <el-dialog
      title="添加/编辑文章"
      :visible.sync="lhDialogVisible"
      width="30%"
      :before-close="lhHandleClose"
    >
      <div class="lhmyForm">
        <el-form :model="lhForm" ref="lhForm" label-width="80px" class="demo-ruleForm">
          <el-form-item label="标题：">
            <el-input size="small" v-model="lhForm.title"></el-input>
          </el-form-item>
          <el-form-item label="内容：">
            <el-input size="small" v-model="lhForm.content"></el-input>
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
    ...mapState(["wenzhangliebiaoPage", "wenzhangliebiaoPageSize"])
  },
  watch: {
    wenzhangliebiaoPage: function(page) {
      this.$store.commit("wenzhangliebiaoPage", page);
      this.getData();
    },
    wenzhangliebiaoPageSize: function(pageSize) {
      this.$store.commit("wenzhangliebiaoPageSize", pageSize);
      this.getData();
    }
  },
  data() {
    return {
      tableData: [],
      total: 0,
      lhDialogVisible: false,
      lhForm: {
        title: "",
        content: ""
      },
      isAdd: true
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.article_list({
        limit: this.wenzhangliebiaoPageSize,
        page: this.wenzhangliebiaoPage
      });
      console.log(res.data);
      this.tableData = res.data.data;
      this.tableData.forEach(ele => {
        if (ele.extract_type == "bank") {
          ele.myExtract_type = "银行卡";
        } else if (ele.extract_type == "alipay") {
          ele.myExtract_type = "支付宝";
        } else if (ele.extract_type == "wx") {
          ele.myExtract_type = "微信";
        }
      });
      this.total = res.data.total;
    },
    async submitForm() {
      // 添加
      if (this.isAdd) {
        const res = await this.$api.article_add({
          ...this.lhForm
        });
        console.log(res);
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.getData();
          this.lhDialogVisible = false;
        } else {
          this.$message.error(res.msg);
        }
      } else {
        //  修改
        const res = await this.$api.article_edit({
          ...this.lhForm,
          id: this.id
        });
        console.log(res);
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.getData();
          this.lhDialogVisible = false;
        } else {
          this.$message.error(res.msg);
        }
      }
    },
    // 编辑
    tabEdit(row) {
      this.id = row.id;
      this.lhForm.title = row.title;
      this.lhForm.content = row.content;
      this.isAdd = false;
      this.lhDialogVisible = true;
    },
    // 删除
    async tabDel(row) {
      const res = await this.$api.article_del({
        id: row.id
      });
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.getData();
        this.lhDialogVisible = false;
      } else {
        this.$message.error(res.msg);
      }
    },
    addWenzhang() {
      this.lhForm = {
        title: "",
        content: ""
      };
      this.isAdd = true;
      this.lhDialogVisible = true;
    },
    lhHandleClose() {
      this.lhDialogVisible = false;
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("wenzhangliebiaoPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("wenzhangliebiaoPage", val);
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
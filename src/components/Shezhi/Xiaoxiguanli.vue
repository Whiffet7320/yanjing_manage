<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">消息管理</div>
    </div>
    <div class="nav2">
      <!-- <div class="tit1">
        <el-button @click="toAddShop" size="small" type="primary" icon="el-icon-plus">添加靓号</el-button>
      </div>-->
      <div class="myTable">
        <vxe-table :data="tableData">
          <vxe-table-column field="id" title="ID"></vxe-table-column>
          <vxe-table-column field="name" title="标题"></vxe-table-column>
          <vxe-table-column field="content" title="内容"></vxe-table-column>
          <vxe-table-column title="操作状态" width="140">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" @click="tabEdit(scope.row)" type="text">编辑</el-button>
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
    </div>
    <!-- 编辑消息管理 -->
    <el-dialog title="编辑消息管理" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div class="xxglForm">
        <el-form :model="xxglForm" ref="xxglForm" label-width="80px" class="demo-ruleForm">
          <el-form-item label="模板标题" prop="name">
            <el-input size="small" v-model="xxglForm.name"></el-input>
          </el-form-item>
          <el-form-item label="模板内容" prop="content">
            <el-input size="small" v-model="xxglForm.content"></el-input>
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
export default {
  data() {
    return {
      tableData: [],
      total: 0,
      dialogVisible: false,
      xxglForm: {
        name: "",
        content: ""
      },
      id: ""
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.template_message_list();
      console.log(res);
      this.tableData = res.data;
    },
    tabEdit(row) {
      console.log(row);
      this.id = row.id;
      this.xxglForm.name = row.name;
      this.xxglForm.content = row.content;
      this.dialogVisible = true;
    },
    async submitForm() {
      const res = await this.$api.template_message_save({
        id: this.id,
        name: this.xxglForm.name,
        content: this.xxglForm.content
      });
      console.log(res);
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success"
        });
      }
      this.getData()
      this.dialogVisible = false;
    },
    handleClose() {
      this.dialogVisible = false;
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
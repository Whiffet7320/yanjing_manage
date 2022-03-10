<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">其他设置</div>
    </div>
    <div class="nav2">
      <!-- <div class="myForm">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-row>
            <el-col :span="20">
              <el-form-item label="类型：">
                <el-radio-group @change="changeRad" v-model="formInline.rad1" size="small">
                  <el-radio-button v-for="(item,i) in radioArr" :key="i" :label="i">{{item}}</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>-->
      <!-- <div class="tit1">
        <el-button @click="addWenzhang" size="small" type="primary" icon="el-icon-plus">添加文章</el-button>
      </div>-->
      <div class="myTable">
        <vxe-table :data="tableData">
          <vxe-table-column field="id" title="ID"></vxe-table-column>
          <vxe-table-column field="name" title="名称"></vxe-table-column>
          <vxe-table-column field="value" title="内容"></vxe-table-column>
          <vxe-table-column title="操作状态" width="160">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" @click="tabEdit(scope.row)" type="text">编辑</el-button>
                <!-- <el-button size="small" @click="tabDel(scope.row)" type="text">删除</el-button> -->
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
    </div>
    <!-- 编辑设置 -->
    <el-dialog
      title="编辑设置"
      :visible.sync="addDialogVisible"
      width="400px"
      :before-close="addHandleClose"
    >
      <div class="myAddForm">
        <el-form :model="lhForm" ref="lhForm" label-width="60px" class="demo-addForm">
          <el-row>
            <el-col :span="20">
              <el-form-item label="设置名称：">
                <el-input disabled size="small" placeholder="请输入设置名称" v-model="lhForm.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="名称描述：">
                <el-input disabled size="small" placeholder="请输入名称描述" v-model="lhForm.tag"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="lhForm.tag != 'img'">
            <el-col :span="20" >
              <el-form-item label="设置值：">
                <el-input size="small" placeholder="请输入设置值" v-model="lhForm.value"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-else>
            <el-col :span="18">
              <el-form-item label="设置值：">
                <div @click="companyList" class="myImg">
                  <el-image :src="lhForm.value" fit="fill" style="width: 60px; height: 60px">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                  <div @click.stop="delImg" class="closeBtn">
                    <el-button circle>×</el-button>
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item>
                <el-button size="small" type="primary" @click="AddOnSubmit">提交</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
    <input
      type="file"
      name="companyLogo"
      id="file0"
      class="displayN"
      multiple="multiple"
      @change="companyLogo($event)"
      ref="fileInputList"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["qitashezhiliebiaoPage", "qitashezhiliebiaoPageSize"])
  },
  watch: {
    qitashezhiliebiaoPage: function(page) {
      this.$store.commit("qitashezhiliebiaoPage", page);
      this.getData();
    },
    qitashezhiliebiaoPageSize: function(pageSize) {
      this.$store.commit("qitashezhiliebiaoPageSize", pageSize);
      this.getData();
    }
  },
  data() {
    return {
      addDialogVisible: false,
      editor: null,
      tableData: [],
      total: 0,
      lhDialogVisible: false,
      lhForm: {
        key: "",
        value: "",
        desc: ""
      },
      imgFile: null,
      isAdd: true
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.webconfig_detail();
      this.tableData = res.data;
    },
    addHandleClose() {
      this.addDialogVisible = false;
    },
    async companyLogo(event) {
      var file = event.target.files[0];
      this.imgFile = new FormData();
      this.imgFile.append("image", file);
      sessionStorage.setItem("img", 123);
      const res = await this.$api.productUpload(this.imgFile);
      console.log(res);
      this.$set(this.lhForm, "value", res);
      this.$refs.fileInputList.value = "";
    },
    // 上传图片
    companyList() {
      this.$refs.fileInputList.click();
    },
    async AddOnSubmit() {
      const res = await this.$api.webconfig_update({
        value: this.lhForm.value,
        tag: this.lhForm.tag
      });
      console.log(res);
      if (res.code == 200) {
        this.$message({
          message: "修改成功",
          type: "success"
        });
        this.getData();
        this.addDialogVisible = false;
      } else {
        this.$message.error(res.msg);
      }
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
      console.log(row)
      this.id = row.id;
      this.lhForm.name = row.name;
      this.lhForm.tag = row.tag;
      this.lhForm.value = row.value;
      this.addDialogVisible = true;
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
      // this.lhDialogVisible = true;
      this.$store.commit("wenzhangObj", null);
      this.$router.push({ name: "Tianjiawenzhang" });
    },
    lhHandleClose() {
      this.lhDialogVisible = false;
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("qitashezhiliebiaoPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("qitashezhiliebiaoPage", val);
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
.myImg {
  position: relative;
  width: 60px;
  height: 60px;
  display: inline-block;
  margin-right: 12px;
  .closeBtn {
    position: absolute;
    top: -6px;
    right: -4px;
    width: 20px;
    height: 20px;
    .el-button {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  /deep/ .image-slot {
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #fafafa;
    width: 58px;
    height: 58px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .el-icon-picture-outline {
      font-size: 20px;
    }
  }
}
// 详情
.myEditor {
  padding-top: 20px;
  display: flex;
  .txt {
    color: #606266;
    width: 90px;
    font-size: 12px;
    margin-right: 12px;
    margin-top: 2px;
    text-align: right;
  }
  #editor {
    transform: translateY(-6px);
  }
}
.myAddForm {
  /deep/ .el-select {
    width: 100%;
  }
  /deep/ .el-form-item__label {
    font-size: 12px;
    width: 100px !important;
  }
  /deep/ .el-form-item__content {
    margin-left: 100px !important;
  }
  /deep/ .el-radio__label {
    font-size: 12px;
  }
  /deep/ .el-button {
    width: 100%;
  }
}
.displayN {
  display: none;
}
</style>
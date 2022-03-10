<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">眼镜分类管理</div>
    </div>
    <div class="nav2">
      <div class="tit1">
        <el-button @click="toAddShop" size="small" type="primary" icon="el-icon-plus">添加眼镜分类</el-button>
      </div>
      <div class="myTable">
        <vxe-table :data="tableData">
          <vxe-table-column field="id" title="ID"></vxe-table-column>
          <vxe-table-column field="productlevelinfo.level_name" title="眼镜等级"></vxe-table-column>
          <vxe-table-column field="type_name" title="眼镜分类名称"></vxe-table-column>
          <vxe-table-column field="type_price" title="眼镜分类价格"></vxe-table-column>
          <vxe-table-column field="type_desc" title="眼镜分类描述"></vxe-table-column>
          <vxe-table-column title="操作状态" width="120">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" @click="toEditShop(scope.row)" type="text">编辑</el-button>
                <el-button size="small" @click="toDelShop(scope.row)" type="text">删除</el-button>
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
    <!-- 添加/编辑眼镜分类 -->
    <el-dialog
      title="添加/编辑眼镜分类"
      :visible.sync="addDialogVisible"
      width="700px"
      :before-close="addHandleClose"
    >
      <div class="myAddForm">
        <el-form :model="addForm" ref="addForm" label-width="140px" class="demo-addForm">
          <el-row>
            <el-col :span="20">
              <el-form-item label="眼镜等级">
                <el-select size='small' v-model="addForm.level_id" placeholder="请选择">
                  <el-option
                    v-for="item in dengjiList"
                    :key="item.id"
                    :label="item.level_name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="眼镜分类名称">
                <el-input size="small" placeholder="请输入眼镜分类名称" v-model="addForm.type_name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="眼镜分类价格">
                <el-input size="small" placeholder="请输入眼镜分类价格" v-model="addForm.type_price"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="眼镜分类描述">
                <el-input
                  size="small"
                  type="textarea"
                  placeholder="请输入眼镜分类描述"
                  v-model="addForm.type_desc"
                ></el-input>
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
      activeName: "3",
      formInline: {
        user: "",
        region: ""
      },
      options: [],
      tableData: [],
      total: 0,
      isAdd: true,
      addForm: {
        type_name: "",
        type_price: "",
        type_desc: ""
      },
      id: "",
      addDialogVisible: false,
      dengjiList:[],
    };
  },
  created() {
    this.$store.commit("shangpingliebiaoPage", 1);
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.product_type({
        limit: this.shangpingliebiaoPageSize,
        page: this.shangpingliebiaoPage
      });

      console.log(res.data.data);
      this.total = res.data.total;
      this.tableData = res.data.data;
      // this.tableData.forEach((ele) => {
      //   ele.is_showKG = ele.is_show == "1" ? true : false;
      // });
      const res2 = await this.$api.productlevel({limit:1000,page:1})
      this.dengjiList = res2.data.data;
    },
    addHandleClose() {
      this.addDialogVisible = false;
    },
    // 开关（上架/下架）
    async changeKG(row) {
      console.log(row);
      const res = await this.$api.productShow({
        id: row.id,
        show: row.is_showKG == true ? "1" : "0"
      });
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.getData();
      }
    },
    toEditShop(row) {
      console.log(row);
      this.id = row.id;
      this.isAdd = false;
      this.addDialogVisible = true;
      this.addForm = { ...row };
    },
    async toDelShop(row) {
      console.log(row);
      const res = await this.$api.deleteProduct_type(row.id);
      if (res.code == 200) {
        this.$message({
          message: res.message,
          type: "success"
        });
        setTimeout(() => {
          this.getData();
        }, 500);
      } else {
        this.$message.error(res.message);
      }
    },
    tabsHandleClick(tab, event) {
      console.log(tab, event);
    },
    onSubmit() {
      console.log("submit!");
    },
    async AddOnSubmit() {
      if (this.isAdd) {
        const res = await this.$api.addProduct_type({
          type_name: this.addForm.type_name,
          type_price: this.addForm.type_price,
          type_desc: this.addForm.type_desc,
          level_id:this.addForm.level_id,
        });
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.addDialogVisible = false;
          this.getData();
        }
      } else {
        const res = await this.$api.updateProduct_type(
          {
            type_name: this.addForm.type_name,
            type_price: this.addForm.type_price,
            type_desc: this.addForm.type_desc,
            level_id:this.addForm.level_id,
          },
          this.id
        );
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          this.addDialogVisible = false;
          this.getData();
        }
      }
    },
    toAddShop() {
      this.isAdd = true;
      for (const key in this.addForm) {
        this.$set(this.addForm, key, "");
      }
      this.addDialogVisible = true;
    },
    // 删除图片
    delImg(val) {
      if (val == "tb") {
        this.$set(this.addForm, "pic", "");
      } else if (this.imgStatus == "dt") {
        this.$set(this.addForm, "big_pic", "");
      }
    },
    // 上传图片
    companyList(val) {
      this.imgStatus = val;
      this.$refs.fileInputList.click();
    },
    async companyLogo(event) {
      const that = this;
      var file = event.target.files[0];
      var fileSize = file.size; //文件大小
      var filetType = file.type; //文件类型
      //创建文件读取对象
      // console.log(file);
      if (fileSize <= 10240 * 1024) {
        if (
          filetType == "image/png" ||
          filetType == "image/jpeg" ||
          filetType == "image/gif"
        ) {
          this.imgFile = new FormData();
          this.imgFile.append("image", file);
          sessionStorage.setItem("img", 123);
          const res = await that.$api.upload_pic(this.imgFile);
          console.log(`${this.$url}${res.data.path}`);
          this.$set(this.addForm, "color_img", `${this.$url}${res.data.path}`);
          that.$refs.fileInputList.value = "";
        } else {
          this.$message.error("图片格式不正确");
        }
      } else {
        this.$message.error("图片大小不正确");
      }
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
.myAddForm {
  /deep/ .el-select {
    width: 100%;
  }
  /deep/ .el-form-item__label {
    font-size: 12px;
    width: 130px !important;
  }
  /deep/ .el-form-item__content {
    margin-left: 130px !important;
  }
  /deep/ .el-radio__label {
    font-size: 12px;
  }
  /deep/ .el-button {
    width: 100%;
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
}
</style>
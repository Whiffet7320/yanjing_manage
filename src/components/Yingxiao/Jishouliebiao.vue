<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">寄售列表</div>
    </div>
    <div class="nav2">
      <!-- <div class="myForm">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="商品分类：">
            <el-cascader
              size="small"
              :options="options"
              :props="{ checkStrictly: true }"
              clearable
            ></el-cascader>
          </el-form-item>
          <el-form-item label="商品搜索：">
            <el-input
              size="small"
              v-model="formInline.user"
              placeholder="商品搜索"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="onSubmit"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </div> -->
      <div class="myTable">
        <vxe-table :data="tableData">
          <vxe-table-column field="id" title="商品ID"></vxe-table-column>
          <vxe-table-column field="role" title="商品图">
            <template slot-scope="scope">
              <el-image
                :src="scope.row.image"
                fit="fill"
                style="width: 40px; height: 40px"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </vxe-table-column>
          <vxe-table-column
            field="name"
            title="商品名称"
            min-width="200"
          ></vxe-table-column>
          <vxe-table-column field="price" title="商品售价"></vxe-table-column>
          <vxe-table-column field="num" title="数量"></vxe-table-column>
          <vxe-table-column field="myStatus" title="状态"> </vxe-table-column>
          <vxe-table-column title="操作状态" width="100">
            <template slot-scope="scope">
              <div class="flex">
                <el-button :disabled="scope.row.status != 1" size="small" @click="ty(scope.row)" type="text"
                  >同意</el-button
                >
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
        <el-pagination
          class="fenye"
          @size-change="this.handleSizeChange"
          @current-change="this.handleCurrentChange"
          :current-page="this.jishouliebiaoPage"
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
    ...mapState(["jishouliebiaoPage", "jishouliebiaoPageSize"]),
  },
  watch: {
    jishouliebiaoPage: function (page) {
      this.$store.commit("jishouliebiaoPage", page);
      this.getData();
    },
    jishouliebiaoPageSize: function (pageSize) {
      this.$store.commit("jishouliebiaoPageSize", pageSize);
      this.getData();
    },
  },
  data() {
    return {
      activeName: "3",
      formInline: {
        user: "",
        region: "",
      },
      options: [],
      tableData: [],
      total: 51,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.sell_order_list({
        limit: this.jishouliebiaoPageSize,
        page: this.jishouliebiaoPage,
      });
      console.log(res.data.data);
      this.total = res.data.total;
      this.tableData = res.data.data;
      this.tableData.forEach((ele) => {
        if (ele.status == 0) {
          ele.myStatus = "无";
        } else if (ele.status == 1) {
          ele.myStatus = "申请寄售";
        } else if (ele.status == 2) {
          ele.myStatus = "同意寄售";
        } else if (ele.status == 3) {
          ele.myStatus = "发货";
        }
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
    async ty(row) {
      const res = await this.$api.confirm_sell_order({
        id: row.id,
      });
      console.log(res);
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success",
        });
        this.getData()
      }
    },
    onSubmit() {
      console.log("submit!");
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("jishouliebiaoPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("jishouliebiaoPage", val);
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
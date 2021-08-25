<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">商品评论</div>
    </div>
    <div class="nav3">
      <div class="myForm">
        <el-form ref="form" :model="form" label-width="80px">
          <el-row>
            <el-col :span="24">
              <el-form-item label="时间选择：">
                <el-radio-group v-model="form.rad1" size="small">
                  <el-radio-button label="全部"></el-radio-button>
                  <el-radio-button label="今天"></el-radio-button>
                  <el-radio-button label="昨天"></el-radio-button>
                  <el-radio-button label="最近7天"></el-radio-button>
                  <el-radio-button label="最近30天"></el-radio-button>
                  <el-radio-button label="本月"></el-radio-button>
                  <el-radio-button label="本年"></el-radio-button>
                </el-radio-group>
                <el-date-picker
                  style="margin-left: 20px; transform: translateY(1px)"
                  size="small"
                  v-model="form.time"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="timestamp"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row style="margin-top: 6px">
            <el-col :span="8">
              <el-form-item size="small" label="评价状态：">
                <el-select v-model="form.status" placeholder="状态">
                  <el-option label="全部" value="0"></el-option>
                  <el-option label="已回复" value="1"></el-option>
                  <el-option label="未回复" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item size="small" label="用户名称：">
                <el-input
                  v-model="form.keyword"
                  placeholder="请输入"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-form-item>
              <el-button
                style="transform: translateY(-4px)"
                size="small"
                type="primary"
                @click="searchOnSubmit"
                >查询</el-button
              >
            </el-form-item>
          </el-row>
        </el-form>
      </div>
      <div class="myTable">
        <vxe-table :data="tableData">
          <vxe-table-column field="name" title="评论ID"></vxe-table-column>
          <vxe-table-column field="role" title="商品信息"></vxe-table-column>
          <vxe-table-column field="age" title="用户名称"></vxe-table-column>
          <vxe-table-column field="sex" title="评分"></vxe-table-column>
          <vxe-table-column field="address" title="评价内容"></vxe-table-column>
          <vxe-table-column field="address" title="回复内容"></vxe-table-column>
          <vxe-table-column field="address" title="评价时间"></vxe-table-column>
          <vxe-table-column title="操作状态" width="180">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" type="text" @click="onChat(scope.row)"
                  >回复</el-button
                >
                <el-button size="small" type="text" @click="tabDel(scope.row)"
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
          :current-page="this.shangpingpinglunPage"
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
    ...mapState(["shangpingpinglunPage", "shangpingpinglunPageSize"]),
  },
  watch: {
    shangpingpinglunPage: function (page) {
      this.$store.commit("shangpingpinglunPage", page);
      this.getData();
    },
    shangpingpinglunPageSize: function (pageSize) {
      this.$store.commit("shangpingpinglunPageSize", pageSize);
      this.getData();
    },
  },
  data() {
    return {
      activeName: "3",
      form: {
        rad1: "",
        time: [],
        status: "",
        keyword: "",
      },
      tableData: [],
      total: 0,
    };
  },
  methods: {
    searchOnSubmit() {
      console.log(this.form);
    },
    onChat(row) {
      console.log(row);
    },
    tabDel(row) {
      console.log(row);
    },
    tabsHandleClick(tab, event) {
      console.log(tab, event);
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("shangpingpinglunPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("shangpingpinglunPage", val);
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
  margin-top: 20px;
  height: 110px;
  .box {
    background: #fff;
    height: 110px;
    box-shadow: 0px 0 4px 2px #dddddd !important;
  }
}
.nav3 {
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
      margin-top: 3px;
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
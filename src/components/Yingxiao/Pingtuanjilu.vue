<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">拼团记录</div>
    </div>
        <div class="top">
      <div class="box"> 
        <div class="icon1">
          <div class="icon2">
            <i class="el-icon-s-order"></i>
          </div>
        </div>
        <div class="tit">
          <div class="txt1">{{all_count}}</div>
          <div class="txt2">总次数</div>
        </div>
      </div>
      <div class="box">
        <div class="icon1 i1-2">
          <div class="icon2 i1-2">
            <i class="el-icon-s-claim"></i>
          </div>
        </div>
        <div class="tit">
          <div class="txt1">{{kaituan_count}}</div>
          <div class="txt2">开团次数</div>
        </div>
      </div>
      <div class="box">
        <div class="icon1 i1-3">
          <div class="icon2 i1-3">
            <i class="el-icon-s-release"></i>
          </div>
        </div>
        <div class="tit">
          <div class="txt1">{{pintuan_count}}</div>
          <div class="txt2">拼团次数</div>
        </div>
      </div>
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
      <div class="myTable">
        <vxe-table :data="tableData">
          <vxe-table-column field="user_id" title="用户ID"></vxe-table-column>
          <vxe-table-column field="trade_no" title="拼团订单号"></vxe-table-column>
          <vxe-table-column field="nickname" title="用户昵称"></vxe-table-column>
          <vxe-table-column field="avatar" title="用户头像">
            <template slot-scope="scope">
              <el-image :src="scope.row.avatar" fit="fill" style="width: 40px; height: 40px">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </vxe-table-column>
          <vxe-table-column field="total_num" title="数量"></vxe-table-column>
          <vxe-table-column field="total_price" title="总价格"></vxe-table-column>
          <vxe-table-column field="price" title="拼团商品单价"></vxe-table-column>
          <vxe-table-column field="mystatus" title="状态"></vxe-table-column>
        </vxe-table>
        <el-pagination
          class="fenye"
          @size-change="this.handleSizeChange"
          @current-change="this.handleCurrentChange"
          :current-page="this.pingtuanjiluPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["pingtuanjiluPage", "pingtuanjiluPageSize"])
  },
  watch: {
    pingtuanjiluPage: function(page) {
      this.$store.commit("pingtuanjiluPage", page);
      this.getData();
    },
    pingtuanjiluPageSize: function(pageSize) {
      this.$store.commit("pingtuanjiluPageSize", pageSize);
      this.getData();
    }
  },
  data() {
    return {
      tableData: [],
      total: 0,
      userId: null,
      all_count:'',
      kaituan_count:'',
      pintuan_count:'',
    };
  },
  created() {
    this.userId = this.$route.params.userId;
    if(!this.userId){
        this.$router.push({name:'Yonghuguanli'})
    }
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.user_pintuan_log({
        user_id: this.userId,
        limit: this.pingtuanjiluPageSize,
        page: this.pingtuanjiluPage
      });
      const res2 = await this.$api.user_pintuan_count({
          user_id: this.userId
      })
      console.log(res2)
      this.all_count = res2.data.all_count;
      this.kaituan_count = res2.data.kaituan_count;
      this.pintuan_count = res2.data.pintuan_count;
      this.tableData = res.data.data;
      this.tableData.forEach(ele => {
        if (ele.status == 1) {
          ele.mystatus = "进行中";
        } else if (ele.status == 2) {
          ele.mystatus = "已完成";
        } else if (ele.status == 3) {
          ele.mystatus = "未成团";
        } else if (ele.status == 4) {
          ele.mystatus = "拼团失败";
        }
      });
      this.total = res.data.total;
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("pingtuanjiluPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("pingtuanjiluPage", val);
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
.top {
  width: 100%;
  display: flex;
  align-items: center;
  margin: 16px 0 20px 0;
  height: 120px;
  .box {
    &:nth-child(3) {
      margin-right: 0px;
    }
    border-radius: 10px;
    height: 100%;
    width: 33.3%;
    background: #ffffff;
    margin-right: 16px;
    display: flex;
    align-items: center;
    padding: 0 25px;
    .icon1.i1-2 {
      background: #fff3e0;
      .icon2.i1-2 {
        background: #ffab2b;
      }
    }
    .icon1.i1-3 {
      background: #eaf9e1;
      .icon2.i1-3 {
        background: #6dd230;
      }
    }
    .icon1 {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #e4ecff;
      .icon2 {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: #4d7cfe;
        .el-icon-s-order {
          font-size: 26px;
          color: #ffffff;
        }
        .el-icon-s-release{
            font-size: 26px;
          color: #ffffff;
        }
        .el-icon-s-claim{
            font-size: 26px;
          color: #ffffff;
        }
      }
    }
    .tit {
      margin-left: 30px;
      height: 50px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .txt1 {
        color: rgb(37, 38, 49);
        font-size: 24px;
      }
      .txt2 {
        color: rgb(152, 169, 188);
        font-size: 12px;
      }
    }
  }
}
</style>
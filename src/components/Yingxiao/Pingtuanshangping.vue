<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">拼团商品</div>
    </div>
    <div class="nav2">
      <!-- <div class="myForm">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="拼团状态：">
            <el-select
              size="small"
              v-model="formInline.status"
              placeholder="请选择"
            >
              <el-option label="开启" value="1"></el-option>
              <el-option label="关闭" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商品搜索：">
            <el-input
              size="small"
              v-model="formInline.name"
              placeholder="商品搜索"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="onSubmit"
              >查询</el-button
            >
            <el-button size="small" @click="onResult"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </div> -->
      <div class="tit1">
        <el-button
          @click="toAddShop"
          size="small"
          type="primary"
          icon="el-icon-plus"
          >添加拼团商品</el-button
        >
      </div>
      <div class="myTable">
        <vxe-table :data="tableData">
          <vxe-table-column type="expand" width="30" :fixed="null">
            <template #content="{ row }">
              <template>
                <div class="xiala">
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="item">热门单品：{{row.is_hot == 1 ? '开启' : '关闭'}}</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="item">新人专享：{{row.is_new_user == 1 ? '开启' : '关闭'}}</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="item">一分购买：{{ row.is_cheap == 1 ? '开启' : '关闭' }}</div>
                    </el-col>
                  </el-row>
                  <div style="margin-top: 16px"></div>
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="item">额外赠送积分：{{ row.give_integral }}</div>
                    </el-col>
                  </el-row>
                </div>
              </template>
            </template>
          </vxe-table-column>
          <vxe-table-column field="id" min-width="50" title="商品ID"></vxe-table-column>
          <vxe-table-column field="role" min-width="50" title="商品图">
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
          <vxe-table-column field="name" min-width="140" title="商品名称"></vxe-table-column>
          <vxe-table-column field="price" min-width="50" title="商品售价"></vxe-table-column>
          <vxe-table-column field="sales" min-width="30" title="销量"></vxe-table-column>
          <vxe-table-column field="stock" min-width="30" title="库存"></vxe-table-column>
          <vxe-table-column field="sort" min-width="30" title="排序"></vxe-table-column>
          <vxe-table-column field="is_show" min-width="60" title="状态(是否上架)">
            <template slot-scope="scope">
              <el-switch
                @change="changeKG(scope.row)"
                v-model="scope.row.is_showKG"
              >
              </el-switch>
            </template>
          </vxe-table-column>
          <vxe-table-column title="操作状态" width="180">
            <template slot-scope="scope">
              <div class="flex">
                <el-button
                  size="small"
                  @click="toEditShop(scope.row)"
                  type="text"
                  >编辑</el-button
                >
                <el-button
                  size="small"
                  @click="toEditShop(scope.row)"
                  type="text"
                  >查看评论</el-button
                >
                <el-button
                  size="small"
                  @click="toEditShop(scope.row)"
                  type="text"
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
          :current-page="this.pintuanShangpingliebiaoPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total, sizes,prev, pager, next, jumper"
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
    ...mapState([
      "pintuanShangpingliebiaoPage",
      "pintuanShangpingliebiaoPageSize",
    ]),
  },
  watch: {
    pintuanShangpingliebiaoPage: function (page) {
      this.$store.commit("pintuanShangpingliebiaoPage", page);
      this.getData();
    },
    pintuanShangpingliebiaoPageSize: function (pageSize) {
      this.$store.commit("pintuanShangpingliebiaoPageSize", pageSize);
      this.getData();
    },
  },
  data() {
    return {
      activeName: "3",
      formInline: {
        name: "",
        status: "",
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
      const res = await this.$api.combinationList({
        limit: this.pintuanShangpingliebiaoPageSize,
        page: this.pintuanShangpingliebiaoPage,
        keyword:this.formInline.name,
      });
      console.log(res.data.data);
      this.total = res.data.total;
      this.tableData = res.data.data;
      this.tableData.forEach((ele) => {
        ele.is_showKG = ele.is_show == "1" ? true : false;
      });
    },
    async changeKG(row) {
      const res = await this.$api.combinationShow({
        id: row.id,
        show: row.is_showKG == true ? "1" : "0",
      });
      console.log(res);
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success",
        });
        this.getData();
      }
    },
    toEditShop(row) {
      console.log(row);
      this.$store.commit("pintuanShopObj", row);
      this.$router.push({ name: "Tianjiapingtuanshangping" });
    },
    onSubmit() {
      this.getData()
    },
    onResult(){
      this.formInline.name = '';
      this.formInline.status = '';
      this.$store.commit("pintuanShangpingliebiaoPage", 1);
      this.getData()
    },
    toAddShop() {
      this.$store.commit("pintuanShopObj", null);
      this.$router.push({ name: "Tianjiapingtuanshangping" });
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("pintuanShangpingliebiaoPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("pintuanShangpingliebiaoPage", val);
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
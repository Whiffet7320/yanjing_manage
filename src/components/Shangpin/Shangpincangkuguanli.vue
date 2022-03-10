<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">商品仓库管理</div>
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
      </div>-->
      <div class="tit1">
        <el-button @click="toAddShop" size="small" type="primary" icon="el-icon-plus">添加商品仓库</el-button>
      </div>
      <div class="myTable">
        <vxe-table :data="tableData">
          <vxe-table-column type="expand" width="30" :fixed="null">
            <template #content="{ row }">
              <template>
                <div class="xiala">
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="item">边框：{{ row.rim }}</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="item">外形：{{row.shape}}</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="item">特色：{{ row.feature }}</div>
                    </el-col>
                  </el-row>
                  <div style="margin-top: 16px"></div>
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="item">镜框总长：{{row.frame_width}}</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="item">单镜框宽度：{{row.lens_width}}</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="item">镜架距离：{{row.bridge}}</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="item">眼镜腿长：{{row.temple_length}}</div>
                    </el-col>
                  </el-row>
                  <div style="margin-top: 16px"></div>
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="item">单镜高度：{{row.lens_height}}</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="item">镜框重量：{{row.frame_weight}}</div>
                    </el-col>
                    <el-col :span="10">
                      <div class="item">描述：{{row.description}}</div>
                    </el-col>
                  </el-row>
                </div>
                <div class="shopList">
                  <vxe-table :data="row.product_list">
                    <vxe-table-column field="id" title="商品ID"></vxe-table-column>
                    <vxe-table-column field="product_num" title="商品编号"></vxe-table-column>
                    <vxe-table-column field="product_name" title="商品名称"></vxe-table-column>
                    <vxe-table-column field="product_img" title="商品图">
                      <template slot-scope="scope">
                        <el-image
                          :src="scope.row.product_img"
                          fit="fill"
                          style="width: 40px; height: 40px"
                        >
                          <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                          </div>
                        </el-image>
                      </template>
                    </vxe-table-column>
                    <vxe-table-column field="product_price" title="商品价格"></vxe-table-column>
                    <vxe-table-column field="color_name" title="颜色"></vxe-table-column>
                  </vxe-table>
                </div>
              </template>
            </template>
          </vxe-table-column>
          <vxe-table-column field="id" title="仓库ID"></vxe-table-column>
          <vxe-table-column field="store_num" title="商品编号"></vxe-table-column>
          <vxe-table-column field="role" title="商品图">
            <template slot-scope="scope">
              <el-image :src="scope.row.product_img" fit="fill" style="width: 40px; height: 40px">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </vxe-table-column>
          <vxe-table-column field="product_price" title="商品最低价格"></vxe-table-column>
          <vxe-table-column field="pd_range" title="度数范围"></vxe-table-column>
          <vxe-table-column field="prescription_range" title="处方范围"></vxe-table-column>
          <vxe-table-column field="progressive_or_bifocal" title="双焦/渐进"></vxe-table-column>
          <vxe-table-column field="readers" title="阅读"></vxe-table-column>
          <vxe-table-column title="操作状态" width="120">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" @click="toEditShop(scope.row)" type="text">编辑</el-button>
                <!-- <el-button
                  size="small"
                  @click="toEditShop(scope.row)"
                  type="text"
                  >查看评论</el-button
                >-->
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
      total: 0
    };
  },
  created() {
    this.$store.commit("shangpingliebiaoPage", 1);
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.productstorehouse({
        limit: this.shangpingliebiaoPageSize,
        page: this.shangpingliebiaoPage
      });
      console.log(res.data.data);
      this.total = res.data.total;
      this.tableData = res.data.data;
      this.tableData.forEach(ele => {
        ele.is_showKG = ele.is_show == "1" ? true : false;
      });
      // const res2 = await this.$api.categoryIndex({
      //   pid: 0,
      // });
      // res2.data.forEach((ele) => {
      //   ele.value = ele.id;
      //   ele.label = ele.cate_name;
      //   if (ele.children) {
      //     ele.children.forEach((item) => {
      //       item.value = item.id;
      //       item.label = item.cate_name;
      //     });
      //   }
      // });
      // this.options = res2.data;
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
    async toDelShop(row) {
      const res = await this.$api.deleteProductstorehouse(row.id);
      if (res.code == 200) {
        this.$message({
          message: res.message,
          type: "success"
        });
        this.getData();
      }
    },
    toEditShop(row) {
      console.log(row);
      this.$store.commit("shopObj", row);
      this.$router.push({ name: "TianjiaShangpincangku" });
    },
    tabsHandleClick(tab, event) {
      console.log(tab, event);
    },
    onSubmit() {
      console.log("submit!");
    },
    toAddShop() {
      this.$store.commit("shopObj", null);
      this.$router.push({ name: "TianjiaShangpincangku" });
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
</style>
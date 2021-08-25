<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">拼团列表</div>
    </div>
    <div class="nav3">
      <!-- <div class="myForm">
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
                 style="margin-left:20px;transform: translateY(1px);"
                  size="small"
                  v-model="form.time"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="拼团状态：">
                <el-radio-group v-model="form.rad2" size="small">
                  <el-radio-button label="进行中"></el-radio-button>
                  <el-radio-button label="已完成"></el-radio-button>
                  <el-radio-button label="未完成"></el-radio-button>
                </el-radio-group>
                <el-button style="margin-left:20px" size="small" type="primary" @click="onSubmit"
                  >查询</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div> -->
      <div class="tit1">
        <el-button
          @click="AddZhuti"
          size="small"
          type="primary"
          icon="el-icon-plus"
          >添加拼团主题</el-button
        >
      </div>
      <div class="myTable">
        <vxe-table :tree-config="{ children: 'category' }" :data="tableData">
          <vxe-table-column field="id" title="ID"></vxe-table-column>
          <vxe-table-column field="title" title="主题标题"></vxe-table-column>
          <vxe-table-column field="tag" title="标识"></vxe-table-column>
          <vxe-table-column field="money" title="价格"></vxe-table-column>
          <vxe-table-column
            field="add_time"
            title="开团时间"
          ></vxe-table-column>
          <vxe-table-column
            field="category_name"
            title="下属分类"
            tree-node
          ></vxe-table-column>
          <vxe-table-column title="操作状态" width="200">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.category"
                size="small"
                @click="editZhuti(scope.row)"
                type="text"
                >编辑</el-button
              >
              <el-button
                v-if="scope.row.category"
                size="small"
                @click="addZhutiFenlei(scope.row)"
                type="text"
                >添加分类</el-button
              >
              <el-button
                v-if="!scope.row.category"
                size="small"
                @click="addShop(scope.row)"
                type="text"
                >添加商品</el-button
              >
              <el-button v-if="!scope.row.category" size="small" type="text" @click="seeShop(scope.row)"
                >查看商品</el-button
              >
              <template>
                <el-button
                  v-if="scope.row.category"
                  size="small"
                  @click="delZhuti(scope.row)"
                  type="text"
                  >删除</el-button
                >
                <el-button
                  v-else
                  size="small"
                  @click="delZhutiFenlei(scope.row)"
                  type="text"
                  >删除</el-button
                >
              </template>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
    </div>
    <!-- 添加拼团主题 -->
    <el-dialog
      title="添加拼团主题"
      :visible.sync="addDialogVisible"
      width="700px"
      :before-close="addHandleClose"
    >
      <div class="myAddForm">
        <el-form
          :model="addForm"
          :rules="rules"
          ref="addForm"
          label-width="100px"
          class="demo-addForm"
        >
          <el-row>
            <el-col :span="20">
              <el-form-item label="主题名称" prop="add_name">
                <el-input
                  size="small"
                  placeholder="请输入主题名称"
                  v-model="addForm.add_name"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="标识" prop="tag">
                <el-input
                  size="small"
                  placeholder="请输入标识"
                  v-model="addForm.tag"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="价格" prop="money">
                <el-input
                  size="small"
                  placeholder="请输入价格"
                  v-model="addForm.money"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item>
                <el-button
                  size="small"
                  type="primary"
                  @click="AddOnSubmit('addForm')"
                  >提交</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
    <!-- 添加主题分类 -->
    <el-dialog
      title="添加主题分类"
      :visible.sync="addfenleiDialogVisible"
      width="1000px"
      :before-close="addfenleiHandleClose"
    >
      <div class="myForm">
        <el-form :inline="true" :model="searchAddForm" class="demo-form-inline">
          <el-form-item show-overflow="title" size="small" label="分类名称：">
            <el-input
              v-model="searchAddForm.keyword"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="searchAddOnSubmit"
              >查询</el-button
            >
            <el-button size="small" @click="searchAddOnResult">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="myTable">
        <vxe-table
          @checkbox-all="selectAllEvent"
          @checkbox-change="selectChangeEvent"
          :tree-config="{
            children: 'children',
          }"
          align="center"
          :data="tableData1"
        >
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column field="id" title="ID"></vxe-table-column>
          <vxe-table-column
            tree-node
            field="cate_name"
            title="分类名称"
          ></vxe-table-column>
          <vxe-table-column field="pic" title="分类图标">
            <template slot-scope="scope">
              <el-image
                :src="scope.row.pic"
                fit="fill"
                style="width: 40px; height: 40px"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </template>
          </vxe-table-column>
        </vxe-table>
        <!-- <el-pagination
          class="fenye"
          @current-change="this.handleCurrentChange1"
          :current-page="this.pingtuanliebiaoPage"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="this.total1"
        >
        </el-pagination> -->
      </div>
    </el-dialog>
    <!-- 添加拼团商品 -->
    <el-dialog
      title="添加拼团商品"
      :visible.sync="addshopDialogVisible"
      width="1000px"
      :before-close="addshopHandleClose"
    >
      <div class="myForm">
        <el-form :inline="true" :model="searchAddForm" class="demo-form-inline">
          <el-form-item show-overflow="title" size="small" label="商品名称：">
            <el-input
              v-model="searchAddForm.keyword"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="searchAddOnSubmit"
              >查询</el-button
            >
            <el-button size="small" @click="searchAddOnResult">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="myTable">
        <vxe-table
          :data="tableData2"
          @checkbox-all="selectAllEvent2"
          @checkbox-change="selectChangeEvent2"
        >
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column type="expand" width="30" :fixed="null">
            <template #content="{ row }">
              <template>
                <div class="xiala">
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="item">商品分类：3C数码/手机</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="item">商品市场价格：3C数码/手机</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="item">成本价：{{ row.price }}</div>
                    </el-col>
                  </el-row>
                  <div style="margin-top: 16px"></div>
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="item">收藏：3C数码/手机</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="item">虚拟销量：3C数码/手机</div>
                    </el-col>
                  </el-row>
                </div>
              </template>
            </template>
          </vxe-table-column>
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
            show-overflow="title"
            field="name"
            title="商品名称"
          ></vxe-table-column>
          <vxe-table-column field="price" title="商品售价"></vxe-table-column>
          <vxe-table-column field="sales" title="销量"></vxe-table-column>
          <vxe-table-column field="stock" title="库存"></vxe-table-column>
        </vxe-table>
        <el-pagination
          class="fenye"
          @size-change="this.handleSizeChange2"
          @current-change="this.handleCurrentChange2"
          :current-page="this.pintuanShangpingliebiaoShopPageSize"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total2"
        >
        </el-pagination>
      </div>
    </el-dialog>
    <!-- 查看活动商品 -->
    <el-dialog
      title="查看活动商品"
      :visible.sync="seeshopDialogVisible"
      width="1000px"
      :before-close="seeshopHandleClose"
    >
      <div class="myTable">
        <vxe-table :data="tableData3">
          <vxe-table-column type="expand" width="30" :fixed="null">
            <template #content="{ row }">
              <template>
                <div class="xiala">
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="item">商品分类：3C数码/手机</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="item">商品市场价格：3C数码/手机</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="item">成本价：{{ row.price }}</div>
                    </el-col>
                  </el-row>
                  <div style="margin-top: 16px"></div>
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="item">收藏：3C数码/手机</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="item">虚拟销量：3C数码/手机</div>
                    </el-col>
                  </el-row>
                </div>
              </template>
            </template>
          </vxe-table-column>
          <vxe-table-column field="id" title="商品ID"></vxe-table-column>
          <vxe-table-column field="role" title="商品图">
            <template slot-scope="scope">
              <el-image
                :src="scope.row.product_arr.image"
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
            show-overflow="title"
            field="product_arr.name"
            title="商品名称"
          ></vxe-table-column>
          <vxe-table-column
            field="product_arr.price"
            title="商品售价"
          ></vxe-table-column>
          <vxe-table-column
            field="product_arr.sales"
            title="销量"
          ></vxe-table-column>
          <vxe-table-column
            field="product_arr.stock"
            title="库存"
          ></vxe-table-column>
          <vxe-table-column title="操作" width="80">
            <template slot-scope="scope">
              <div class="flex">
                <el-button
                  size="small"
                  type="text"
                  @click="tabDelShop(scope.row)"
                  >删除</el-button
                >
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
        <el-pagination
          class="fenye"
          @size-change="this.handleSizeChange3"
          @current-change="this.handleCurrentChange3"
          :current-page="this.maichanghuodongnoAddSeeShopPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total3"
        >
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState([
      "pintuanShangpingliebiaoShopPage",
      "pintuanShangpingliebiaoShopPageSize",
      "maichanghuodongnoAddSeeShopPage",
      "maichanghuodongnoAddSeeShopPageSize",
    ]),
  },
  watch: {
    pintuanShangpingliebiaoShopPage: function (page) {
      this.$store.commit("pintuanShangpingliebiaoShopPage", page);
      this.getData();
    },
    pintuanShangpingliebiaoShopPageSize: function (pageSize) {
      this.$store.commit("pintuanShangpingliebiaoShopPageSize", pageSize);
      this.getData();
    },
    maichanghuodongnoAddSeeShopPage: function (page) {
      this.$store.commit("maichanghuodongnoAddSeeShopPage", page);
      this.getData();
    },
    maichanghuodongnoAddSeeShopPageSize: function (pageSize) {
      this.$store.commit("maichanghuodongnoAddSeeShopPageSize", pageSize);
      this.getData();
    },
  },
  data() {
    return {
      form: {
        rad1: "全部",
        rad2: "",
        time: [],
        search: "",
      },
      tableData: [],
      total: 0,
      addDialogVisible: false,
      addForm: {
        add_name: "",
        tag: "",
        money: "",
      },
      rules: {
        add_name: [
          { required: true, message: "请输入主题名称", trigger: "blur" },
        ],
        tag: [{ required: true, message: "请输入标识", trigger: "blur" }],
        money: [{ required: true, message: "请输入价格", trigger: "blur" }],
      },
      EditId: "",
      addfenleiDialogVisible: false,
      tableData1: [],
      total1: 0,
      searchAddForm: {
        keyword: "",
      },
      addFenleiId: "",
      addShopId: "",
      addshopDialogVisible: false,
      tableData2: [],
      total2: 0,
      seeshopDialogVisible: false,
      total3: 0,
      tableData3: [],
      seeId: "",
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.activityList_gift();
      console.log(res);
      this.tableData = res.data;
    },
    async getShopData() {
      const res = await this.$api.combinationList({
        limit: this.shangpingliebiaoPageSize,
        page: this.shangpingliebiaoPage,
        keyword: this.searchAddForm.keyword,
      });
      console.log(res.data.data);
      this.total2 = res.data.total;
      this.tableData2 = res.data.data;
      this.tableData2.forEach((ele) => {
        ele.is_showKG = ele.is_show == "1" ? true : false;
      });
    },
    async getFenleiData() {
      const res = await this.$api.categoryIndex({
        pid: 0,
        keyword: this.searchAddForm.keyword,
        // limit:this.pingtuanliebiaoPageSize,
        // page:this.pingtuanliebiaoPage
      });
      console.log(res);
      this.tableData1 = res.data;
      this.tableData1.forEach((ele) => {
        ele.is_showKG = ele.is_show == "1" ? true : false;
        if (ele.children) {
          ele.children.forEach((item) => {
            item.is_showKG = item.is_show == "1" ? true : false;
          });
        }
      });
    },
    async addShop(row) {
      console.log(row);
      this.addShopId = row.category_id;
      this.getShopData();
      this.addshopDialogVisible = true;
    },
    async seeShop(row) {
      console.log(row);
      this.seeId = row.id;
      const res = await this.$api.combinationList_product_cate({
        cate_id: row.id,
        limit: this.maichanghuodongSeeShopPageSize,
        page: this.maichanghuodongSeeShopPage,
      });
      console.log(res);
      this.total3 = res.data.total;
      this.tableData3 = res.data.data;  
      this.seeshopDialogVisible = true;
    },
    async tabDelShop(row) {
      console.log(row);
      const res = await this.$api.combinationDel_product_cate({
        id: row.id,
      });
      console.log(res);
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success",
        });
        const res2 = await this.$api.combinationList_product_cate({
          cate_id: this.seeId,
          limit: this.maichanghuodongSeeShopPageSize,
          page: this.maichanghuodongSeeShopPage,
        });
        console.log(res2);
        this.total3 = res2.data.total;
        this.tableData3 = res2.data.data;
      } else {
        this.$message.error(res.msg);
      }
    },
    addshopHandleClose() {
      this.addshopDialogVisible = false;
    },
    async selectAllEvent({ checked, records, row }) {
      console.log(checked ? "勾选事件" : "取消事件", records, row);
      if (checked) {
        var arr = [];
        records.forEach((ele) => {
          if (ele.pid == 0) {
            arr.push(ele.id);
          }
        });
        const res = await this.$api.activityAdd_cate_gift({
          id: this.addFenleiId,
          category_id: arr,
        });
        console.log(res);
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: "success",
          });
          this.getData();
        } else {
          this.$message.error(res.msg);
        }
      }
    },
    async selectChangeEvent({ checked, records, row }) {
      console.log(checked ? "勾选事件" : "取消事件", records, row);
      if (checked) {
        console.log(row.id);
        const res = await this.$api.activityAdd_cate_gift({
          id: this.addFenleiId,
          category_id: row.id,
        });
        console.log(res);
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: "success",
          });
          this.getData();
        } else {
          this.$message.error(res.msg);
        }
      }
    },
    async selectAllEvent2({ checked, records, row }) {
      console.log(checked ? "勾选事件" : "取消事件", records, row);
      if (checked) {
        var arr = [];
        records.forEach((ele) => {
          arr.push(ele.id);
        });
        const res = await this.$api.combinationAdd_product_cate({
          id: this.addShopId,
          relation_id: arr,
        });
        console.log(res);
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: "success",
          });
          this.getData();
        } else {
          this.$message.error(res.msg);
        }
      }
    },
    async selectChangeEvent2({ checked, records, row }) {
      console.log(checked ? "勾选事件" : "取消事件", records, row);
      if (checked) {
        console.log(row.id);
        const res = await this.$api.combinationAdd_product_cate({
          id: this.addShopId,
          relation_id: row.id,
        });
        console.log(res);
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: "success",
          });
        } else {
          this.$message.error(res.msg);
        }
      }
    },
    seeshopHandleClose() {
      this.seeshopDialogVisible = false;
    },
    AddZhuti() {
      this.addDialogVisible = true;
    },
    seeXiangqin(row) {
      console.log(row);
    },
    addHandleClose() {
      this.addDialogVisible = false;
    },
    onSubmit() {
      console.log(this.form);
    },
    tabsHandleClick(tab, event) {
      console.log(tab, event);
    },
    addfenleiHandleClose() {
      this.addfenleiDialogVisible = false;
    },
    handleCurrentChange1(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("pingtuanliebiaoPage", val);
    },
    searchAddOnSubmit() {
      this.getFenleiData();
    },
    searchAddOnResult() {
      this.searchAddForm.keyword = "";
      this.$store.commit("pingtuanliebiaoPage", 1);
      this.getFenleiData();
    },
    editZhuti(row) {
      console.log(row);
      this.addForm.add_name = row.title;
      this.addDialogVisible = true;
      this.EditId = row.id;
    },
    async delZhutiFenlei(row) {
      console.log(row);
      const res = await this.$api.activityDel_cate_gift({
        id: row.id,
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
    async delZhuti(row) {
      console.log(row);
      const res = await this.$api.activityDel_gift({
        id: row.id,
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
    addZhutiFenlei(row) {
      this.addFenleiId = row.id;
      this.addfenleiDialogVisible = true;
      this.getFenleiData();
    },
    AddOnSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await this.$api.activityAdd_gift({
            title: this.addForm.add_name,
            tag: this.addForm.tag,
            money: this.addForm.money,
            id: this.EditId,
          });
          if (res.code == 200) {
            this.$message({
              message: res.msg,
              type: "success",
            });
            this.addDialogVisible = false;
            this.getData();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("pingtuanliebiaoPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("pingtuanliebiaoPage", val);
    },
    handleSizeChange2(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("pintuanShangpingliebiaoShopPageSize", val);
    },
    handleCurrentChange2(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("pintuanShangpingliebiaoShopPage", val);
    },
    handleSizeChange3(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("maichanghuodongnoAddSeeShopPageSize", val);
    },
    handleCurrentChange3(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("maichanghuodongnoAddSeeShopPage", val);
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
.myForm {
  /deep/ .el-form-item__label {
    font-size: 12px;
  }
  /deep/ .el-form-item {
    margin-right: 30px;
    margin-bottom: 0;
    vertical-align: middle;
  }
}
</style>
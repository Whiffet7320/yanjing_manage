<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">活动列表</div>
    </div>
    <div class="nav2">
      <!-- <div class="myForm">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
          <el-form-item label="商品分类：">
            <el-select
              size="small"
              v-model="searchForm.pid"
              placeholder="商品分类"
            >
              <el-option label="顶级分类" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="small" label="状态：">
            <el-select v-model="searchForm.status" placeholder="状态">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="small" label="分类名称：">
            <el-input
              v-model="searchForm.keyword"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="searchOnSubmit"
              >查询</el-button
            >
          </el-form-item>
        </el-form>
      </div> -->
      <div class="tit1">
        <el-button
          @click="AddFenlei"
          size="small"
          type="primary"
          icon="el-icon-plus"
          >添加活动</el-button
        >
      </div>
      <div class="myTable">
        <vxe-table align="center" :data="tableData">
          <vxe-table-column type="expand" width="30" :fixed="null">
            <template #content="{ row }">
              <template>
                <div class="xiala">
                  <el-row :gutter="20">
                    <el-col :span="20">
                      <div class="item">详情：{{ row.desc }}</div>
                    </el-col>
                  </el-row>
                </div>
              </template>
            </template>
          </vxe-table-column>
          <vxe-table-column field="id" title="ID"></vxe-table-column>
          <vxe-table-column field="name" title="活动名称"></vxe-table-column>
          <vxe-table-column field="pic" title="活动图片">
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
          <vxe-table-column field="ksTime" title="开始时间"></vxe-table-column>
          <vxe-table-column field="jsTime" title="结束时间"></vxe-table-column>
          <!-- <vxe-table-column field="is_show" title="状态(是否显示)">
            <template slot-scope="scope">
              <el-switch
                @change="changeKG(scope.row)"
                v-model="scope.row.is_showKG"
              >
              </el-switch>
            </template>
          </vxe-table-column> -->
          <vxe-table-column title="操作" min-width="180">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" type="text" @click="addShop(scope.row)"
                  >添加活动商品</el-button
                >
                <el-button size="small" type="text" @click="seeShop(scope.row)"
                  >查看商品</el-button
                >
                <el-button size="small" type="text" @click="tabEdit(scope.row)"
                  >编辑</el-button
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
          :current-page="this.maichanghuodongPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 添加活动 -->
    <el-dialog
      title="添加活动"
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
              <el-form-item label="活动名称" prop="add_name">
                <el-input
                  size="small"
                  placeholder="请输入活动名称"
                  v-model="addForm.add_name"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="活动时间" prop="add_time">
                <el-date-picker
                  size="small"
                  value-format="timestamp"
                  v-model="addForm.add_time"
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
              <el-form-item label="分类：">
                <el-select size="small" v-model="addForm.category_id" placeholder="请选择分类">
                  <el-option v-for="item in categoryList" :key="item.id" :label="item.cate_name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="活动图片">
                <div @click="companyList('tb')" class="myImg">
                  <el-image
                    :src="addForm.pic"
                    fit="fill"
                    style="width: 60px; height: 60px"
                  >
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                  <div @click.stop="delImg('tb')" class="closeBtn">
                    <el-button circle>×</el-button>
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="20">
              <el-form-item label="活动详情">
                <el-input type="textarea" v-model="addForm.desc"></el-input>
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
    <!-- 添加活动商品 -->
    <el-dialog
      title="添加活动商品"
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
          :data="tableData1"
          @checkbox-all="selectAllEvent"
          @checkbox-change="selectChangeEvent"
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
          @size-change="this.handleSizeChange1"
          @current-change="this.handleCurrentChange1"
          :current-page="this.maichanghuodongShopPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total1"
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
        <vxe-table :data="tableData2">
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
          <vxe-table-column
            field="price"
            title="商品售价"
          ></vxe-table-column>
          <vxe-table-column
            field="sales"
            title="销量"
          ></vxe-table-column>
          <vxe-table-column
            field="stock"
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
          @size-change="this.handleSizeChange2"
          @current-change="this.handleCurrentChange2"
          :current-page="this.maichanghuodongSeeShopPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total2"
        >
        </el-pagination>
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
    ...mapState([
      "maichanghuodongPage",
      "maichanghuodongPageSize",
      "maichanghuodongShopPage",
      "maichanghuodongShopPageSize",
      "maichanghuodongSeeShopPage",
      "maichanghuodongSeeShopPageSize",
    ]),
  },
  watch: {
    maichanghuodongPage: function (page) {
      this.$store.commit("maichanghuodongPage", page);
      this.getData();
    },
    maichanghuodongPageSize: function (pageSize) {
      this.$store.commit("maichanghuodongPageSize", pageSize);
      this.getData();
    },
    maichanghuodongShopPage: function (page) {
      this.$store.commit("maichanghuodongShopPage", page);
      this.getData();
    },
    maichanghuodongShopPageSize: function (pageSize) {
      this.$store.commit("maichanghuodongShopPageSize", pageSize);
      this.getData();
    },
    maichanghuodongSeeShopPage: function (page) {
      this.$store.commit("maichanghuodongSeeShopPage", page);
      this.getData();
    },
    maichanghuodongSeeShopPageSize: function (pageSize) {
      this.$store.commit("maichanghuodongSeeShopPageSize", pageSize);
      this.getData();
    },
  },
  data() {
    return {
      total: 0,
      searchForm: {
        pid: "",
        status: "",
        keyword: "",
      },
      tableData: [],
      addDialogVisible: false,
      addForm: {
        add_name: "",
        add_time: [],
        category_id:'',
        pic: "",
        desc: "",
      },
      rules: {
        add_name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
        ],
        // add_time: [
        //   {
        //     type: "date",
        //     required: true,
        //     message: "请选择活动时间",
        //     trigger: "change",
        //   },
        // ],
      },
      imgStatus: "",
      imgFile: "",
      id: "",
      addshopDialogVisible: false,
      tableData1: [],
      total1: 0,
      addShopId: "",
      searchAddForm: {
        keyword: "",
      },
      seeshopDialogVisible: false,
      tableData2: [],
      total2: 0,
      categoryList:[],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.activityIndex({
        limit: 10,
        page: 1,
      });
      console.log(res.data);
      this.total = res.data.total;
      this.tableData = res.data.data;
      this.tableData.forEach((ele) => {
        ele.ksTime = this.formatDate(ele.start_time * 1000);
        ele.jsTime = this.formatDate(ele.stop_time * 1000);
      });
      console.log(this.tableData);
       const res2 = await this.$api.categoryIndex();
      console.log(res2.data);
      this.categoryList = res2.data;
    },
    async getShopData() {
      const res = await this.$api.combinationList({
        limit: this.shangpingliebiaoPageSize,
        page: this.shangpingliebiaoPage,
        keyword: this.searchAddForm.keyword,
      });
      console.log(res.data.data);
      this.total1 = res.data.total;
      this.tableData1 = res.data.data;
      this.tableData1.forEach((ele) => {
        ele.is_showKG = ele.is_show == "1" ? true : false;
      });
    },
    formatDate(date1) {
      var date = new Date(date1);
      var YY = date.getFullYear() + "-";
      var MM =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      return YY + MM + DD;
    },
    searchAddOnSubmit() {
      this.getShopData();
    },
    searchAddOnResult() {
      this.searchAddForm.keyword = "";
      this.$store.commit("maichanghuodongShopPage", 1);
      this.getShopData();
    },
    // 开关（显示/隐藏）
    async changeKG(row) {
      console.log(row);
      const res = await this.$api.categorySave({
        ...row,
        is_show: row.is_showKG == true ? "1" : "0",
      });
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success",
        });
        this.addDialogVisible = false;
        this.getData();
      }
    },
    searchOnSubmit() {
      console.log(this.searchForm);
    },
    AddFenlei() {
      for (const key in this.addForm) {
        this.$set(this.addForm, key, "");
      }
      this.addDialogVisible = true;
    },
    addHandleClose() {
      this.addDialogVisible = false;
    },
    addshopHandleClose() {
      this.addshopDialogVisible = false;
    },
    seeshopHandleClose() {
      this.seeshopDialogVisible = false;
    },
    tabEdit(row) {
      console.log(row);
      this.id = row.id;
      this.addDialogVisible = true;
      this.addForm.pic = row.pic;
      this.addForm.desc = row.desc;
      this.addForm.add_name = row.name;
      this.addForm.category_id = row.category_id;
      this.addForm.add_time = [];
      this.addForm.add_time[0] = row.start_time * 1000;
      this.addForm.add_time[1] = row.stop_time * 1000;
    },
    async selectAllEvent({ checked, records, row }) {
      console.log(checked ? "勾选事件" : "取消事件", records, row);
      if (checked) {
        var arr = [];
        records.forEach((ele) => {
          arr.push(ele.id);
        });
        const res = await this.$api.activityAdd_product({
          activity_id: this.addShopId,
          relation_id: arr,
          type: 3,
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
        const res = await this.$api.activityAdd_product({
          activity_id: this.addShopId,
          relation_id: row.id,
          type: 3,
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
    async seeShop(row) {
      console.log(row);
      this.seeId = row.id;
      const res = await this.$api.activityList_product({
        activity_id: row.id,
        limit: this.maichanghuodongSeeShopPageSize,
        page: this.maichanghuodongSeeShopPage,
      });
      console.log(res);
      this.total2 = res.data.total;
      this.tableData2 = res.data.data;
      this.seeshopDialogVisible = true;
    },
    async addShop(row) {
      console.log(row);
      this.addShopId = row.id;
      this.getShopData();
      this.addshopDialogVisible = true;
    },
    async tabDelShop(row) {
      console.log(row);
      const res = await this.$api.activityDel_product({
        id: row.id,
      });
      console.log(res);
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success",
        });
        const res2 = await this.$api.activityList_product({
          activity_id: this.seeId,
          limit: this.maichanghuodongSeeShopPageSize,
          page: this.maichanghuodongSeeShopPage,
        });
        console.log(res2);
        this.total2 = res2.data.total;
        this.tableData2 = res2.data.data;
      } else {
        this.$message.error(res.msg);
      }
    },
    async tabDel(row) {
      console.log(row);
      const res = await this.$api.activityDel({
        id: row.id,
      });
      if (res.code == 200) {
        this.$message({
          message: res.msg,
          type: "success",
        });
        setTimeout(() => {
          this.getData();
        }, 500);
      } else {
        this.$message.error(res.msg);
      }
    },
    AddOnSubmit(formName) {
      console.log(formName, this.addForm);
      console.log(this.addForm);
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const res = await this.$api.activitySave({
            name: this.addForm.add_name,
            start_time: this.addForm.add_time[0] / 1000,
            stop_time: this.addForm.add_time[1] / 1000,
            pic: this.addForm.pic,
            desc: this.addForm.desc,
            id: this.id,
            category_id:this.addForm.category_id
          });
          console.log(res)
          if (res.code == 200) {
            this.$message({
              message: res.msg,
              type: "success",
            });
            this.addDialogVisible = false;
            this.getData();
          }else{
            this.$message.error(res.msg);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
          this.imgFile.append("image[]", file);
          sessionStorage.setItem("img", 123);
          const res = await that.$api.productUpload(this.imgFile);
          console.log(res.data[0]);
          if (this.imgStatus == "tb") {
            this.$set(this.addForm, "pic", res.data[0]);
          } else if (this.imgStatus == "dt") {
            this.$set(this.addForm, "big_pic", res.data[0]);
          }
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
      this.$store.commit("maichanghuodongPageSize", val);
    },
    handleSizeChange1(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("maichanghuodongShopPageSize", val);
    },
    handleSizeChange2(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("maichanghuodongSeeShopPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("maichanghuodongPage", val);
    },
    handleCurrentChange1(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("maichanghuodongShopPage", val);
    },
    handleCurrentChange2(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("maichanghuodongSeeShopPage", val);
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
      vertical-align: middle;
    }
  }
  .tit1 {
    margin-top: 10px;
  }
  .myTable {
    .xiala {
      padding: 10px 20px;
      .item {
        font-size: 12px;
      }
    }
    margin-top: 10px;
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
    .flex {
      display: flex;
      align-items: center;
      justify-content: center;
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
.displayN {
  display: none;
}
.fenye {
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
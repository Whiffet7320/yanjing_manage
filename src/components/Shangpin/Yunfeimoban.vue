<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">运费模板</div>
    </div>
    <div class="nav2">
      <div class="tit1">
        <el-button @click="addPostage" size="small" type="primary" icon="el-icon-plus">添加运费模板</el-button>
      </div>
      <div class="myTable">
        <vxe-table align="center" :data="tableData">
          <vxe-table-column field="id" title="ID"></vxe-table-column>
          <vxe-table-column field="name" title="模板名称"></vxe-table-column>
          <vxe-table-column field="myType" title="分类"></vxe-table-column>
          <vxe-table-column field="sort" title="排序"></vxe-table-column>
          <vxe-table-column field="add_time" title="添加时间"></vxe-table-column>
          <vxe-table-column title="操作" width="180">
            <template slot-scope="scope">
              <div class="flex">
                <!-- <el-button size="small" type="text" @click="tabEdit(scope.row)">编辑</el-button> -->
                <el-button size="small" type="text" @click="tabDel(scope.row)">删除</el-button>
              </div>
            </template>
          </vxe-table-column>
        </vxe-table>
        <el-pagination
          class="fenye"
          @size-change="this.handleSizeChange"
          @current-change="this.handleCurrentChange"
          :current-page="this.yunfeimubanliebiaoPage"
          :page-size="10"
          :page-sizes="[10, 15, 20, 30]"
          layout="total,sizes, prev, pager, next, jumper"
          :total="this.total"
        ></el-pagination>
      </div>
    </div>
    <!-- 添加运费模板 -->
    <el-dialog
      title="运费模板"
      :visible.sync="addPostageDialogVisible"
      width="60%"
      :before-close="addPostageHandleClose"
    >
      <div class="myForm">
        <el-form ref="form" :model="addPostageForm" label-width="130px">
          <el-form-item label="模板名称：">
            <el-input size="small" v-model="addPostageForm.name"></el-input>
          </el-form-item>
          <el-form-item label="计费方式：">
            <el-radio-group v-model="addPostageForm.type">
              <el-radio label="1">按件数</el-radio>
              <el-radio label="2">按重量</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="配送区域及运费：">
            <div class="mySkuaddPostageTable">
              <vxe-table border align="center" :data="addPostageData1">
                <vxe-table-column field="name" width="130" title="可配送区域">
                  <template #default="{ row }">
                    <el-input disabled v-model="row.region[0].name"></el-input>
                  </template>
                </vxe-table-column>
                <vxe-table-column field="first" width="130" title="首件">
                  <template #default="{ row }">
                    <el-input type="number" v-model="row.first"></el-input>
                  </template>
                </vxe-table-column>
                <vxe-table-column field="price" width="130" title="运费（元）">
                  <template #default="{ row }">
                    <el-input type="number" v-model="row.price"></el-input>
                  </template>
                </vxe-table-column>
                <vxe-table-column field="continue" width="130" title="续件">
                  <template #default="{ row }">
                    <el-input type="number" v-model="row.continue"></el-input>
                  </template>
                </vxe-table-column>
                <vxe-table-column field="continue_price" width="130" title="续费（元）">
                  <template #default="{ row }">
                    <el-input type="number" v-model="row.continue_price"></el-input>
                  </template>
                </vxe-table-column>
                <vxe-table-column field="volume" width="170" title="操作">
                  <template #default="{ rowIndex }">
                    <el-button
                      :disabled="rowIndex == 0"
                      @click="delyunfeiTabSku(rowIndex)"
                      size="small"
                      type="text"
                    >删除</el-button>
                  </template>
                </vxe-table-column>
              </vxe-table>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button @click="addDandutianjia" size="small" type="primary">
              <span style="font-size: 12px">+</span>
              单独添加配送区域
            </el-button>
          </el-form-item>
          <el-form-item label="排序：">
            <el-input size="small" v-model="addPostageForm.sort"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="addShengshiquOnSubmit" size="small" type="primary">立即提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <!-- 选择可配送区域 -->
    <el-dialog
      title="选择可配送区域"
      :visible.sync="peisongDialogVisible"
      width="60%"
      :before-close="peisongHandleClose"
    >
      <div class="peisongBox">
        <div class="nav1">
          <el-checkbox
            :indeterminate="peisongIsIndeterminate"
            v-model="peisongCheckAll"
            @change="peisongHandleCheckAllChange"
          >全选</el-checkbox>
        </div>
        <div class="nav2">
          <el-checkbox-group
            v-model="peisongCheckedCities"
            @change="peisongHandleCheckedCitiesChange"
          >
            <el-popover
              v-for="(city,i) in shengJson"
              :key="i"
              placement="bottom"
              width="320"
              trigger="hover"
            >
              <el-checkbox-group
                v-model="city.peisongCheckedCities"
                @change="checked=>peisongHandleCheckedCitiesChange2(checked, city)"
              >
                <!-- 市 -->
                <el-checkbox
                  class="shi"
                  v-for="(item,index) in city.children"
                  :key="index"
                  :label="item"
                >{{item}}</el-checkbox>
              </el-checkbox-group>
              <el-checkbox
                @change="checked=>peisongChange(checked, city)"
                slot="reference"
                :label="city"
              >{{city.shengVal}}</el-checkbox>
            </el-popover>
          </el-checkbox-group>
        </div>
        <el-button
          style="transform: translateX(22px);"
          @click="addSheng"
          size="small"
          type="primary"
        >确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import cityJson from "../../assets/Json/city.json";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["yunfeimubanliebiaoPage", "yunfeimubanliebiaoPageSize"])
  },
  watch: {
    yunfeimubanliebiaoPage: function(page) {
      this.$store.commit("yunfeimubanliebiaoPage", page);
      this.getData();
    },
    yunfeimubanliebiaoPageSize: function(pageSize) {
      this.$store.commit("yunfeimubanliebiaoPageSize", pageSize);
      this.getData();
    }
  },
  data() {
    return {
      tableData: [],
      total: 0,
      // 选择可配送区域
      peisongDialogVisible: false,
      peisongCheckAll: false,
      peisongIsIndeterminate: false,
      peisongCityOptions: cityJson,
      peisongCheckedCities: [], //省
      shengJson: [], //省级
      // 添加配送模板
      addPostageDialogVisible: false,
      addPostageForm: {
        appoint: "0",
        name: "",
        type: "1",
        region_info: [],
        sort: "",
        appoint_info: ""
      },
      // 批量addPostageSku表格
      addPostageData1: [
        {
          region: [{ name: "默认全国", children: [] }],
          first: 1,
          price: 0,
          continue: 1,
          continue_price: 0,
          regionName: "默认全国"
        }
      ]
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.list_shipping_templates({
        limit: this.yunfeimubanliebiaoPageSize,
        page: this.yunfeimubanliebiaoPage
      });
      console.log(res);
      this.tableData = res.data.data;
      this.total = res.data.total;
      this.tableData.forEach(ele => {
        ele.myType = ele.type == "1" ? "按件数" : "按重量";
      });
    },
    // 编辑运费模板
    async tabEdit(row) {
      this.addPostageDialogVisible = true;
      const res = await this.$api.detail_shipping_templates({
        id: row.id
      });
      console.log(res.data);
      this.addPostageForm = { ...res.data };
      this.addPostageForm.type = this.addPostageForm.type.toString();
    },
    // 删除运费模板
    async tabDel(row) {
      const res = await this.$api.del_shipping_templates({
        id: row.id
      });
      console.log(res);
      if (res.code == 200) {
        this.getData();
        this.$message({
          message: res.msg,
          type: "success"
        });
      }
    },
    // 添加运费模板
    addPostage() {
      this.addPostageDialogVisible = true;
    },
    addPostageHandleClose() {
      this.addPostageDialogVisible = false;
    },
    addSheng() {
      console.log(this.peisongCheckedCities);
      let regionName = "";
      let shengArr = [];
      this.peisongCheckedCities.forEach(ele => {
        let cityArr = [];
        console.log(this.peisongCheckedCities.length);
        if (this.peisongCheckedCities.length < 2) {
          regionName += `${ele.shengVal}`;
        } else {
          regionName += `${ele.shengVal};`;
        }
        ele.peisongCheckedCities.forEach(item => [
          cityArr.push({
            name: item
          })
        ]);
        shengArr.push({
          name: ele.shengVal,
          children: cityArr
        });
      });
      console.log(shengArr);
      this.addPostageData1.push({
        region: [{ name: regionName, children: shengArr }],
        first: 1,
        price: 0,
        continue: 1,
        continue_price: 0,
        regionName
      });
      console.log(regionName);
      this.peisongDialogVisible = false;
    },
    // 运费模板提交
    async addShengshiquOnSubmit() {
      console.log(this.addPostageData1);
      const region_info = [...this.addPostageData1];
      region_info.forEach((ele, i) => {
        console.log(ele.region);
        if (i == 0) {
          ele.region = [
            {
              name: "默认全国",
              children: [
                {
                  name: "默认全国"
                }
              ]
            }
          ];
        } else if (ele.region[0].name.indexOf(";") >= 0) {
          ele.region = ele.region[0].children;
        }
      });
      console.log(region_info);
      this.addPostageForm.region_info = region_info;
      console.log(this.addPostageForm);
      const res = await this.$api.save_shipping_templates({
        ...this.addPostageForm
      });
      console.log(res);
      if (res.code == 200) {
        this.addPostageDialogVisible = false;
        this.getData();
        this.$message({
          message: res.msg,
          type: "success"
        });
      } else {
        this.$message.error(res.msg);
      }
    },
    // 选择可配送区域
    peisongHandleClose() {
      this.peisongDialogVisible = false;
    },
    peisongHandleCheckedCitiesChange(value) {
      console.log(value);
      let checkedCount = value.length;
      this.peisongCheckAll = checkedCount === this.shengJson.length;
      this.peisongIsIndeterminate =
        checkedCount > 0 && checkedCount < this.shengJson.length;
    },
    peisongChange(e, city) {
      console.log(e, city);
      city.peisongCheckedCities = e ? city.children : [];
    },
    // 数组中的对象去重
    unique(arr) {
      return [...new Set(arr)]
    },
    peisongHandleCheckedCitiesChange2(e, city) {
      console.log(e, city);
      this.peisongCheckedCities.push(city);
      this.peisongCheckedCities = this.unique(this.peisongCheckedCities);
    },
    peisongHandleCheckAllChange(val) {
      //全选
      console.log(val);
      this.peisongCheckedCities = val ? this.shengJson : [];
      if (this.peisongCheckedCities.length > 0) {
        this.peisongCheckedCities.forEach(ele => {
          ele.peisongCheckedCities = ele.children;
        });
      } else {
        this.shengJson.forEach(ele => {
          ele.peisongCheckedCities = [];
        });
      }
      console.log(this.peisongCheckedCities);
      this.peisongIsIndeterminate = false;
    },
    // 删除运费sku
    delyunfeiTabSku(rowIndex) {
      console.log(rowIndex);
      this.addPostageData1.splice(rowIndex, 1);
    },
    // 单独添加配送区域
    addDandutianjia() {
      this.shengJson = [];
      for (const key in this.peisongCityOptions) {
        this.shengJson.push({
          shengVal: key,
          children: this.peisongCityOptions[key],
          peisongCheckedCities: []
        });
      }
      this.peisongCheckedCities = [];
      this.peisongDialogVisible = true;
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.$store.commit("yunfeimubanliebiaoPageSize", val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$store.commit("yunfeimubanliebiaoPage", val);
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
    margin-top: 10px;
    /deep/ .vxe-table--render-default .vxe-body--column {
      line-height: 0px;
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
    .fenye {
      margin-top: 10px;
    }
  }
}
.myForm {
  margin-top: 10px;
  /deep/ .el-cascader {
    width: 100%;
  }
  /deep/ .el-form-item__label {
    font-size: 12px;
  }
  /deep/ .el-checkbox__label {
    font-size: 12px;
  }
  /deep/ .el-radio__label {
    font-size: 12px;
  }
  /deep/ .el-row {
    margin-right: 0px !important;
  }
  /deep/ .el-radio {
    margin-right: 10px;
  }
  .myImg {
    position: relative;
    width: 70px;
    height: 70px;
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
      width: 68px;
      height: 68px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      .el-icon-picture-outline {
        font-size: 20px;
      }
    }
  }
  .flex-gg {
    /deep/ .el-select {
      width: 50%;
    }
  }
  .sku {
    .tit1 {
      display: flex;
      align-items: center;
      .txt1-1 {
        margin-right: 4px;
        color: #515a6e;
        font-size: 12px;
      }
      .el-icon-error {
        cursor: pointer;
      }
    }
    .tit2 {
      border: 1px solid #dcdfe6;
      display: inline-block;
      height: 30px;
      border-radius: 4px;
      padding: 0 8px;
      margin-right: 8px;
      .blue {
        transform: translateY(-5px);
        display: inline-block;
        background: #2d8cf0;
        width: 12px;
        height: 12px;
        border-radius: 50%;
      }
      .txt1 {
        transform: translateY(-6px);
        margin-left: 4px;
        display: inline-block;
        font-size: 12px;
        color: #515a6e;
      }
      .txt2 {
        cursor: pointer;
        transform: translateY(-5px);
        margin-left: 6px;
        display: inline-block;
        font-size: 16px;
        color: #999999;
      }
    }
    .addGg {
      transform: translateY(-2px);
      display: inline-block;
      width: 200px !important;
      /deep/ .el-input-group__append {
        border: 0;
        background: #409eff;
        color: #ffffff;
        font-size: 12px;
      }
    }
  }
  .footer {
    display: flex;
    align-items: center;
    width: 900px;
    .tit1 {
      margin-right: 20px;
      display: flex;
      .txt1 {
        width: 70px;
        font-size: 12px;
        color: #606266;
      }
      /deep/ .el-input {
        width: 160px;
      }
      .txt2.txt1 {
        width: 52px;
      }
    }
    .btns {
      transform: translateY(4px);
      width: 180px;
      display: inline-block;
    }
  }
  .footer2.footer {
    transform: translate(0px, -10px);
  }
  .mySkuaddPostageTable {
    // margin-top: 16px;
    /deep/ .vxe-table--render-default .vxe-body--column {
      line-height: 40px;
    }
    /deep/ .el-input__inner {
      padding: 0 0 0 10px;
    }
  }
}
.peisongBox {
  .nav1 {
    margin: 0px -16px;
  }
  .nav2 {
    margin: 0;
  }
  /deep/ .el-checkbox {
    width: 20%;
    margin-bottom: 10px;
  }
  /deep/ .el-checkbox__label {
    font-size: 12px;
  }
}
</style>
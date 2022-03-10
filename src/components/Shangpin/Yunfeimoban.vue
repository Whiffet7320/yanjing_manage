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
          <vxe-table-column field="province_name" title="国家名字"></vxe-table-column>
          <vxe-table-column field="min_price" title="多少金额免邮"></vxe-table-column>
          <vxe-table-column field="shipping_price" title="运费"></vxe-table-column>
          <vxe-table-column field="add_time" title="添加时间"></vxe-table-column>
          <vxe-table-column title="操作" width="180">
            <template slot-scope="scope">
              <div class="flex">
                <el-button size="small" type="text" @click="tabEdit(scope.row)">编辑</el-button>
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
      width="900px"
      :before-close="addPostageHandleClose"
    >
      <div class="myForm">
        <el-form ref="form" :model="addPostageForm" label-width="130px">
          <el-form-item label="配送区域及运费：">
            <div class="mySkuaddPostageTable">
              <vxe-table border align="center" :data="addPostageData1">
                <vxe-table-column field="province_name" width="300" title="可配送区域">
                  <template #default="{ row }">
                    <el-input disabled v-model="row.province_name"></el-input>
                  </template>
                </vxe-table-column>
                <vxe-table-column field="shipping_price" width="130" title="运费">
                  <template #default="{ row }">
                    <el-input type="number" v-model="row.shipping_price"></el-input>
                  </template>
                </vxe-table-column>
                <vxe-table-column field="min_price" width="130" title="多少金额免邮">
                  <template #default="{ row }">
                    <el-input type="number" v-model="row.min_price"></el-input>
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
      width="1100px"
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
          <el-checkbox-group v-model="myAddressCheckList">
            <el-checkbox
              v-for="item in cityLList"
              :key="item.id"
              @change="checked=>peisongChange(checked,item)"
              :label="item.id"
            >{{item.country_pos}}-{{item.country_name}}</el-checkbox>
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
      cityLList: [],
      myAddressCheckList: [],
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
      addPostageData1: [],
      province_id: [],
      province_name: [],
      arr: [],
      isAdd: true,
      id:''
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.shipping_region({
        limit: this.yunfeimubanliebiaoPageSize,
        page: this.yunfeimubanliebiaoPage
      });
      console.log(res);
      this.tableData = res.data.data;
      this.total = res.data.total;
      this.tableData.forEach(ele => {
        ele.myType = ele.type == "1" ? "按件数" : "按重量";
      });
      const res2 = await this.$api.country({ page: 1, limit: 10000 });
      this.cityLList = res2.data.data;
    },
    // 编辑运费模板
    async tabEdit(row) {
      this.id = row.id;
      this.isAdd = false;
      this.addPostageData1 = [{ ...row }];
      var arr = row.province_id.split(",");
      arr.forEach(ele => {
        this.myAddressCheckList.push(Number(ele));
      });
      this.province_name = row.province_name.split(",");
      console.log(this.myAddressCheckList);
      this.addPostageDialogVisible = true;
    },
    // 删除运费模板
    async tabDel(row) {
      const res = await this.$api.deleteshipping_region(row.id);
      console.log(res);
      if (res.code == 200) {
        this.getData();
        this.$message({
          message: res.message,
          type: "success"
        });
      }
    },
    // 添加运费模板
    addPostage() {
      this.isAdd = true;
      for (const key in this.addPostageForm) {
        this.addPostageForm[key] = "";
      }
      this.myAddressCheckList = [];
      this.addPostageData1 = [];
      this.addPostageDialogVisible = true;
    },
    addPostageHandleClose() {
      this.addPostageDialogVisible = false;
    },
    addSheng() {
      if (this.isAdd) {
        this.addPostageData1.push({
          province_id: this.myAddressCheckList,
          province_name: this.province_name,
          shipping_price: 0,
          min_price: 0
        });
      } else {
        this.$set(this.addPostageData1[0], "province_name", this.province_name);
        this.$set(
          this.addPostageData1[0],
          "province_id",
          this.myAddressCheckList
        );
      }
      this.peisongDialogVisible = false;
    },
    // 运费模板提交
    async addShengshiquOnSubmit() {
      if (this.isAdd) {
        const res = await this.$api.addshipping_region({
          province_id: this.addPostageData1[0].province_id.toString(),
          province_name: this.addPostageData1[0].province_name.toString(),
          min_price: this.addPostageData1[0].min_price,
          shipping_price: this.addPostageData1[0].shipping_price
        });
        console.log(res);
        if (res.code == 200) {
          this.addPostageDialogVisible = false;
          this.getData();
          this.$message({
            message: res.message,
            type: "success"
          });
        } else {
          this.$message.error(res.message);
        }
      }else{
        const res = await this.$api.updateshipping_region({
          province_id: this.addPostageData1[0].province_id.toString(),
          province_name: this.addPostageData1[0].province_name.toString(),
          min_price: this.addPostageData1[0].min_price,
          shipping_price: this.addPostageData1[0].shipping_price
        },this.id);
        console.log(res);
        if (res.code == 200) {
          this.addPostageDialogVisible = false;
          this.getData();
          this.$message({
            message: res.message,
            type: "success"
          });
        } else {
          this.$message.error(res.message);
        }
      }
    },
    // 选择可配送区域
    peisongHandleClose() {
      this.peisongDialogVisible = false;
    },
    // peisongHandleCheckedCitiesChange(value) {
    //   console.log(value);
    //   let checkedCount = value.length;
    //   this.peisongCheckAll = checkedCount === this.shengJson.length;
    //   this.peisongIsIndeterminate =
    //     checkedCount > 0 && checkedCount < this.shengJson.length;
    // },
    peisongChange() {
      this.province_name = [];
      this.arr = [...new Set(this.cityLList)];
      this.arr.forEach(ele => {
        if (this.myAddressCheckList.indexOf(ele.id) != -1) {
          this.province_name.push(`${ele.country_pos}-${ele.country_name}`);
        }
      });
      this.province_name = [...new Set(this.province_name)];
      console.log(this.province_name);
    },
    // 数组中的对象去重
    unique(arr) {
      return [...new Set(arr)];
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
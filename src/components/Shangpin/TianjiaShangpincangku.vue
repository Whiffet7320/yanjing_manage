<template>
  <div class="index">
    <div class="nav1">
      <el-button @click="toBack" class="btn" size="small" icon="el-icon-arrow-left">返回</el-button>
      <div class="tit1">商品仓库管理</div>
    </div>
    <div class="nav2">
      <div class="tit1">
        <el-tabs v-model="activeName">
          <el-tab-pane label="仓库信息" name="1"></el-tab-pane>
          <el-tab-pane label="仓库商品" name="2"></el-tab-pane>
        </el-tabs>
        <!-- 商品信息 -->
        <template v-if="activeName == '1'">
          <div class="myForm">
            <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="商品编号：">
                    <el-input size="small" v-model="ruleForm.store_num"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- <el-row>
                <el-col :span="12">
                  <el-form-item label="商品封面图：">
                    <div @click="companyList('fmt')" class="myImg">
                      <el-image
                        :src="ruleForm.product_img"
                        fit="fill"
                        style="width: 70px; height: 70px"
                      >
                        <div slot="error" class="image-slot">
                          <i class="el-icon-picture-outline"></i>
                        </div>
                      </el-image>
                      <div @click.stop="delImg('fmt')" class="closeBtn">
                        <el-button circle>×</el-button>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>-->
              <!-- <el-row>
                <el-col :span="12">
                  <el-form-item label="商品最低价格：">
                    <el-input size="small" v-model="ruleForm.product_min_price"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>-->
              <el-row>
                <el-col :span="12">
                  <el-form-item label="商品分类：">
                    <el-select size="small" v-model="ruleForm.category_id" placeholder="请选择">
                      <el-option
                        v-for="item in options"
                        :key="item.id"
                        :label="item.category_name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="度数范围：">
                    <el-input size="small" v-model="ruleForm.pd_range"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="处方范围：">
                    <el-input size="small" v-model="ruleForm.prescription_range"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="双焦/渐进：">
                    <el-input size="small" v-model="ruleForm.progressive_or_bifocal"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="阅读：">
                    <el-input size="small" v-model="ruleForm.readers"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="边框：">
                    <el-input size="small" v-model="ruleForm.rim"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="外形：">
                    <el-input size="small" v-model="ruleForm.shape"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="材料：">
                    <el-input size="small" v-model="ruleForm.material"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="特色：">
                    <el-input size="small" v-model="ruleForm.feature"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="镜框总长：">
                    <el-input size="small" v-model="ruleForm.frame_width"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="单镜框宽度：">
                    <el-input size="small" v-model="ruleForm.lens_width"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="镜架距离：">
                    <el-input size="small" v-model="ruleForm.bridge"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="眼镜腿长：">
                    <el-input size="small" v-model="ruleForm.temple_length"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="单镜高度：">
                    <el-input size="small" v-model="ruleForm.lens_height"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="镜框重量：">
                    <el-input size="small" v-model="ruleForm.frame_weight"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- <el-row>
                <el-col :span="18">
                  <el-form-item label="颜色：">
                    <el-checkbox-group v-model="ruleForm.size_id">
                      <el-checkbox
                        @change="checked=>changeCheckGroup(checked, item)"
                        v-for="item in checkList"
                        :key="item.id"
                        :label="item.id"
                      >{{item.color_name}}</el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </el-col>
              </el-row>-->
              <!-- sku表格 -->
              <!-- <div class="mySkuTable">
                <vxe-table border align="center" :data="skuList">
                  <vxe-table-column field="product_img" width="62" title="图片">
                    <template #default="{ row, rowIndex }">
                      <div @click="companyList('sku', rowIndex)">
                        <el-image
                          fit="fill"
                          style="
                                  width: 40px;
                                  height: 40px;
                                  cursor: pointer;
                                  transform: translateY(10px);
                                  border: 1px solid #ddd;
                                "
                          :src="row.product_img"
                        >
                          <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                          </div>
                        </el-image>
                      </div>
                    </template>
                  </vxe-table-column>
                  <vxe-table-column field="product_num" width="130" title="编号">
                    <template #default="{ row }">
                      <el-input type="number" v-model="row.product_num"></el-input>
                    </template>
                  </vxe-table-column>
                  <vxe-table-column field="product_price" width="130" title="售价">
                    <template #default="{ row }">
                      <el-input type="number" v-model="row.product_price"></el-input>
                    </template>
                  </vxe-table-column>
                  <vxe-table-column field="color_name" width="130" title="颜色">
                  </vxe-table-column>
                  <vxe-table-column field="product_img" width="300" title="详情图片">
                    <template #default="{ row, rowIndex }">
                      <div
                        @click="companyList('skuDetailImg', rowIndex,i)"
                        v-for="(item, i) in row.product_detail_imgs"
                        :key="i"
                        style="
                                  transform: translateY(10px);
                                  display: inline-block;
                                  width: 40px;
                                  height: 40px;
                                  cursor: pointer;
                                  border: 1px solid #ddd;
                                "
                      >
                        <el-image
                          fit="fill"
                          style="width: 40px;
                                  height: 40px;"
                          :src="item"
                        >
                          <div slot="error" class="image-slot">
                            <i class="el-icon-picture-outline"></i>
                          </div>
                        </el-image>
                      </div>
                    </template>
                  </vxe-table-column>
                  <vxe-table-column field="status" width="130" title="状态">
                    <template #default="{ row }">
                      <el-radio-group style="transform: translateY(-8px)" v-model="row.status">
                        <el-radio :label="1">上架</el-radio>
                        <el-radio :label="0">下架</el-radio>
                      </el-radio-group>
                    </template>
                  </vxe-table-column>

                  <vxe-table-column field="volume" width="180" title="操作">
                    <template #default="{ row,rowIndex }">
                      <el-button @click="addTabSku(row,rowIndex)" size="small" type="text">添加/修改</el-button>
                      <el-button @click="delTabSku(rowIndex)" size="small" type="text">删除</el-button>
                    </template>
                  </vxe-table-column>
                </vxe-table>
              </div>-->
              <el-row>
                <el-col :span="18">
                  <el-form-item label="标签：">
                    <el-checkbox-group v-model="ruleForm.tags_id">
                      <el-checkbox
                        v-for="item in checkList2"
                        :key="item.id"
                        :label="item.id"
                      >{{item.tags_name}}</el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- <el-row>
                <el-col :span="14">
                  <el-form-item label="是否精选：">
                    <el-radio-group v-model="ruleForm.jingxuan">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="14">
                  <el-form-item label="是否上新：">
                    <el-radio-group v-model="ruleForm.shangxin">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="14">
                  <el-form-item label="是否热销：">
                    <el-radio-group v-model="ruleForm.rexiao">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>-->
              <el-row>
                <el-col :span="14">
                  <el-form-item label="是否显示：">
                    <el-radio-group v-model="ruleForm.status">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="描述：">
                    <el-input type="textarea" size="small" v-model="ruleForm.description"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item>
                <el-button size="small" type="primary" @click="submitForm">下一步</el-button>
                <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
              </el-form-item>
            </el-form>
          </div>
        </template>
        <template v-if="activeName == '2'">
          <div class="myForm">
            <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-row>
                <el-col :span="18">
                  <el-form-item label="颜色：">
                    <el-checkbox-group v-model="ruleForm.size_id">
                      <el-checkbox
                        @change="checked=>changeCheckGroup(checked, item)"
                        v-for="item in checkList"
                        :key="item.id"
                        :label="item.id"
                      >{{item.color_name}}</el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <!-- sku表格 -->
            <div class="mySkuTable">
              <vxe-table border align="center" :data="skuList">
                <vxe-table-column field="product_img" width="62" title="图片">
                  <template #default="{ row, rowIndex }">
                    <div @click="companyList('sku', rowIndex)">
                      <el-image
                        fit="fill"
                        style="
                                  width: 40px;
                                  height: 40px;
                                  cursor: pointer;
                                  transform: translateY(10px);
                                  border: 1px solid #ddd;
                                "
                        :src="row.product_img"
                      >
                        <div slot="error" class="image-slot">
                          <i class="el-icon-picture-outline"></i>
                        </div>
                      </el-image>
                    </div>
                  </template>
                </vxe-table-column>
                <vxe-table-column field="product_num" width="130" title="编号">
                  <template #default="{ row }">
                    <el-input type="number" v-model="row.product_num"></el-input>
                  </template>
                </vxe-table-column>
                <vxe-table-column field="product_name" width="130" title="商品名称">
                  <template #default="{ row }">
                    <el-input v-model="row.product_name"></el-input>
                  </template>
                </vxe-table-column>
                <vxe-table-column field="product_price" width="130" title="售价">
                  <template #default="{ row }">
                    <el-input type="number" v-model="row.product_price"></el-input>
                  </template>
                </vxe-table-column>
                <vxe-table-column field="color_name" width="130" title="颜色">
                  <!-- <template #default="{ row }">
                      <el-input type="number" v-model="row.color_name"></el-input>
                  </template>-->
                </vxe-table-column>
                <vxe-table-column field="product_img" width="300" title="详情图片">
                  <template #default="{ row, rowIndex }">
                    <div
                      @click="companyList('skuDetailImg', rowIndex,i)"
                      v-for="(item, i) in row.product_detail_imgs"
                      :key="i"
                      style="
                                  transform: translateY(10px);
                                  display: inline-block;
                                  width: 40px;
                                  height: 40px;
                                  cursor: pointer;
                                  border: 1px solid #ddd;
                                "
                    >
                      <el-image
                        fit="fill"
                        style="width: 40px;
                                  height: 40px;"
                        :src="item"
                      >
                        <div slot="error" class="image-slot">
                          <i class="el-icon-picture-outline"></i>
                        </div>
                      </el-image>
                    </div>
                  </template>
                </vxe-table-column>
                <vxe-table-column field="status" width="130" title="状态">
                  <template #default="{ row }">
                    <el-radio-group style="transform: translateY(-8px)" v-model="row.status">
                      <el-radio :label="1">上架</el-radio>
                      <el-radio :label="0">下架</el-radio>
                    </el-radio-group>
                  </template>
                </vxe-table-column>
                <vxe-table-column field="status" width="130" title="上新">
                  <template #default="{ row }">
                    <el-radio-group style="transform: translateY(-8px)" v-model="row.shangxin">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                  </template>
                </vxe-table-column>
                <vxe-table-column field="status" width="130" title="热销">
                  <template #default="{ row }">
                    <el-radio-group style="transform: translateY(-8px)" v-model="row.rexiao">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                  </template>
                </vxe-table-column>
                <vxe-table-column field="status" width="130" title="精选">
                  <template #default="{ row }">
                    <el-radio-group style="transform: translateY(-8px)" v-model="row.jingxuan">
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                  </template>
                </vxe-table-column>

                <vxe-table-column field="volume" width="180" title="操作">
                  <template #default="{ row,rowIndex }">
                    <el-button
                      v-if="!row.color_id"
                      @click="addTabSku(row,rowIndex)"
                      size="small"
                      type="text"
                    >添加</el-button>
                    <el-button v-else @click="editTabSku(row,rowIndex)" size="small" type="text">修改</el-button>
                    <el-button @click="delTabSku(row,rowIndex)" size="small" type="text">删除</el-button>
                  </template>
                </vxe-table-column>
              </vxe-table>
            </div>
            <div class="btttn">
              <el-button size="small" type="primary" @click="activeName = '1'">上一步</el-button>
              <el-button size="small" @click="submitForm2">保存</el-button>
            </div>
          </div>
        </template>
      </div>
    </div>
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
    ...mapState(["shopObj"])
  },
  watch: {},
  data() {
    return {
      activeName: "1",
      ruleForm: {
        store_num: "",
        product_img: "",
        product_min_price: "",
        pd_range: "",
        prescription_range: "",
        progressive_or_bifocal: "",
        readers: "",
        rim: "",
        shape: "",
        material: "",
        feature: "",
        frame_width: "",
        lens_width: "",
        bridge: "",
        temple_length: "",
        lens_height: "",
        frame_weight: "",
        description: "",
        jingxuan: "",
        shangxin: "",
        rexiao: "",
        status: "",
        size_id: [],
        size_name: [],
        category_name: [],
        tags_id: [],
        tags_name: [],
        category_id:'',
      },
      imgIndex: "",
      imgStatus: "",
      id: "",
      checkList: [],
      checkList2: [],
      shopList: [],
      skuList: [],
      skuDeatilIndex: "",
      storehouse_id: "",
      options:[],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.category({
        pid: 0,
        limit:1000,
        page:1
      });
      console.log(res);
      this.options = res.data.data;
      const res2 = await this.$api.color({
        limit: 1000,
        page: 1
      });
      this.checkList = res2.data.data;
      const res4 = await this.$api.tags({
        limit: 1000,
        page: 1
      });
      this.checkList2 = res4.data.data;
      console.log(this.shopObj);
      if (this.shopObj) {
        this.storehouse_id = this.shopObj.id;
        this.ruleForm = { ...this.shopObj };
        this.ruleForm.category_id = Number(this.shopObj.category_id)
        this.id = this.ruleForm.id;
        const res = await this.$api.product({
          limit: 1000,
          page: 1,
          storehouse_id: this.storehouse_id
        });
        this.skuList = res.data.data;
        var arr = [];
        if (this.skuList.length > 0) {
          this.skuList.forEach(ele => {
            arr.push(ele.color_id);
          });
        }
        var arr3 = this.ruleForm.tags_id.split(",");
        arr3.forEach((ele, i) => {
          arr3[i] = Number(ele);
        });
        this.$set(this.ruleForm, "size_id", arr);
        this.$set(this.ruleForm, "tags_id", arr3);
        console.log(this.ruleForm);
      }
    },
    changeCheckGroup(val, item) {
      console.log(this.ruleForm.size_id, item);
      if (val) {
        this.skuList.push(item);
      } else {
        this.skuList.forEach((ele, i) => {
          if (ele.id == item.id) this.skuList.splice(i, 1);
        });
      }
      this.skuList.forEach(ele => {
        if (!ele.product_detail_imgs) {
          this.$set(ele, "product_detail_imgs", ["", "", "", "", ""]);
        }
      });
      this.skuList = [...new Set(this.skuList)];
      console.log(this.skuList);
    },
    // 删除图片
    delImg(val, i = 0) {
      console.log(i);
      if (val == "fmt") {
        this.$set(this.ruleForm, "product_img", "");
      } else if (this.imgStatus == "tjt") {
        this.$set(this.ruleForm, "recommend_image", "");
      } else if (this.imgStatus == "lbt") {
        this.$set(this.ruleForm.slider_image, i, "");
      }
      ``;
    },
    // 添加sku小类
    addskuxiao(item1) {
      console.log(item1);
      if (item1.inpVal == "") {
        this.$message({
          message: "内容不能为空",
          type: "warning"
        });
      } else {
        item1.arr.push(item1.inpVal);
        item1.inpVal = "";
      }
    },
    // 添加sku大类
    addskuda() {
      if (this.addSkuDa.gg == "" || this.addSkuDa.ggz == "") {
        this.$message({
          message: "内容不能为空",
          type: "warning"
        });
      } else {
        this.sku.push({
          tit: this.addSkuDa.gg,
          arr: [this.addSkuDa.ggz],
          inpVal: ""
        });
        this.addSkuDa.gg = "";
        this.addSkuDa.ggz = "";
        this.isAdd = false;
      }
    },
    // 删除sku大类
    removeskuda(index) {
      this.sku.splice(index, 1);
    },
    // 删除sku小类
    removeskuxiao(index, i) {
      this.sku[index].arr.splice(i, 1);
    },
    // 上传图片
    companyList(val, i = 0, ii) {
      this.imgIndex = i;
      this.imgStatus = val;
      this.$refs.fileInputList.click();
      this.skuDeatilIndex = ii;
      console.log(i, ii);
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
          if (this.imgStatus == "lbt") {
            this.$set(this.ruleForm.slider_image, this.imgIndex, res.data[0]);
          } else if (this.imgStatus == "fmt") {
            this.$set(
              this.ruleForm,
              "product_img",
              `${this.$url}${res.data.path}`
            );
          } else if (this.imgStatus == "tjt") {
            this.$set(this.ruleForm, "recommend_image", res.data[0]);
          } else if (this.imgStatus == "sku") {
            this.$set(
              this.skuList[this.imgIndex],
              "product_img",
              `${this.$url}${res.data.path}`
            );
          } else if (this.imgStatus == "skuDetailImg") {
            console.log(this.skuList[this.imgIndex]);
            this.$set(
              this.skuList[this.imgIndex].product_detail_imgs,
              this.skuDeatilIndex,
              `${this.$url}${res.data.path}`
            );
          }
          that.$refs.fileInputList.value = "";
        } else {
          this.$message.error("图片格式不正确");
        }
      } else {
        this.$message.error("图片大小不正确");
      }
    },
    async submitForm2() {
      this.$message({
        message: "成功",
        type: "success"
      });
      setTimeout(() => {
        this.$router.push({ name: "Shangpincangkuguanli" });
      }, 500);
    },
    async submitForm() {
      console.log(this.skuList);
      this.ruleForm.size_name = [];
      this.ruleForm.tags_name = [];
      this.checkList.forEach(ele => {
        if (this.ruleForm.size_id.indexOf(ele.id) != -1) {
          this.ruleForm.size_name.push(ele.color_name);
        }
      });
      this.checkList2.forEach(ele => {
        if (this.ruleForm.tags_id.indexOf(ele.id) != -1) {
          this.ruleForm.tags_name.push(ele.tags_name);
        }
      });
      console.log(this.ruleForm, this.storehouse_id);
      delete this.ruleForm._XID;
      delete this.ruleForm.status;
      delete this.ruleForm.is_showKG;
      delete this.ruleForm.id;
      delete this.ruleForm.delete_time;
      delete this.ruleForm.add_time;
      if (this.storehouse_id != "") {
        const res = await this.$api.updateProductstorehouse(
          {
            ...this.ruleForm,
            jingxuan: this.ruleForm.jingxuan,
            shangxin: this.ruleForm.shangxin,
            rexiao: this.ruleForm.rexiao,
            status: this.ruleForm.status,
            tags_id: this.ruleForm.tags_id.toString(),
            tags_name: this.ruleForm.tags_name.toString()
          },
          this.shopObj.id
        );
        if (res.code == 200) {
          // this.$message({
          //   message: res.message,
          //   type: "success"
          // });
          // setTimeout(() => {
          //   this.$router.push({ name: "Shangpincangkuguanli" });
          // }, 500);
          // const res2 = await this
          this.activeName = "2";
        } else {
          this.$message.error(res.message);
          this.getData();
        }
      } else {
        const res = await this.$api.addProductstorehouse({
          ...this.ruleForm,
          jingxuan: this.ruleForm.jingxuan,
          shangxin: this.ruleForm.shangxin,
          rexiao: this.ruleForm.rexiao,
          status: this.ruleForm.status,
          tags_id: this.ruleForm.tags_id.toString(),
          tags_name: this.ruleForm.tags_name.toString()
        });
        if (res.code == 200) {
          // this.$message({
          //   message: res.message,
          //   type: "success"
          // });
          this.storehouse_id = res.data.id;
          this.activeName = "2";
          // setTimeout(() => {
          //   this.$router.push({ name: "Shangpincangkuguanli" });
          // }, 500);
        } else {
          this.$message.error(res.message);
          this.getData();
        }
      }
    },
    async delTabSku(row, rowIndex) {
      const res = await this.$api.deleteProduct(row.id);
      if (res.code == 200) {
        this.$message({
          message: res.message,
          type: "success"
        });
        this.skuList.splice(rowIndex, 1);
      } else {
        this.$message.error(res.message);
      }
    },
    async editTabSku(row, rowIndex) {
      console.log(row, rowIndex);
      const res = await this.$api.updateProduct(
        {
          product_num: row.product_num,
          product_price: row.product_price,
          color_name: row.color_name,
          color_id: row.color_id,
          product_img: row.product_img,
          product_detail_imgs: row.product_detail_imgs,
          status: row.status,
          product_name: row.product_name,
          storehouse_id: this.storehouse_id
        },
        row.id
      );
      console.log(res);
      if (res.code == 200) {
        this.$message({
          message: res.message,
          type: "success"
        });
      } else {
        this.$message.error(res.message);
      }
    },
    async addTabSku(row, rowIndex) {
      console.log(row, rowIndex);
      const res = await this.$api.addProduct({
        product_num: row.product_num,
        product_price: row.product_price,
        color_name: row.color_name,
        color_id: row.id,
        product_img: row.product_img,
        product_detail_imgs: row.product_detail_imgs,
        status: row.status,
        product_name: row.product_name,
        storehouse_id: this.storehouse_id,
        jingxuan: row.jingxuan,
        shangxin: row.shangxin,
        rexiao: row.rexiao
      });
      console.log(res);
      if (res.code == 200) {
        this.$message({
          message: res.message,
          type: "success"
        });
      } else {
        this.$message.error(res.message);
      }
    },
    toBack() {
      this.$router.push({ name: "Shangpincangkuguanli" });
    }
  }
};
</script>

<style lang="scss" scoped>
.btttn {
  margin-top: 30px;
  margin-left: 50px;
}
.index {
}
.nav1 {
  margin: 0 -18px;
  background-color: #fff;
  padding: 20px 32px 0 40px;
  display: flex;
  .btn {
    transform: translateY(-4px);
    height: 30px;
    margin-right: 10px;
  }
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
  .tit1 {
    margin-top: 10px;
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
          width: 40px;
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
      // transform: translate(-41px, -12px);
      transform: translate(0px, -10px);
    }
    .mySkuTable {
      margin-left: 50px;
      margin-top: 16px;
      min-width: 800px;
      width: 70vw;
      /deep/ .vxe-table--render-default .vxe-body--column {
        line-height: 40px;
      }
      /deep/ .el-input__inner {
        padding: 0 0 0 10px;
        transform: translateY(-8px);
      }
    }
  }
}
/deep/ .el-input-group__append {
  cursor: pointer;
}

// 商品详情
.myEditor {
  padding-top: 20px;
  display: flex;
  .txt {
    color: #606266;
    width: 90px;
    font-size: 12px;
    margin-right: 12px;
    margin-top: 2px;
    text-align: right;
  }
  #editor {
    transform: translateY(-6px);
  }
}
.btnflex {
  margin-top: 20px;
  margin-left: 101px;
}
.displayN {
  display: none;
}
</style>
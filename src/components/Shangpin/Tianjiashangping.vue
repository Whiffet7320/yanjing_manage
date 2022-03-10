<template>
  <div class="index">
    <div class="nav1">
      <el-button @click="toBack" class="btn" size="small" icon="el-icon-arrow-left">返回</el-button>
      <div class="tit1">商品管理</div>
    </div>
    <div class="nav2">
      <div class="tit1">
        <el-tabs v-model="activeName">
          <el-tab-pane label="商品信息" name="1"></el-tab-pane>
          <!-- <el-tab-pane label="商品详情" name="2"></el-tab-pane> -->
          <!-- <el-tab-pane label="其他设置" name="3"></el-tab-pane> -->
        </el-tabs>
        <!-- 商品信息 -->
        <template v-if="activeName == '1'">
          <div class="myForm">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-row>
                <el-col :span="12">
                  <el-form-item label="商品编号：" prop="product_num">
                    <el-input size="small" v-model="ruleForm.product_num"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="商品名称：" prop="product_name">
                    <el-input size="small" v-model="ruleForm.product_name"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="所属仓库：" prop="storehouse_id">
                    <el-select size="small" v-model="ruleForm.storehouse_id" placeholder="请选择">
                      <el-option
                        v-for="item in options2"
                        :key="item.id"
                        :label="item.store_num"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="商品分类：" prop="category_id">
                    <el-cascader
                      v-model="ruleForm.category_id"
                      size="small"
                      :options="options"
                      :props="{checkStrictly: true,value: 'id',label: 'category_name'}"
                      clearable
                      @change="handleChange"
                    ></el-cascader>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="商品封面图：" prop="image">
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
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="商品详情图片：" prop="product_detail_imgs">
                    <div
                      @click="companyList('lbt', i)"
                      class="myImg"
                      v-for="(item, i) in ruleForm.product_detail_imgs"
                      :key="i"
                    >
                      <el-image :src="item" fit="fill" style="width: 70px; height: 70px">
                        <div slot="error" class="image-slot">
                          <i class="el-icon-picture-outline"></i>
                        </div>
                      </el-image>
                      <div @click.stop="delImg('lbt', i)" class="closeBtn">
                        <el-button circle>×</el-button>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- <el-row>
                <el-col :span="18">
                  <el-form-item label="尺寸：">
                    <el-checkbox-group v-model="ruleForm.size_id">
                      <el-checkbox
                        v-for="item in checkList"
                        :key="item.id"
                        :label="item.id"
                      >{{item.size_name}}</el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </el-col>
              </el-row>
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
              <el-row>
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
                  <el-form-item label="是否上心：">
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
              </el-row> -->
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
              <el-form-item>
                <el-button size="small" type="primary" @click="onSubmit">保存</el-button>
                <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
              </el-form-item>
            </el-form>
          </div>
        </template>
        <!-- 商品详情 -->
        <div v-show="activeName == '2'">
          <el-row>
            <el-col :span="22">
              <div class="myEditor">
                <div class="txt">商品详情：</div>
                <div id="editor"></div>
              </div>
            </el-col>
          </el-row>
          <div class="btnflex">
            <el-button size="small" @click="submitForm('ruleForm', '1')">上一步</el-button>
            <el-button size="small" type="primary" @click="submitForm('ruleForm', '3')">下一步</el-button>
          </div>
        </div>
        <!-- 其他设置 -->
        <div v-show="activeName == '3'">
          <div class="myForm">
            <el-form ref="form" :model="qtszForm" label-width="100px">
              <el-row :gutter="100">
                <el-col :span="8">
                  <el-form-item label="虚拟销量：">
                    <el-input size="small" v-model="qtszForm.ficti"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="额外赠送积分：">
                    <el-input size="small" v-model="qtszForm.give_integral"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="排序：">
                    <el-input size="small" v-model="qtszForm.sort"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="14">
                  <el-form-item label="单独设置：">
                    <el-checkbox-group v-model="qtszForm.ddsz">
                      <el-checkbox label="佣金设置"></el-checkbox>
                      <el-checkbox label="付费会员价"></el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <el-form-item v-if="ddsz" label="批量设置：">
                    <el-row :gutter="14">
                      <el-col :span="6">
                        <el-form-item v-if="yjsz" label="一级返佣(元)：">
                          <el-input size="small" v-model="plszForm.brokerage"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item v-if="yjsz" label="二级返佣(元)：">
                          <el-input size="small" v-model="plszForm.brokerage_two"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item v-if="hyjsz" label="会员价(元)：">
                          <el-input size="small" v-model="plszForm.vip_price"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="3">
                        <el-button @click="fanyongPLSZ" size="small" type="primary">批量设置</el-button>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row v-if="ddsz">
                <el-col :span="14">
                  <el-form-item label="商品属性：">
                    <!-- sku表格 -->
                    <div class="mySkuTable">
                      <vxe-table border align="center" :data="skuTableData">
                        <vxe-table-column
                          v-for="item in sku"
                          :key="item.tit"
                          :field="item.tit"
                          :title="item.tit"
                          width="150"
                          show-overflow="title"
                        ></vxe-table-column>
                        <vxe-table-column field="pic" width="62" title="图片">
                          <template #default="{ row }">
                            <el-image
                              fit="fill"
                              style="
                                width: 40px;
                                height: 40px;
                                display: block;
                                cursor: pointer;
                                border: 1px solid #ddd;
                              "
                              :src="row.pic"
                            >
                              <div slot="error" class="image-slot">
                                <i class="el-icon-picture-outline"></i>
                              </div>
                            </el-image>
                          </template>
                        </vxe-table-column>
                        <vxe-table-column field="price" width="160" title="售价"></vxe-table-column>
                        <vxe-table-column v-if="yjsz" width="160" title="一级返佣(元)">
                          <template #default="{ row }">
                            <el-input type="number" v-model="row.brokerage"></el-input>
                          </template>
                        </vxe-table-column>
                        <vxe-table-column v-if="yjsz" width="160" title="二级返佣(元)">
                          <template #default="{ row }">
                            <el-input type="number" v-model="row.brokerage_two"></el-input>
                          </template>
                        </vxe-table-column>

                        <vxe-table-column v-if="hyjsz" width="160" title="会员价(元)">
                          <template #default="{ row }">
                            <el-input type="number" v-model="row.vip_price"></el-input>
                          </template>
                        </vxe-table-column>
                      </vxe-table>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="100">
                <el-col :span="7">
                  <el-form-item label="商品状态：">
                    <el-radio-group v-model="qtszForm.is_show">
                      <el-radio label="上架"></el-radio>
                      <el-radio label="下架"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="热卖单品：">
                    <el-radio-group v-model="qtszForm.is_show">
                      <el-radio label="开启"></el-radio>
                      <el-radio label="关闭"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="促销单品：">
                    <el-radio-group v-model="qtszForm.is_show">
                      <el-radio label="开启"></el-radio>
                      <el-radio label="关闭"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="100">
                <el-col :span="7">
                  <el-form-item label="精品推荐：">
                    <el-radio-group v-model="qtszForm.resource">
                      <el-radio label="开启"></el-radio>
                      <el-radio label="关闭"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="首发新品：">
                    <el-radio-group v-model="qtszForm.resource">
                      <el-radio label="开启"></el-radio>
                      <el-radio label="关闭"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="优品推荐：">
                    <el-radio-group v-model="qtszForm.resource">
                      <el-radio label="开启"></el-radio>
                      <el-radio label="关闭"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
          <div class="btnflex">
            <el-button size="small" @click="submitForm('ruleForm', '2')">上一步</el-button>
            <el-button size="small" type="primary" @click="qtszOnSubmit">保存</el-button>
          </div>
        </div>
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
import E from "wangeditor";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["shopObj"])
  },
  data() {
    return {
      content: "",
      ddsz: false,
      yjsz: false,
      hyjsz: false,
      options: [],
      options2: [],
      options3: [],
      imgFile: null,
      imgFileArr: [],
      activeName: "1",
      ruleForm: {
        storehouse_id: "",
        product_num: "",
        product_name: "",
        category_id: [],
        product_img: "",
        product_detail_imgs: ["", "", "", "", "", "", "", "", "", ""],
        // jingxuan: "",
        // shangxin: "",
        // rexiao: "",
        // status: "",
        // size_id: [],
        // size_name: [],
        // category_name: [],
        // tags_id: [],
        // tags_name: []
      },
      checkList: [],
      checkList2: [],
      rules: {
        product_name: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        cate_id: [
          { required: true, message: "请选择商品分类", trigger: "change" }
        ],
        unit_name: [{ required: true, message: "请输入单位", trigger: "blur" }],
        image: [
          { required: true, message: "请上传商品封面图", trigger: "change" }
        ],
        slider_image: [
          { required: true, message: "请上传商品轮播图", trigger: "change" }
        ],
        postage: [{ required: true, message: "请输入邮费", trigger: "blur" }]
      },
      addInp: "",
      // 是否添加规格（渲染按钮还是输入框）
      isAdd: false,
      // sku生成表格
      skuTableData: [],
      // 要根据这生成sku的列表
      sku: [
        // { tit: "颜色", arr: ["白色"], inpVal: "" },
        // { tit: "大小", arr: ["S", "M", "L"], inpVal: "" },
      ],
      // 添加sku大类
      addSkuDa: {
        gg: "",
        ggz: ""
      },
      editor: null,
      // 其他设置
      qtszForm: {
        ficti: "",
        give_integral: "",
        sort: "",
        ddsz: [],
        is_show: "上架"
      },
      // 批量设置
      plszForm: {
        brokerage: "",
        brokerage_two: "",
        vip_price: ""
      },
      id: ""
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.category({
        pid: 0
      });
      this.options = res.data.data;
      console.log(this.shopObj);
      const res2 = await this.$api.size({
        limit: 1000,
        page: 1
      });
      this.checkList = res2.data.data;
      const res3 = await this.$api.productstorehouse({
        limit: 1000,
        page: 1
      });
      this.options2 = res3.data.data;
      const res4 = await this.$api.tags({
        limit: 1000,
        page: 1
      });
      this.checkList2 = res4.data.data;
      if (this.shopObj) {
        this.id = this.shopObj.id;
        this.ruleForm = { ...this.shopObj };
        var arr = this.ruleForm.size_id.split(",");
        arr.forEach((ele, i) => {
          arr[i] = Number(ele);
        });
        var arr2 = this.ruleForm.category_id.split(",");
        arr2.forEach((ele, i) => {
          arr2[i] = Number(ele);
        });
        var arr3 = this.ruleForm.tags_id.split(",");
        arr3.forEach((ele, i) => {
          arr3[i] = Number(ele);
        });
        this.$set(this.ruleForm, "size_id", arr);
        this.$set(this.ruleForm, "category_id", arr2);
        this.$set(this.ruleForm, "tags_id", arr3);
        console.log(this.ruleForm);
      }
    },
    handleChange(value) {
      this.ruleForm.category_name = [];
      this.options.forEach(ele => {
        if (value.indexOf(ele.id) != -1) {
          this.ruleForm.category_name.push(ele.category_name);
        }
        if (ele.children) {
          ele.children.forEach(ele2 => {
            if (value.indexOf(ele2.id) != -1) {
              this.ruleForm.category_name.push(ele2.category_name);
            }
            if (ele2.children) {
              ele2.children.forEach(ele3 => {
                if (value.indexOf(ele3.id) != -1) {
                  this.ruleForm.category_name.push(ele3.category_name);
                }
              });
            }
          });
        }
      });
    },
    async onSubmit() {
      this.ruleForm.size_name = [];
      this.ruleForm.tags_name = [];
      console.log(this.ruleForm);
      this.checkList.forEach(ele => {
        if (this.ruleForm.size_id.indexOf(ele.id) != -1) {
          this.ruleForm.size_name.push(ele.size_name);
        }
      });
      this.checkList2.forEach(ele => {
        if (this.ruleForm.tags_id.indexOf(ele.id) != -1) {
          this.ruleForm.tags_name.push(ele.tags_name);
        }
      });
      console.log(this.ruleForm);
      if (this.shopObj) {
        const res = await this.$api.updateProduct(
          {
            size_name: this.ruleForm.size_name.toString(),
            category_name: this.ruleForm.category_name.toString(),
            category_id: this.ruleForm.category_id.toString(),
            storehouse_id: this.ruleForm.storehouse_id,
            product_num: this.ruleForm.product_num,
            product_name: this.ruleForm.product_name,
            product_img: this.ruleForm.product_img,
            product_detail_imgs: this.ruleForm.product_detail_imgs,
            jingxuan: this.ruleForm.jingxuan,
            shangxin: this.ruleForm.shangxin,
            rexiao: this.ruleForm.rexiao,
            status: this.ruleForm.status,
            size_id: this.ruleForm.size_id.toString(),
            tags_id: this.ruleForm.tags_id.toString(),
            tags_name: this.ruleForm.tags_name.toString()
          },
          this.id
        );
        if (res.code == 200) {
          this.$message({
            message: res.message,
            type: "success"
          });
          setTimeout(() => {
            this.$router.push({ name: "Shangpinguanli" });
          }, 500);
        } else {
          this.$message.error(res.message);
          this.getData();
        }
      } else {
        const res = await this.$api.addProduct({
          size_name: this.ruleForm.size_name.toString(),
          category_name: this.ruleForm.category_name.toString(),
          category_id: this.ruleForm.category_id.toString(),
          storehouse_id: this.ruleForm.storehouse_id,
          product_num: this.ruleForm.product_num,
          product_name: this.ruleForm.product_name,
          product_img: this.ruleForm.product_img,
          product_detail_imgs: this.ruleForm.product_detail_imgs,
          jingxuan: this.ruleForm.jingxuan,
          shangxin: this.ruleForm.shangxin,
          rexiao: this.ruleForm.rexiao,
          status: this.ruleForm.status,
          size_id: this.ruleForm.size_id.toString(),
          tags_id: this.ruleForm.tags_id.toString(),
          tags_name: this.ruleForm.tags_name.toString()
        });
        if (res.code == 200) {
          this.$message({
            message: res.message,
            type: "success"
          });
          setTimeout(() => {
            this.$router.push({ name: "Shangpinguanli" });
          }, 500);
        } else {
          this.$message.error(res.message);
          this.getData();
        }
      }
    },
    // 生成表格
    changeTable() {
      const that = this;
      var arr = [];
      for (let index = 0; index < that.sku.length; index++) {
        if (that.sku.length == 1) {
          that.sku[index].arr.forEach(ele => {
            var tit1 = that.sku[index].tit;
            arr.push({
              [tit1]: ele
            });
          });
        } else if (that.sku.length == 2) {
          that.sku[index].arr.forEach(ele => {
            var tit1 = that.sku[index].tit;
            that.sku[index + 1].arr.forEach(ele2 => {
              var tit2 = that.sku[index + 1].tit;
              arr.push({
                [tit1]: ele,
                [tit2]: ele2
              });
            });
          });
        } else if (that.sku.length == 3) {
          that.sku[index].arr.forEach(ele => {
            var tit1 = that.sku[index].tit;
            that.sku[index + 1].arr.forEach(ele2 => {
              var tit2 = that.sku[index + 1].tit;
              that.sku[index + 2].arr.forEach(ele3 => {
                var tit3 = that.sku[index + 2].tit;
                arr.push({
                  [tit1]: ele,
                  [tit2]: ele2,
                  [tit3]: ele3
                });
              });
            });
          });
        } else if (that.sku.length == 4) {
          that.sku[index].arr.forEach(ele => {
            var tit1 = that.sku[index].tit;
            that.sku[index + 1].arr.forEach(ele2 => {
              var tit2 = that.sku[index + 1].tit;
              that.sku[index + 2].arr.forEach(ele3 => {
                var tit3 = that.sku[index + 2].tit;
                that.sku[index + 3].arr.forEach(ele4 => {
                  var tit4 = that.sku[index + 3].tit;
                  arr.push({
                    [tit1]: ele,
                    [tit2]: ele2,
                    [tit3]: ele3,
                    [tit4]: ele4
                  });
                });
              });
            });
          });
        } else if (that.sku.length == 5) {
          that.sku[index].arr.forEach(ele => {
            var tit1 = that.sku[index].tit;
            that.sku[index + 1].arr.forEach(ele2 => {
              var tit2 = that.sku[index + 1].tit;
              that.sku[index + 2].arr.forEach(ele3 => {
                var tit3 = that.sku[index + 2].tit;
                that.sku[index + 3].arr.forEach(ele4 => {
                  var tit4 = that.sku[index + 3].tit;
                  that.sku[index + 4].arr.forEach(ele5 => {
                    var tit5 = that.sku[index + 4].tit;
                    arr.push({
                      [tit1]: ele,
                      [tit2]: ele2,
                      [tit3]: ele3,
                      [tit4]: ele4,
                      [tit5]: ele5
                    });
                  });
                });
              });
            });
          });
        }
        break;
      }
      console.log(arr);
      this.skuTableData = arr;
    },
    // 删除图片
    delImg(val, i = 0) {
      console.log(i);
      if (val == "fmt") {
        this.$set(this.ruleForm, "product_img", "");
      } else if (this.imgStatus == "tjt") {
        this.$set(this.ruleForm, "recommend_image", "");
      } else if (this.imgStatus == "lbt") {
        this.$set(this.ruleForm.product_detail_imgs, i, "");
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
    // 删除sku表格中一项
    delTabSku(rowIndex) {
      console.log(rowIndex);
      this.skuTableData.splice(rowIndex, 1);
    },
    // 上传图片
    companyList(val, i = 0) {
      this.imgIndex = i;
      this.imgStatus = val;
      this.$refs.fileInputList.click();
    },
    // 返佣批量设置
    fanyongPLSZ() {
      this.skuTableData.forEach((ele, i) => {
        this.$set(this.skuTableData[i], "brokerage", this.plszForm.brokerage);
        this.$set(
          this.skuTableData[i],
          "brokerage_two",
          this.plszForm.brokerage_two
        );
        this.$set(this.skuTableData[i], "vip_price", this.plszForm.vip_price);
      });
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
            this.$set(
              this.ruleForm.product_detail_imgs,
              this.imgIndex,
              `${this.$url}${res.data.path}`
            );
          } else if (this.imgStatus == "fmt") {
            this.$set(
              this.ruleForm,
              "product_img",
              `${this.$url}${res.data.path}`
            );
          } else if (this.imgStatus == "tjt") {
            this.$set(
              this.ruleForm,
              "recommend_image",
              `${this.$url}${res.data.path}`
            );
          } else if (this.imgStatus == "sku") {
            this.$set(
              this.skuTableData[this.imgIndex],
              "pic",
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
    submitForm(formName, i) {
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     alert("submit!");
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
      console.log(formName, this.ruleForm, this.skuTableData);
      this.activeName = i;
    },
    async qtszOnSubmit() {
      this.content = document.getElementsByClassName("w-e-text")[0].innerHTML;
      this.skuTableData.forEach(ele => {
        ele.detail = {};
        delete ele._XID;
        for (const key in ele) {
          var pattern = new RegExp("[\u4E00-\u9FA5]+");
          if (pattern.test(key)) {
            ele.detail[key] = ele[key];
            delete ele[key];
          }
        }
      });
      this.sku.forEach(ele => {
        ele.value = ele.tit;
        ele.detail = [...ele.arr];
        delete ele.inpVal;
        delete ele.tit;
        delete ele.arr;
      });
      console.log(this.ruleForm, this.qtszForm, this.skuTableData, this.sku);
      if (this.shopObj) {
        // 编辑
        const res = await this.$api.productSave({
          ...this.ruleForm,
          cate_id: this.ruleForm.cate_id[1].toString(),
          ...this.qtszForm,
          is_show: this.qtszForm.is_show == "上架" ? "1" : "0",
          attrs: this.skuTableData,
          items: this.sku,
          description: this.content,
          is_postage: "0",
          is_hot: "0",
          is_best: "0",
          is_new: "0",
          spec_type: "1",
          activity: "0,3",
          id: this.shopObj.id
        });
        console.log(res);
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          setTimeout(() => {
            this.$router.push({ name: "Shangpinguanli" });
          }, 500);
        } else {
          this.$message.error(res.msg);
          this.getData();
        }
      } else {
        const res = await this.$api.productSave({
          ...this.ruleForm,
          cate_id: this.ruleForm.cate_id[1].toString(),
          ...this.qtszForm,
          is_show: this.qtszForm.is_show == "上架" ? "1" : "0",
          attrs: this.skuTableData,
          items: this.sku,
          description: this.content,
          is_postage: "0",
          is_hot: "0",
          is_best: "0",
          is_new: "0",
          spec_type: "1",
          activity: "0,3"
        });
        console.log(res);
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          setTimeout(() => {
            this.$router.push({ name: "Shangpinguanli" });
          }, 500);
        } else {
          this.$message.error(res.msg);
          this.getData();
        }
      }
    },
    toBack() {
      this.$router.push({ name: "Shangpinguanli" });
    }
  },
  async mounted() {
    this.editor = new E("#editor");
    this.editor.config.menus = [
      "head",
      "bold",
      "fontSize",
      "fontName",
      "italic",
      "underline",
      "strikeThrough",
      "indent",
      "lineHeight",
      "foreColor",
      "backColor",
      "list",
      "justify",
      "emoticon",
      "image",
      "table",
      "undo",
      "redo"
    ];
    this.editor.config.uploadImgServer = "/upload-img";
    this.editor.config.uploadImgShowBase64 = true; // 使用 base64 保存图片
    this.editor.config.customUploadImg = async function(
      resultFiles,
      insertImgFn
    ) {
      // resultFiles 是 input 中选中的文件列表
      // insertImgFn 是获取图片 url 后，插入到编辑器的方法
      console.log(resultFiles);
      var reader = new FileReader();
      reader.readAsDataURL(resultFiles[0]); //通过文件流将文件转换成Base64字符串
      reader.onloadend = function() {
        //将转换结果赋值给img标签
        // preview.src = reader.result;
        //输出结果
        console.log(reader.result);
        insertImgFn(reader.result);
      };
      //   file_re = await that.readFileAsBuffer(resultFiles[0]);
    };
    this.editor.create();
    // if (this.shopObj) {
    //   const res = await this.$api.productDescription(this.shopObj.id);
    //   console.log(res, "xqxqxq");
    //   this.editor.txt.html(res.data.description);
    // }
    // this.getData();
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
      margin-top: 16px;
      min-width: 800px;
      width: 60vw;
      /deep/ .vxe-table--render-default .vxe-body--column {
        line-height: 40px;
      }
      /deep/ .el-input__inner {
        padding: 0 0 0 10px;
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
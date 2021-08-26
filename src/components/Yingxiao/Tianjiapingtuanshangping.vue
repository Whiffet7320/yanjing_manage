<template>
  <div class="index">
    <div class="nav1">
      <el-button @click="toBack" class="btn" size="small" icon="el-icon-arrow-left">返回</el-button>
      <div class="tit1">拼团商品</div>
    </div>
    <div class="nav2">
      <div class="tit1">
        <el-tabs v-model="activeName">
          <el-tab-pane label="商品信息" name="1"></el-tab-pane>
          <el-tab-pane label="商品详情" name="2"></el-tab-pane>
          <el-tab-pane label="其他设置" name="3"></el-tab-pane>
        </el-tabs>
        <!-- 商品信息 -->
        <template v-if="activeName == '1'">
          <div class="myForm">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="150px"
              class="demo-ruleForm"
            >
              <el-row>
                <el-col :span="12">
                  <el-form-item label="商品封面图：" prop="image">
                    <div @click="companyList('fmt')" class="myImg">
                      <el-image :src="ruleForm.image" fit="fill" style="width: 70px; height: 70px">
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
                  <el-form-item label="商品推荐图：">
                    <div @click="companyList('tjt')" class="myImg">
                      <el-image
                        :src="ruleForm.recommend_image"
                        fit="fill"
                        style="width: 70px; height: 70px"
                      >
                        <div slot="error" class="image-slot">
                          <i class="el-icon-picture-outline"></i>
                        </div>
                      </el-image>
                      <div @click.stop="delImg('tjt')" class="closeBtn">
                        <el-button circle>×</el-button>
                      </div>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="商品轮播图：" prop="slider_image">
                    <div
                      @click="companyList('lbt', i)"
                      class="myImg"
                      v-for="(item, i) in ruleForm.slider_image"
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
              <el-row>
                <el-col :span="12">
                  <el-form-item label="商品名称：" prop="name">
                    <el-input size="small" v-model="ruleForm.name"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- <el-row>
                <el-col :span="12">
                  <el-form-item label="商品分类：" prop="cate_id">
                    <el-cascader
                      v-model="ruleForm.cate_id"
                      size="small"
                      :options="options"
                      clearable
                    ></el-cascader>
                  </el-form-item>
                </el-col>
              </el-row>-->
              <el-row>
                <el-col :span="12">
                  <el-form-item size="small" label="商品简介：" prop="info">
                    <el-input type="textarea" v-model="ruleForm.info"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="拼团时间：" required>
                    <el-date-picker
                      @change="setTime"
                      value-format="timestamp"
                      size="small"
                      v-model="ruleForm.pingtuanTime"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="拼团时效(单位 小时)：" prop="effective_time">
                    <el-input size="small" v-model="ruleForm.effective_time"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="拼团人数：" prop="people">
                    <el-input size="small" v-model="ruleForm.people"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="虚拟成团补齐人数：" prop="virtual">
                    <el-input size="small" v-model="ruleForm.virtual"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="总购买数量限制：" prop="quota">
                    <el-input size="small" v-model="ruleForm.quota"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="单次购买数量限制：" prop="once_num">
                    <el-input size="small" v-model="ruleForm.once_num"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="单位：" prop="unit_name">
                    <el-input size="small" v-model="ruleForm.unit_name"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="选择规格：">
                    <!-- <div class="flex-gg">
                      <el-select
                        size="small"
                        v-model="ruleForm.region"
                        placeholder="请选择"
                      >
                        <el-option label="规格一" value="shanghai"></el-option>
                        <el-option label="规格二" value="beijing"></el-option>
                      </el-select>
                      <el-button size="small" type="primary">确定</el-button>
                      <el-button size="small">添加规格模板</el-button>
                    </div>-->
                    <!-- sku -->
                    <div class="sku" v-for="(item1, index) in sku" :key="index">
                      <div class="tit1">
                        <div class="txt1-1">{{ item1.tit }}</div>
                        <i @click="removeskuda(index)" class="el-icon-error"></i>
                      </div>
                      <div class="tit2" v-for="(item2, i) in item1.arr" :key="i">
                        <div class="blue"></div>
                        <div class="txt1">{{ item2 }}</div>
                        <div @click="removeskuxiao(index, i)" class="txt2">×</div>
                      </div>
                      <div class="addGg">
                        <el-input size="small" placeholder="请输入属性名称" v-model="item1.inpVal">
                          <el-button
                            slot="append"
                            @click="addskuxiao(item1)"
                            style="cursor: pointer"
                          >添加</el-button>
                        </el-input>
                      </div>
                    </div>
                    <div class="footer" v-if="!isAdd">
                      <el-button @click="isAdd = true" size="small" type="primary">
                        <span style="font-size: 12px">+</span>
                        添加新规格
                      </el-button>
                      <el-button @click="changeTable" size="small" type="success">立即生成</el-button>
                    </div>
                    <div class="footer footer2" v-if="isAdd">
                      <div class="tit1">
                        <div class="txt1">规格(中文)：</div>
                        <el-input size="small" v-model="addSkuDa.gg"></el-input>
                      </div>
                      <div class="tit1">
                        <div class="txt1 txt2">规格值：</div>
                        <el-input size="small" v-model="addSkuDa.ggz"></el-input>
                      </div>
                      <div class="btns">
                        <el-button @click="addskuda" size="small" type="primary">确定</el-button>
                        <el-button @click="isAdd = false" size="small">取消</el-button>
                      </div>
                    </div>
                    <!-- 批量sku表格 -->
                    <div v-if="skuTableData.length > 0" class="txtttt">批量设置：</div>
                    <div v-if="skuTableData.length > 0" class="mySkuTable">
                      <vxe-table border align="center" :data="skuTableData1">
                        <vxe-table-column field="pic" width="62" title="图片">
                          <template #default="{ row, rowIndex }">
                            <div @click="companyList('plSku', rowIndex)">
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
                            </div>
                          </template>
                        </vxe-table-column>
                        <vxe-table-column field="price" width="130" title="拼团价">
                          <template #default="{ row }">
                            <el-input type="number" v-model="row.price"></el-input>
                          </template>
                        </vxe-table-column>
                        <vxe-table-column field="cost" width="130" title="成本价">
                          <template #default="{ row }">
                            <el-input type="number" v-model="row.cost"></el-input>
                          </template>
                        </vxe-table-column>
                        <vxe-table-column field="ot_price" width="130" title="日常售价">
                          <template #default="{ row }">
                            <el-input type="number" v-model="row.ot_price"></el-input>
                          </template>
                        </vxe-table-column>
                        <vxe-table-column field="stock" width="130" title="库存">
                          <template #default="{ row }">
                            <el-input type="number" v-model="row.stock"></el-input>
                          </template>
                        </vxe-table-column>
                        <vxe-table-column field="weight" width="130" title="重量(KG)">
                          <template #default="{ row }">
                            <el-input type="number" v-model="row.weight"></el-input>
                          </template>
                        </vxe-table-column>
                        <vxe-table-column field="volume" width="130" title="体积(m³)">
                          <template #default="{ row }">
                            <el-input type="number" v-model="row.volume"></el-input>
                          </template>
                        </vxe-table-column>
                        <vxe-table-column field="volume" width="170" title="操作">
                          <template #default="{ rowIndex }">
                            <el-button @click="plszTabSku(rowIndex)" size="small" type="text">批量设置</el-button>
                          </template>
                        </vxe-table-column>
                      </vxe-table>
                    </div>
                    <!-- sku表格 -->
                    <div v-if="skuTableData.length > 0" class="txtttt">商品属性：</div>
                    <div v-if="skuTableData.length > 0" class="mySkuTable">
                      <vxe-table border align="center" :data="skuTableData">
                        <vxe-table-column
                          v-for="item in sku"
                          :key="item.tit"
                          :field="item.tit"
                          :title="item.tit"
                          width="70"
                          show-overflow="title"
                        ></vxe-table-column>
                        <vxe-table-column field="pic" width="62" title="图片">
                          <template #default="{ row, rowIndex }">
                            <div @click="companyList('sku', rowIndex)">
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
                            </div>
                          </template>
                        </vxe-table-column>
                        <vxe-table-column field="price" width="130" title="拼团价">
                          <template #default="{ row }">
                            <el-input type="number" v-model="row.price"></el-input>
                          </template>
                        </vxe-table-column>
                        <vxe-table-column field="cost" width="130" title="成本价">
                          <template #default="{ row }">
                            <el-input type="number" v-model="row.cost"></el-input>
                          </template>
                        </vxe-table-column>
                        <vxe-table-column field="ot_price" width="130" title="日常售价">
                          <template #default="{ row }">
                            <el-input type="number" v-model="row.ot_price"></el-input>
                          </template>
                        </vxe-table-column>
                        <vxe-table-column field="stock" width="130" title="库存">
                          <template #default="{ row }">
                            <el-input type="number" v-model="row.stock"></el-input>
                          </template>
                        </vxe-table-column>
                        <vxe-table-column field="weight" width="130" title="重量(KG)">
                          <template #default="{ row }">
                            <el-input type="number" v-model="row.weight"></el-input>
                          </template>
                        </vxe-table-column>
                        <vxe-table-column field="volume" width="130" title="体积(m³)">
                          <template #default="{ row }">
                            <el-input type="number" v-model="row.volume"></el-input>
                          </template>
                        </vxe-table-column>
                        <vxe-table-column field="volume" width="170" title="操作">
                          <template #default="{ rowIndex }">
                            <el-button @click="delTabSku(rowIndex)" size="small" type="text">删除</el-button>
                          </template>
                        </vxe-table-column>
                      </vxe-table>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="运费模板：" prop="postage">
                    <!-- <el-input
                      size="small"
                      v-model="ruleForm.postage"
                    ></el-input>-->
                    <el-select size="small" v-model="ruleForm.temp_id">
                      <el-option
                        v-for="item in postageOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      ></el-option>
                    </el-select>
                    <el-button style="margin-left:16px" size="small" @click="addPostage">添加运费模板</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item>
                <el-button size="small" type="primary" @click="submitForm('ruleForm', '2')">下一步</el-button>
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
            <el-form ref="form" :rules="rules" :model="qtszForm" label-width="100px">
              <el-row :gutter="100">
                <el-col :span="8">
                  <el-form-item label="销量：">
                    <el-input size="small" v-model="qtszForm.sales"></el-input>
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
                  <el-form-item label="热门单品：">
                    <el-radio-group v-model="qtszForm.is_hot">
                      <el-radio label="开启"></el-radio>
                      <el-radio label="关闭"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="新人专享：">
                    <el-radio-group v-model="qtszForm.is_new_user">
                      <el-radio label="开启"></el-radio>
                      <el-radio label="关闭"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row :gutter="100">
                <el-col :span="7">
                  <el-form-item label="一分购买：">
                    <el-radio-group v-model="qtszForm.is_cheap">
                      <el-radio label="开启"></el-radio>
                      <el-radio label="关闭"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="7">
                  <el-form-item label="抽取人数：" prop="pick_people">
                    <el-input v-model="qtszForm.pick_people"></el-input>
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
import E from "wangeditor";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["pintuanShopObj"])
  },
  watch: {
    "qtszForm.ddsz": function() {
      if (this.qtszForm.ddsz) {
        if (this.qtszForm.ddsz.indexOf("佣金设置") > -1) {
          this.ddsz = true;
          this.yjsz = true;
          this.ruleForm.is_sub = "1";
        } else {
          this.yjsz = false;
          this.ruleForm.is_sub = "";
        }
        if (this.qtszForm.ddsz.indexOf("付费会员价") > -1) {
          this.ddsz = true;
          this.hyjsz = true;
          this.ruleForm.is_vip = "1";
        } else {
          this.hyjsz = false;
          this.ruleForm.is_vip = "";
        }
        if (this.qtszForm.ddsz.length == 0) {
          this.ddsz = false;
        }
      }
    }
    // peisongCheckedCities: function() {
    //   this.peisongCheckedCities2 = [];
    //   console.log(this.peisongCheckedCities, "watch");
    //   this.peisongCheckedCities.forEach(ele => {
    //     this.peisongCheckedCities2.push(...ele.children);
    //   });
    // }
  },
  data() {
    return {
      // 选择可配送区域
      peisongDialogVisible: false,
      peisongCheckAll: false,
      peisongIsIndeterminate: false,
      peisongCityOptions: cityJson,
      peisongCheckedCities: [], //省
      // peisongCheckedCities2: [], //市
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
      ],
      bcErrow: "",
      content: "",
      ddsz: false,
      yjsz: false,
      hyjsz: false,
      options: [],
      imgFile: null,
      imgFileArr: [],
      activeName: "1",
      ruleForm: {
        name: "",
        unit_name: "",
        product_info: "",
        image: "",
        recommend_image: "",
        slider_image: ["", "", "", "", "", "", "", "", "", ""],
        temp_id: "", //运费模板
        is_sub: "",
        is_vip: "",
        people: "",
        virtual: "",
        quota: "",
        once_num: ""
      },
      postageOptions: [],
      rules: {
        name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
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
        postage: [{ required: true, message: "请输入邮费", trigger: "blur" }],
        info: [{ required: true, message: "请输入商品简介", trigger: "blur" }],
        people: [
          { required: true, message: "请输入拼团人数", trigger: "blur" }
        ],
        virtual: [
          {
            required: true,
            message: "请输入虚拟成团补齐人数",
            trigger: "blur"
          }
        ],
        quota: [
          { required: true, message: "请输入总购买数量限制", trigger: "blur" }
        ],
        once_num: [
          {
            required: true,
            message: "请输入单次购买数量限制",
            trigger: "blur"
          }
        ],
        effective_time: [
          { required: true, message: "请输入拼团时效", trigger: "blur" }
        ],
        pick_people: [
          { required: true, message: "请输入抽取人数", trigger: "blur" }
        ]
      },
      addInp: "",
      // 是否添加规格（渲染按钮还是输入框）
      isAdd: false,
      // sku生成表格
      skuTableData: [],
      // 批量sku表格
      skuTableData1: [
        {
          pic: ""
        }
      ],
      // 要根据这生成sku的列表
      sku: [
        // { tit: "颜色", arr: ["白色", "蓝色"], inpVal: "" },
        // { tit: "大小", arr: ["S"], inpVal: "" },
      ],
      // 添加sku大类
      addSkuDa: {
        gg: "",
        ggz: ""
      },
      editor: null,
      // 其他设置
      qtszForm: {
        sales: "",
        give_integral: "",
        sort: "",
        ddsz: [],
        is_show: "上架",
        is_hot: "",
        is_cheap: "",
        is_new_user: "",
        pick_people: ""
      },
      // 批量设置
      plszForm: {
        brokerage: "",
        brokerage_two: "",
        vip_price: ""
      }
    };
  },
  async created() {
    for (const key in this.peisongCityOptions) {
      this.shengJson.push({
        shengVal: key,
        children: this.peisongCityOptions[key],
        peisongCheckedCities: []
      });
    }
    this.getData();
  },
  methods: {
    async getMobanData() {
      const res = await this.$api.other_shipping_templates();
      console.log(res);
      this.postageOptions = res.data;
    },
    async getData() {
      this.getMobanData();
      if (this.sku) {
        this.changeTable();
      }
      // const res = await this.$api.categoryIndex({
      //   pid: 0,
      // });
      // console.log(res);
      // res.data.forEach((ele) => {
      //   ele.value = ele.id;
      //   ele.label = ele.cate_name;
      //   if (ele.children && ele.children.length > 0) {
      //     ele.children.forEach((item) => {
      //       item.value = item.id;
      //       item.label = item.cate_name;
      //       delete item.children;
      //     });
      //   }
      // });
      // this.options = res.data;
      console.log(this.pintuanShopObj);
      if (this.pintuanShopObj) {
        this.qtszForm.ddsz = [];
        // 编辑
        if (this.pintuanShopObj.is_sub == 1) {
          this.qtszForm.ddsz.push("佣金设置");
        }
        if (this.pintuanShopObj.is_vip == 1) {
          this.qtszForm.ddsz.push("付费会员价");
        }
        const res = await this.$api.combinationAttrs(this.pintuanShopObj.id);
        console.log(res);
        this.sku = res.data.attr;
        this.skuTableData = res.data.value;
        this.sku.forEach((ele, i) => {
          ele.inpVal = "";
          this.$set(this.sku[i], "tit", ele.value);
          this.$set(this.sku[i], "arr", ele.detail);
          delete this.sku[i].value;
          delete this.sku[i].detail;
        });
        console.log(this.sku);
        this.skuTableData.forEach(ele => {
          for (const key in ele) {
            if (key == "detail") {
              for (const key2 in ele[key]) {
                ele[key2] = ele[key][key2];
              }
            }
          }
        });
        console.log(this.skuTableData);
        this.ruleForm = { ...this.pintuanShopObj };
        this.qtszForm = {
          sales: this.pintuanShopObj.sales,
          give_integral: this.pintuanShopObj.give_integral,
          sort: this.pintuanShopObj.sort,
          is_show: this.pintuanShopObj.is_show == 1 ? "上架" : "下架",
          is_hot: this.pintuanShopObj.is_hot == 1 ? "开启" : "关闭",
          is_cheap: this.pintuanShopObj.is_cheap == 1 ? "开启" : "关闭",
          is_new_user: this.pintuanShopObj.is_new_user == 1 ? "开启" : "关闭",
          pick_people: this.pintuanShopObj.pick_people
        };
        // 分类
        // this.ruleForm.cate_id = [
        //   this.pintuanShopObj.product_cate_arr.cate_pid,
        //   this.pintuanShopObj.product_cate_arr.cate_id,
        // ];
        this.$set(this.ruleForm, "pingtuanTime", [
          this.pintuanShopObj.start_time * 1000,
          this.pintuanShopObj.stop_time * 1000
        ]);
        // this.ruleForm.pingtuanTime = [
        //   this.pintuanShopObj.start_time * 1000,
        //   this.pintuanShopObj.stop_time * 1000,
        // ];
        console.log(this.ruleForm.pingtuanTime);
      }
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
        this.getMobanData();
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
      // console.log(this.peisongCheckedCities, this.peisongCheckedCities2);
    },
    peisongChange(e, city) {
      console.log(e, city);
      city.peisongCheckedCities = e ? city.children : [];
      // console.log(e, this.peisongCheckedCities);
      // if (e == true) {
      //   let length = this.peisongCheckedCities.length;
      //   this.peisongCheckedCities[length - 1].myChildren = [
      //     ...this.peisongCheckedCities[length - 1].children
      //   ];
      //   this.peisongCheckedCities2.push(...this.peisongCheckedCities[length - 1].children);
      // } else {
      //   // this.peisongCheckedCities2 = [];
      //   this.peisongHandleCheckedCitiesChange2()
      // }
    },
    // 数组中的对象去重
    unique(arr) {
      return [...new Set(arr)];
    },
    peisongHandleCheckedCitiesChange2(e, city) {
      console.log(e, city);
      this.peisongCheckedCities.push(city);
      this.peisongCheckedCities = this.unique(this.peisongCheckedCities);
      // if (this.peisongCheckedCities.length > 0) {
      //   this.peisongCheckedCities.forEach(ele => {
      //     console.log(ele);
      //     if (ele.shengVal == city.shengVal) {
      //       return;
      //     }
      //   });
      // } else {
      //   this.peisongCheckedCities.push(city);
      // }
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
    // 添加运费模板
    addPostage() {
      this.addPostageDialogVisible = true;
    },
    addPostageHandleClose() {
      this.addPostageDialogVisible = false;
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
      if (this.mymyType != "bcErrow") {
        this.skuTableData = arr;
      }
    },
    setTime(val) {
      console.log(val);
    },
    // 删除图片
    delImg(val, i = 0) {
      console.log(i);
      if (val == "fmt") {
        this.$set(this.ruleForm, "image", "");
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
          this.imgFile.append("image[]", file);
          sessionStorage.setItem("img", 123);
          const res = await that.$api.productUpload(this.imgFile);
          console.log(res.data[0]);
          if (this.imgStatus == "lbt") {
            this.$set(this.ruleForm.slider_image, this.imgIndex, res.data[0]);
          } else if (this.imgStatus == "fmt") {
            this.$set(this.ruleForm, "image", res.data[0]);
          } else if (this.imgStatus == "tjt") {
            this.$set(this.ruleForm, "recommend_image", res.data[0]);
          } else if (this.imgStatus == "sku") {
            this.$set(this.skuTableData[this.imgIndex], "pic", res.data[0]);
          } else if (this.imgStatus == "plSku") {
            this.$set(this.skuTableData1[0], "pic", res.data[0]);
          }
          that.$refs.fileInputList.value = "";
          // this.slider_image[this.imgIndex] = res.data[0]
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
      const that = this;
      this.content = document.getElementsByClassName("w-e-text")[0].innerHTML;
      this.skuTableData.forEach(ele => {
        ele.detail = {};
        for (const key in ele) {
          var pattern = new RegExp("[\u4E00-\u9FA5]+");
          if (pattern.test(key)) {
            that.$set(ele.detail, key, ele[key]);
            console.log(ele, ele.detail);
            delete ele[key];
          }
        }
        console.log(ele.detail);
      });
      this.sku.forEach(ele => {
        ele.value = ele.tit;
        ele.detail = [...ele.arr];
        delete ele.inpVal;
        delete ele.tit;
        delete ele.arr;
      });
      console.log(this.ruleForm, this.qtszForm, this.skuTableData, this.sku);
      if (this.pintuanShopObj) {
        // 编辑
        const res = await this.$api.combinationSave({
          ...this.ruleForm,
          // cate_id: this.ruleForm.cate_id[1].toString(),
          start_time: this.ruleForm.pingtuanTime[0] / 1000,
          stop_time: this.ruleForm.pingtuanTime[1] / 1000,
          ...this.qtszForm,
          is_show: this.qtszForm.is_show == "上架" ? "1" : "0",
          is_hot: this.qtszForm.is_hot == "开启" ? "1" : "0",
          is_cheap: this.qtszForm.is_cheap == "开启" ? "1" : "0",
          is_new_user: this.qtszForm.is_new_user == "开启" ? "1" : "0",
          attrs: this.skuTableData,
          items: this.sku,
          description: this.content,
          is_postage: "0",
          is_best: "0",
          is_new: "0",
          spec_type: "1",
          activity: "0,3",
          id: this.pintuanShopObj.id
        });
        console.log(res);
        if (res.code == 200) {
          this.$message({
            message: res.msg,
            type: "success"
          });
          setTimeout(() => {
            this.$router.push({ name: "Pingtuanshangping" });
          }, 500);
        } else {
          // this.$message.error(res.msg);
          // this.getData();
          this.sku.forEach((ele, i) => {
            ele.inpVal = "";
            this.$set(this.sku[i], "tit", ele.value);
            this.$set(this.sku[i], "arr", ele.detail);
            delete this.sku[i].value;
            delete this.sku[i].detail;
          });
          this.mymyType = "bcErrow";
          this.$message.error(res.msg);
          this.getData();
        }
      } else {
        const res = await this.$api.combinationSave({
          ...this.ruleForm,
          // cate_id: this.ruleForm.cate_id[1].toString(),
          start_time: this.ruleForm.pingtuanTime[0] / 1000,
          stop_time: this.ruleForm.pingtuanTime[1] / 1000,
          ...this.qtszForm,
          is_show: this.qtszForm.is_show == "上架" ? "1" : "0",
          is_hot: this.qtszForm.is_hot == "开启" ? "1" : "0",
          is_cheap: this.qtszForm.is_cheap == "开启" ? "1" : "0",
          is_new_user: this.qtszForm.is_new_user == "开启" ? "1" : "0",
          attrs: this.skuTableData,
          items: this.sku,
          description: this.content,
          is_postage: "0",
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
            this.$router.push({ name: "Pingtuanshangping" });
          }, 500);
        } else {
          this.sku.forEach((ele, i) => {
            ele.inpVal = "";
            this.$set(this.sku[i], "tit", ele.value);
            this.$set(this.sku[i], "arr", ele.detail);
            delete this.sku[i].value;
            delete this.sku[i].detail;
          });
          this.mymyType = "bcErrow";
          this.$message.error(res.msg);
          this.getData();
        }
      }
    },
    toBack() {
      this.$router.push({ name: "Pingtuanshangping" });
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
    if (this.pintuanShopObj) {
      const res = await this.$api.combinationDescription(
        this.pintuanShopObj.id
      );
      console.log(res, "xqxqxq");
      this.editor.txt.html(res.data.description);
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
    .mySkuTable {
      // margin-top: 16px;
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
.txtttt {
  font-size: 12px;
  color: #606266;
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

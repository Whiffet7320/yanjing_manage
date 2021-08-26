<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">其他设置</div>
    </div>
    <div class="nav2">
      <div class="myForm">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="210px"
          class="demo-ruleForm"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="客服号码：" prop="kefu_num">
                <el-input size="small" v-model="ruleForm.kefu_num"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="客服微信：" prop="kefu_weixin">
                <el-input size="small" v-model="ruleForm.kefu_weixin"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="提现最低金额：" prop="withdrawal_limit">
                <el-input size="small" v-model="ruleForm.withdrawal_limit"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="邀请新用户可获得积分：" prop="get_user_integral">
                <el-input size="small" v-model="ruleForm.get_user_integral"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="拼团板块达到多少次可使用积分：" prop="pintuan_use_integral">
                <el-input size="small" v-model="ruleForm.pintuan_use_integral"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button
              icon="el-icon-s-promotion"
              size="small"
              type="primary"
              @click="submitForm('ruleForm')"
            >提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        get_user_integral: "",
        withdrawal_limit: "",
        pintuan_use_integral: "",
        kefu_num: "",
        kefu_weixin: ""
      },
      rules: {
        get_user_integral: [
          {
            required: true,
            message: "请输入邀请新用户可获得积分",
            trigger: "blur"
          }
        ],
        withdrawal_limit: [
          { required: true, message: "请输入提现最低金额", trigger: "blur" }
        ],
        pintuan_use_integral: [
          {
            required: true,
            message: "请输入拼团板块达到多少次可使用积分",
            trigger: "blur"
          }
        ],
        kefu_num: [
          { required: true, message: "请输入客服号码", trigger: "blur" }
        ],
        kefu_weixin: [
          { required: true, message: "请输入客服微信", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.webconfigIndex();
      console.log(res);
      this.ruleForm = {
        ...res.data
      };
    },
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          await this.$api.webconfigSave({
            tag: "pintuan_use_integral",
            value: this.ruleForm.pintuan_use_integral
          });
          await this.$api.webconfigSave({
            tag: "kefu_num",
            value: this.ruleForm.kefu_num
          });
          await this.$api.webconfigSave({
            tag: "kefu_weixin",
            value: this.ruleForm.kefu_weixin
          });
          await this.$api.webconfigSave({
            tag: "get_user_integral",
            value: this.ruleForm.get_user_integral
          });
          const res3 = await this.$api.webconfigSave({
            tag: "withdrawal_limit",
            value: this.ruleForm.withdrawal_limit
          });
          console.log(res3);
          if (res3.code == 200) {
            this.$message({
              message: res3.msg,
              type: "success"
            });
          }
        } else {
          return false;
        }
      });
      console.log(formName, this.ruleForm);
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
    }
  }
}
</style>
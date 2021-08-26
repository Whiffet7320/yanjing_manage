<template>
  <div class="index">
    <div class="nav1">
      <div class="tit1">分销设置</div>
    </div>
    <div class="nav2">
      <div class="myForm">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="160px"
          class="demo-ruleForm"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="一级返佣比例(%)：" prop="brokerage">
                <el-input size="small" v-model="ruleForm.brokerage"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="二级返佣比例(%)：" prop="brokerage_two">
                <el-input size="small" v-model="ruleForm.brokerage_two"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="三级返佣比例(%)：" prop="brokerage_third">
                <el-input size="small" v-model="ruleForm.brokerage_third"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="平级返佣比例(%)：" prop="same_brokerage">
                <el-input size="small" v-model="ruleForm.same_brokerage"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="团队返佣比例(%)：" prop="team_brokerage">
                <el-input size="small" v-model="ruleForm.team_brokerage"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="升级到lv1所需人数：" prop="agent_lv1">
                <el-input size="small" v-model="ruleForm.agent_lv1"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="升级到lv2所需人数：" prop="agent_lv2">
                <el-input size="small" v-model="ruleForm.agent_lv2"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="升级到lv3所需人数：" prop="agent_lv3">
                <el-input size="small" v-model="ruleForm.agent_lv3"></el-input>
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
        brokerage: "",
        brokerage_two: "",
        brokerage_third: "",
        agent_lv1: "",
        agent_lv2: "",
        agent_lv3: "",
        team_brokerage: "",
        same_brokerage: ""
      },
      rules: {
        brokerage: [
          { required: true, message: "请输入一级返佣比例", trigger: "blur" }
        ],
        brokerage_two: [
          { required: true, message: "请输入二级返佣比例", trigger: "blur" }
        ],
        brokerage_third: [
          { required: true, message: "请输入三级返佣比例", trigger: "blur" }
        ],
        agent_lv1: [
          {
            required: true,
            message: "请输入升级到lv1所需人数",
            trigger: "blur"
          }
        ],
        agent_lv2: [
          {
            required: true,
            message: "请输入升级到lv2所需人数",
            trigger: "blur"
          }
        ],
        agent_lv3: [
          {
            required: true,
            message: "请输入升级到lv3所需人数",
            trigger: "blur"
          }
        ],
        team_brokerage: [
          { required: true, message: "请输入团队分佣比例", trigger: "blur" }
        ],
        same_brokerage: [
          { required: true, message: "请输入平级反佣比例", trigger: "blur" }
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
            tag: "brokerage",
            value: this.ruleForm.brokerage
          });
          await this.$api.webconfigSave({
            tag: "brokerage_two",
            value: this.ruleForm.brokerage_two
          });
          await this.$api.webconfigSave({
            tag: "brokerage_third",
            value: this.ruleForm.brokerage_third
          });
          await this.$api.webconfigSave({
            tag: "agent_lv1",
            value: this.ruleForm.agent_lv1
          });
          await this.$api.webconfigSave({
            tag: "agent_lv2",
            value: this.ruleForm.agent_lv2
          });
          await this.$api.webconfigSave({
            tag: "agent_lv3",
            value: this.ruleForm.agent_lv3
          });
          await this.$api.webconfigSave({
            tag: "team_brokerage",
            value: this.ruleForm.team_brokerage
          });
          const res3 = await this.$api.webconfigSave({
            tag: "same_brokerage",
            value: this.ruleForm.same_brokerage
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
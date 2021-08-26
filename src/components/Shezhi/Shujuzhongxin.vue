<template>
  <div class="index">
    <div class="tag">
      <el-tag effect="dark">订单数据</el-tag>
    </div>
    <div class="top">
      <div class="box">
        <div class="icon1">
          <div class="icon2">
            <i class="el-icon-s-order"></i>
          </div>
        </div>
        <div class="tit">
          <div class="txt1">{{order.today}}</div>
          <div class="txt2">当天订单数量</div>
        </div>
      </div>
      <div class="box">
        <div class="icon1 i1-2">
          <div class="icon2 i1-2">
            <i class="el-icon-s-claim"></i>
          </div>
        </div>
        <div class="tit">
          <div class="txt1">{{order.seven_today}}</div>
          <div class="txt2">近七天订单数量</div>
        </div>
      </div>
      <div class="box">
        <div class="icon1 i1-3">
          <div class="icon2 i1-3">
            <i class="el-icon-s-release"></i>
          </div>
        </div>
        <div class="tit">
          <div class="txt1">{{order.half_year}}</div>
          <div class="txt2">近半年订单数量</div>
        </div>
      </div>
      <div class="box">
        <div class="icon1 i1-4">
          <div class="icon2 i1-4">
            <i class="el-icon-s-flag"></i>
          </div>
        </div>
        <div class="tit">
          <div class="txt1">{{order.year}}</div>
          <div class="txt2">近一年订单数量</div>
        </div>
      </div>
    </div>
    <div class="tag">
      <el-tag type="success" effect="dark">用户数据</el-tag>
    </div>
    <div class="top">
      <div class="box">
        <div class="icon1">
          <div class="icon2">
            <i class="el-icon-s-order"></i>
          </div>
        </div>
        <div class="tit">
          <div class="txt1">{{user.today}}</div>
          <div class="txt2">当天注册人数</div>
        </div>
      </div>
      <div class="box">
        <div class="icon1 i1-2">
          <div class="icon2 i1-2">
            <i class="el-icon-s-claim"></i>
          </div>
        </div>
        <div class="tit">
          <div class="txt1">{{user.seven_today}}</div>
          <div class="txt2">近七天注册人数</div>
        </div>
      </div>
      <div class="box">
        <div class="icon1 i1-3">
          <div class="icon2 i1-3">
            <i class="el-icon-s-release"></i>
          </div>
        </div>
        <div class="tit">
          <div class="txt1">{{user.half_year}}</div>
          <div class="txt2">近半年注册人数</div>
        </div>
      </div>
      <div class="box">
        <div class="icon1 i1-4">
          <div class="icon2 i1-4">
            <i class="el-icon-s-flag"></i>
          </div>
        </div>
        <div class="tit">
          <div class="txt1">{{user.year}}</div>
          <div class="txt2">近一年注册人数</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: {
        half_year: "",
        seven_today: "",
        today: "",
        year: ""
      },
      user: {
        half_year: "",
        seven_today: "",
        today: "",
        year: ""
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.data_center();
      console.log(res);
      this.order = res.data.order;
      this.user = res.data.user;
    }
  }
};
</script>

<style lang="scss" scoped>
.index {
}
.tag{
    margin-bottom: 10px;
}
.top {
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0 0 20px 0;
  height: 120px;
  .box {
    &:nth-child(4) {
      margin-right: 0px;
    }
    border-radius: 10px;
    height: 100%;
    width: 25%;
    background: #ffffff;
    margin-right: 16px;
    display: flex;
    align-items: center;
    padding: 0 25px;
    .icon1.i1-2 {
      background: #fff3e0;
      .icon2.i1-2 {
        background: #ffab2b;
      }
    }
    .icon1.i1-3 {
      background: #eaf9e1;
      .icon2.i1-3 {
        background: #6dd230;
      }
    }
    .icon1.i1-4 {
      background: #ffeaf4;
      .icon2.i1-4 {
        background: #ff85c0;
      }
    }
    .icon1 {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: #e4ecff;
      .icon2 {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: #4d7cfe;
        .el-icon-s-order {
          font-size: 26px;
          color: #ffffff;
        }
        .el-icon-s-release {
          font-size: 26px;
          color: #ffffff;
        }
        .el-icon-s-claim {
          font-size: 26px;
          color: #ffffff;
        }
        .el-icon-s-flag {
          font-size: 26px;
          color: #ffffff;
        }
      }
    }
    .tit {
      margin-left: 30px;
      height: 50px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .txt1 {
        color: rgb(37, 38, 49);
        font-size: 24px;
      }
      .txt2 {
        color: rgb(152, 169, 188);
        font-size: 12px;
      }
    }
  }
}
</style>
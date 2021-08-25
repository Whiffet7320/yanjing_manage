<template>
  <div class="index">
    <div class="top">
      <div class="box">
        <div class="icon1">
          <div class="icon2">
            <i class="el-icon-s-order"></i>
          </div>
        </div>
        <div class="tit">
          <div class="txt1">{{wait_send}}</div>
          <div class="txt2">待发货订单数</div>
        </div>
      </div>
      <div class="box">
        <div class="icon1 i1-2">
          <div class="icon2 i1-2">
            <i class="el-icon-s-claim"></i>
          </div>
        </div>
        <div class="tit">
          <div class="txt1">{{wait_check}}</div>
          <div class="txt2">待售后订单数</div>
        </div>
      </div>
      <div class="box">
        <div class="icon1 i1-3">
          <div class="icon2 i1-3">
            <i class="el-icon-s-release"></i>
          </div>
        </div>
        <div class="tit">
          <div class="txt1">{{wait_refund}}</div>
          <div class="txt2">待退款订单数</div>
        </div>
      </div>
    </div>
    <div id="main1"></div>
    <div id="main2"></div>
    <div id="main3"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
        wait_send:0,
        wait_check:0,
        wait_refund:0,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await this.$api.dashboard();
      console.log(res);
      this.wait_send = res.data.wait_send;
      this.wait_check = res.data.wait_check;
      this.wait_refund = res.data.wait_refund;
      var chartDom1 = document.getElementById("main1");
      var myChart1 = echarts.init(chartDom1);
      var chartDom2 = document.getElementById("main2");
      var myChart2 = echarts.init(chartDom2);
      var chartDom3 = document.getElementById("main3");
      var myChart3 = echarts.init(chartDom3);
      var option1 = {
        title: {
          x: "20",
          text: "近7天订单数"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["订单数"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          x: "180",
          y: "-2",
          feature: {
            saveAsImage: {
              //保存图片
              show: true
            }
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "订单数",
            type: "line",
            stack: "总量"
          }
        ]
      };
      var option2 = {
        title: {
          x: "20",
          text: "近7天新增用户数"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["新增用户数"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          x: "180",
          y: "-2",
          feature: {
            saveAsImage: {
              //保存图片
              show: true
            }
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "新增用户数",
            type: "line",
            stack: "总量",
            itemStyle: {
              normal: {
                color: "#ff9900",
                borderColor: "#ff9900" //拐点边框颜色
              }
            }
          }
        ]
      };
      var option3 = {
        title: {
          x: "20",
          text: "近7天活跃用户数"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["活跃用户数"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          x: "180",
          y: "-2",
          feature: {
            saveAsImage: {
              //保存图片
              show: true
            }
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "活跃用户数",
            type: "line",
            stack: "总量",
            itemStyle: {
              normal: {
                color: "#19be6b",
                borderColor: "#19be6b" //拐点边框颜色
              }
            }
          }
        ]
      };
      let week_orderKeyArr = [];
      let week_orderZhiArr = [];
      for (const key in res.data.week_order) {
        week_orderKeyArr.push(key);
        week_orderZhiArr.push(res.data.week_order[key]);
      }
      option1.xAxis.data = week_orderKeyArr;
      option1.series[0].data = week_orderZhiArr;
      option1 && myChart1.setOption(option1);
      let week_new_userKeyArr = [];
      let week_new_userZhiArr = [];
      for (const key in res.data.week_new_user) {
        week_new_userKeyArr.push(key);
        week_new_userZhiArr.push(res.data.week_new_user[key]);
      }
      option2.xAxis.data = week_new_userKeyArr;
      option2.series[0].data = week_new_userZhiArr;
      option2 && myChart2.setOption(option2);
      let week_activity_userKeyArr = [];
      let week_activity_userZhiArr = [];
      for (const key in res.data.week_activity_user) {
        week_activity_userKeyArr.push(key);
        week_activity_userZhiArr.push(res.data.week_activity_user[key]);
      }
      option3.xAxis.data = week_activity_userKeyArr;
      option3.series[0].data = week_activity_userZhiArr;
      option3 && myChart3.setOption(option3);
    }
  }
};
</script>

<style lang="scss" scoped>
.index {
}
.top {
  width: 100%;
  display: flex;
  align-items: center;
  margin: 0 0 20px 0;
  height: 120px;
  .box {
    &:nth-child(3) {
      margin-right: 0px;
    }
    border-radius: 10px;
    height: 100%;
    width: 33.3%;
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
        .el-icon-s-release{
            font-size: 26px;
          color: #ffffff;
        }
        .el-icon-s-claim{
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
#main1 {
  width: 100%;
  height: 300px;
  background: #ffffff;
  padding: 14px 0px;
  border-radius: 10px;
}
#main2 {
  margin-top: 20px;
  width: 100%;
  height: 300px;
  background: #ffffff;
  padding: 14px 0px;
  border-radius: 10px;
}
#main3 {
  margin-top: 20px;
  width: 100%;
  height: 300px;
  background: #ffffff;
  padding: 14px 0px;
  border-radius: 10px;
}
</style>
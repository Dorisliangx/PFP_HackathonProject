const Util = require('../../utils/util.js')
// var app = getApp()
Page({
    // 定义转发
    onShareAppMessage: Util.shareConfig,
    data: {
        amount: 0,
        startDte:"2024-04-12",
        date:'', //用户选择的目标日期
        targetAmount:0,
        monthlyIncome:0,
        monthlyExpenses:0,
        result:0,
        monthlyTarget: 0,
        disposableIncome: 0
    },
    onLoad() {
        this.setData({
            startDate: this.getTodayDate()  // 设置当前日期为起始日期
        });
        wx.setNavigationBarTitle({ title: '计算器' })
    },
    getTodayDate() {
        const today = new Date();
        return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    },
    inputFn(e) {
      // 使用 e.currentTarget.dataset.name 来识别是哪个输入
      const name = e.currentTarget.dataset.name;
      const value = parseFloat(e.detail.value);
      this.setData({ [name]: value });  // 动态更新数据
    },
    // 日期选择器变化时触发的事件处理函数
    bindDateChange: function (e) {
    this.setData({
      date: e.detail.value // 更新页面数据中的日期值为选择的日期
    });
    },
    // onLoad() {
    //   wx.setNavigationBarTitle({ title: '计算器' })
    // },
    daysBetween(startDate, endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end - start);
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  },
  calculate() {
      const { targetAmount, monthlyIncome, monthlyExpenses, date, startDate } = this.data;
      const daysDiff = this.daysBetween(startDate, date);
      const monthsDiff = Math.ceil(daysDiff / 30);  // 简单把每月按30天算
      const monthlyTarget = targetAmount / monthsDiff;
      const disposableIncome = monthlyIncome - monthlyExpenses;
      const result = disposableIncome - monthlyTarget;
      this.setData({
          monthlyTarget: monthlyTarget.toFixed(2),
          disposableIncome: disposableIncome.toFixed(2),
          result: result.toFixed(2)
      });
     

      // 判断结果正负，显示不同的弹窗
      if (result < 0) {
          // 更新全局变量
          const app = getApp();
          app.globalData.monthsDiff = monthsDiff;  // 存储结果到全局变量
          wx.showModal({
              title: '额外收入需要',
              content: `你每月需要额外投资收入：${Math.abs(result).toFixed(2)}元`,
              showCancel: false,
              confirmText: '我知道了'
          });
      } else {
          wx.showModal({
              title: '存款计划',
              content: '您的每月存取金额可以达到目标金额计划！',
              showCancel: false,
              confirmText: '太好了'
          });
      }

      console.log(`所需月份数: ${monthsDiff}`);
      console.log(`每月存下金额: ${monthlyTarget.toFixed(2)}元`);
      console.log(`每月可支配金额: ${disposableIncome.toFixed(2)}元`);
      console.log(`所需结果（可支配金额 - 每月目标金额）: ${result.toFixed(2)}元`);
  }
})
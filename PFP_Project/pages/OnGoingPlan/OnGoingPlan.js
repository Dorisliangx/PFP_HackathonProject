// page.js
const db = wx.cloud.database();

Page({
  data: {
    target: 0,
    sum: 0,
    planId: '',
    recordList: [],
    showDialog: false,
    newMoney: 0,
    newComment: ''
  },

  onLoad: function () {
    // 查询 'plan' 集合的数据
    this.queryPlanData();
    // 查询 'saveRecord' 集合的数据
    this.querySaveRecord();
  },

  // 查询 'plan' 集合的数据方法
  queryPlanData: function () {
    db.collection('plan').get().then(res => {
      const planData = res.data.find(item => item.target > item.sum);
      if (planData) {
        console.log('成功获取到满足条件的 plan 集合数据：', planData);
        this.setData({
          target: planData.target,
          sum: planData.sum,
          planId: planData._id
        });
        console.log('成功获取到记录的 id：', planData._id);
      } else {
        console.log('未找到满足条件的数据');
      }
    }).catch(err => {
      console.error('查询 plan 集合数据失败：', err);
    });
  },


  // 查询 'saveRecord' 集合的数据方法
  querySaveRecord: function () {
    db.collection('saveRecord')
      .get().then(res => {
      this.setData({
        recordList: res.data
      });
    }).catch(err => {
      console.error('查询saveRecord集合数据失败：', err);
    });
  },

  navigateBack: function () {
    wx.navigateBack({
      delta: 1
    });
  },

  showAddDialog: function () {
    this.setData({
      showDialog: true
    });
  },

  onMoneyInput: function (e) {
    this.setData({
      newMoney: e.detail.value
    });
  },

  onCommentInput: function (e) {
    this.setData({
      newComment: e.detail.value
    });
  },

  saveRecord: function () {
    // 检查 newMoney 是否为空
    console.log("newmoney",this.data.newMoney);
    if (!this.data.newMoney) {
      wx.showToast({
        title: '请输入存储的金额',
        icon: 'none'
      });
      return; // 如果 newMoney 为空，则结束函数
    }
    // 获取当前时间
    const now = new Date();
    const time = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
  
    // 向 'saveRecord' 集合中添加数据
    db.collection('saveRecord').add({
      data: {
        AddMoney: this.data.newMoney,
        comment: this.data.newComment,
        time: time
      }
    }).then(res => {
      // 添加成功
      wx.showToast({
        title: '添加成功',
        icon: 'success'
      });
      this.setData({
        showDialog: false,
        newMoney: 0,
        newComment: ''
      });
  
      // 在添加成功后，更新 'plan' 集合的 sum 字段
      const id = this.data.planId; // 获取当前 plan 集合的 id
      const newSum = this.data.sum + parseFloat(this.data.newMoney); // 将 newMoney 加入 sum 中
      console.log('当前 plan 记录的 id 为：', id);
      console.log('当前 sum 的值为：', this.data.sum);
      console.log('要添加的金额为：', this.data.newMoney);
      console.log('计算后的新 sum 值为：', newSum);
  
      db.collection('plan').doc(id).update({
        data: {
          sum: newSum
        }
      }).then(res => {
        console.log('成功更新 plan 集合的 sum 字段');
        // 更新成功后刷新查询 'plan' 集合的数据
        this.queryPlanData();
      }).catch(err => {
        console.error('更新 plan 集合的 sum 字段失败：', err);
      });
  
    }).catch(err => {
      // 添加失败
      wx.showToast({
        title: '添加失败，请重试',
        icon: 'none'
      });
    });
  }
});
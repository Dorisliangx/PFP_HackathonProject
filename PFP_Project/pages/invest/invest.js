// pages/invest/invest.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newList:[
    
    ]
  },

   // 跳转到运动常识详情页面
    goToDetailPage: function (e) {
      const knowledgeId = e.currentTarget.dataset.id; // 获取点击的运动常识的 ID
      // 示例代码：跳转到运动常识详情页面，传递 knowledgeId 参数
      wx.navigateTo({
        url: '/pages/investDetail/investDetail?id=' + knowledgeId
      });
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
       // 从数据库或其他数据源获取运动常识数据，更新到 knowledgeList 中
      // 示例代码：
       const app = getApp();
       console.log('Accessing date:', app.globalData.monthsDiff);
      const flag=app.globalData.monthsDiff;
       const db = wx.cloud.database();
      const _ = db.command;
        if(flag<3 && flag!=0){
          db.collection('investment').where({type:"1-3个月"}).get().then(res => {
                  console.log('运动常识数据', res.data);
                  this.setData({
                    newList: res.data
                  });
                }).catch(err => {
                  console.error('获取运动常识数据失败：', err);
                });
      }else if(flag>=3 && flag <6){
        db.collection('investment').where({type:"3-6个月"}).get().then(res => {
          console.log('运动常识数据', res.data);
          this.setData({
            newList: res.data
          });
        }).catch(err => {
          console.error('获取运动常识数据失败：', err);
        });
      }else if(flag==0){
        db.collection('investment').get().then(res => {
          console.log('运动常识数据', res.data);
          this.setData({
            newList: res.data
          });
        }).catch(err => {
          console.error('获取运动常识数据失败：', err);
        });
      }
      else{
        db.collection('investment').where({type:"6个月以上"}).get().then(res => {
          console.log('运动常识数据', res.data);
          this.setData({
            newList: res.data
          });
        }).catch(err => {
          console.error('获取运动常识数据失败：', err);
        });
      }
     
     
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
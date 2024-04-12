// pages/dreamlist/dreamlist.js
wx.cloud.init({
  env: 'bishe-7g9u6easfe5a79a7', //填上你的云开发环境id
  traceUser: true,
})
//云数据库初始化
const db = wx.cloud.database({});
const cont = db.collection('plan');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ne:[],//存放云开发获取的数组
    result:[],//存放sum>target
  },
  click: function (e) { 
    console.log("按了：", e.currentTarget.id)
  },

  
//跳转我的页面
  gotoMinedata: function (options) {
    console.log("跳转我的")
    wx.switchTab({
          url: '../minedata/minedata',//要跳转到的页面路径
  })  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this;
    //1、引用数据库   
    const db = wx.cloud.database({
      //这个是环境ID不是环境名称     
      env: 'bishe-7g9u6easfe5a79a7'
    })
    //2、开始查询数据了  news对应的是集合的名称   
    db.collection('plan').get({
      //如果查询成功的话    
      success: res => {
        console.log("获取plan数据")
        console.log(res.data)
        //这一步很重要，给ne赋值，没有这一步的话，前台就不会显示值      
        this.setData({
          ne: res.data,
          // result:this.data.ne.filter(function(item){
          //   //条件
          //   return item.sum > item.target;
          // })
        })
        this.setData({
          // 使用数组的map方法遍历ne数组，返回符合条件的元素
          result: this.data.ne.map(item => {
            if (item.sum >= item.target) {
              return item;
            }
          }).filter(Boolean) // 去除map产生的undefined元素
        });
        
        console.log("ne是：")
        console.log(this.data.ne)
        console.log("result值是：")
        console.log(this.data.result);
        
      }
    })
    

   

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
// pages/minedata/minedata.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    progress_txt: '理财进行中...',
    count: 0, // 设置 计数器 初始为0
    countTimer: null, // 设置 定时器 初始为null
    progress:0.5
  },
 //倒计时方法
//  countInterval: function () {
//   // 设置倒计时 定时器 每100毫秒执行一次，计数器count+1 ,耗时6秒绘一圈
//   this.countTimer = setInterval(() => {
//     if (this.data.count <= 60) {
//       /* 绘制彩色圆环进度条  
//       注意此处 传参 step 取值范围是0到2，
//       所以 计数器 最大值 60 对应 2 做处理，计数器count=60的时候step=2
//       */
//       this.drawProgressCircle(this.data.count / (60 / 2));
//       this.setData({
//         progress_txt: (this.data.count++) + '%'
//       });
//     } else if(this.data.progress==1){
//       this.setData({
//         progress_txt: "加载完成"
//       });
//       clearInterval(this.countTimer);
//     }
//   }, 100)
// },
/**
 * 绘制灰色背景
 */
drawProgressbg: function () {
  // 使用 wx.createContext 获取绘图上下文 context
  var ctx = null;
  wx.createSelectorQuery()
    .select("#canvasProgressbg")
    .context(function (res) {
      console.log("节点实例：", res);
      // 节点对应的 Canvas 实例。
      ctx = res.context;
      ctx.setLineWidth(4); // 设置圆环的宽度
      ctx.setStrokeStyle('#EEEEEE'); // 设置圆环的颜色
      ctx.setLineCap('round') // 设置圆环端点的形状
      ctx.beginPath(); //开始一个新的路径
      ctx.arc(50, 50, 45, 0, 2 * Math.PI, false);
      //设置一个原点(110,110)，半径为100的圆的路径到当前路径
      ctx.stroke(); //对当前路径进行描边
      ctx.draw();
    })
    .exec();


},
/**
 * 绘制小程序进度
 * @param {*} step 
 */
drawProgressCircle: function (step) {
  if(step==2){
    this.setData({
      progress_txt: "目标完成"
    });
  }
  let ctx = null;
  wx.createSelectorQuery()
    .select("#canvasProgress")
    .context(function (res) {
      console.log("节点实例：", res); // 节点对应的 Canvas 实例。
      ctx = res.context;
      // 设置渐变
      var gradient = ctx.createLinearGradient(200, 100, 100, 200);
      gradient.addColorStop("0", "#2661DD");
      gradient.addColorStop("0.5", "#40ED94");
      gradient.addColorStop("1.0", "#5956CC");

      ctx.setLineWidth(10);
      ctx.setStrokeStyle(gradient);
      ctx.setLineCap('round')
      ctx.beginPath();
      // 参数step 为绘制的圆环周长，从0到2为一周 。 -Math.PI / 2 将起始角设在12点钟位置 ，结束角 通过改变 step 的值确定
      ctx.arc(50, 50, 45, -Math.PI / 2, step * Math.PI - Math.PI / 2, false);
      ctx.stroke();
      ctx.draw()
    })
    .exec();

},


  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.drawProgressbg();
    //this.countInterval()
   //设置那个圆的绘制多少
    this.drawProgressCircle(this.data.progress*2);
  },

  //js部分示例代码
//跳转到非tabBar页面  
  gotoDreamList: function (options) {
    wx.navigateTo({
          url: '../dreamlist/dreamlist',//要跳转到的页面路径
  })  
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
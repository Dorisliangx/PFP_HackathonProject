// app.js
App({
  globalData: {
    monthsDiff: 0  // 初始值设置为 0
  },
  onLaunch: function() {
    // 初始化云开发环境
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数决定接下来数据库 API 访问哪个环境的云数据库
        env: 'bishe-7g9u6easfe5a79a7',  // 替换成你的云开发环境ID
        traceUser: true,
      });
    }
    // 其他的 app onLaunch 初始化内容
  }
})

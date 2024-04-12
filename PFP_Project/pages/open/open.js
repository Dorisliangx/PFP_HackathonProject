Page({
    onLoad: function () {
      // 延时3秒后跳转到目标页面
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/calculate/calculate'
        });
      }, 9000);
    },
    // 点击任意地方触发跳转
    onTap: function () {
      wx.switchTab({
        url: '/pages/calculate/calculate'
      });
    }
  });
  
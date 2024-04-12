// pages/login/login.js
Page({
  data: {
    username: '',
    password: ''
  },

  bindInput: function(e) {
    const field = e.currentTarget.dataset.field;
    this.setData({
      [field]: e.detail.value
    });
  },

  register: function() {
    const { username, password } = this.data;
    console.log(username,password);
    if (!username || !password) {
      wx.showToast({
        title: '用户名和密码不能为空',
        icon: 'none'
      });
      return;
    }
    // 添加到数据库
    const db = wx.cloud.database();
    db.collection('user').add({
      data: { username, password },
      success: res => {
        wx.showToast({
          title: '注册成功',
          icon: 'success'
        });
      },
      fail: err => {
        wx.showToast({
          title: '注册失败',
          icon: 'none'
        });
      }
    });
  },

  login: function() {
    const { username, password } = this.data;
    const db = wx.cloud.database();
    db.collection('user').where({
      username: username,
      password: password
    }).get({
      success: res => {
        if (res.data.length > 0) {
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 2000,
            success: function() {
              // 进行登录后的页面跳转或状态更新
              console.log(123);
              wx.switchTab({
                url: '/pages/calculate/calculate',
              });
            }
          });

        } else {
          wx.showToast({
            title: '用户名或密码错误',
            icon: 'none'
          });
        }
      },
      fail: err => {
        wx.showToast({
          title: '登录失败',
          icon: 'none'
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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
const db = wx.cloud.database();
const app = getApp();
let openid = app.globalData.openid;
const DBF = wx.cloud.database().collection('favourite');

Page({
  data: {
    knowledgeId: '', // 运动知识 ID
    knowledge: {}, // 用于存储运动知识数据
    userId: '',
    collectText: '',
    category: '运动知识' // 页面类别
  },

  onLoad: function (options) {
    // 获取传递的运动知识ID
    const knowledgeId = options.id;
    console.log('从 knowledgePage 传递过来的 id 参数：', knowledgeId);
    const db = wx.cloud.database();
    const _ = db.command;
    db.collection('investment').where({_id:knowledgeId}).get().then(res => {
      console.log('运动常识数据', res.data);
      this.setData({
        knowledge: res.data
      });
      console.log("获取的数据",this.data.knowledge);
    }).catch(err => {
      console.error('获取运动常识数据失败：', err);
    });
    this.setData({
      knowledgeId: knowledgeId
    });

    // 获取全局变量中的 openid 并设置为 userId
    // const openid = app.globalData.openid;
    // if (openid) {
    //   this.setData({
    //     userId: openid
    //   });
    //   console.log('用户的 userId：', this.data.userId);
    // } else {
    //   console.error('无法获取全局变量中的 openid');
    // };

   
  },

  // 根据运动知识ID获取运动知识详情数据
  
  navigateBack: function () {
        wx.navigateBack({
          delta: 1
        });
      },
  // 点击分享按钮事件处理函数
  // 此处省略相关业务逻辑
  handleShare: function () {
    wx.showModal({
      title: '分享给朋友',
      content: '点击右上角按钮分享给您的朋友',
      showCancel: false, // 不显示取消按钮
      confirmText: '我知道了', // 确认按钮的文本
      success(res) {
        if (res.confirm) {
          console.log('用户点击了我知道了');
        }
      }
    });
  }
});
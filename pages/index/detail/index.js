// pages/index/detail/index.js
var Bmob = require('../../../utils/Bmob-1.6.0.min.js');
Page({
  data: {
    rows: {}
  },
  onLoad: function (e) {
    // 页面初始化 options为页面跳转所带来的参数

    console.log(e.objectId)
    var objectId = e.objectId;
    var that = this;
    // if (!e.objectId) {
    //   common.showTip("请重新进入", "loading");
    //   return false;
    // }

    //获取一行数据、
    const query = Bmob.Query('text');
    query.get(objectId).then(res => {

      console.log(res)
      that.setData({
        rows: res,
      })

    }).catch(err => {
      console.log(err)
    })
    
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})
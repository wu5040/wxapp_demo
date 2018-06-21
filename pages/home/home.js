// pages/home/home.js
var Bmob = require('../../utils/Bmob-1.6.0.min.js')
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  //登录
  formSubmit: function(e) {
    var value = e.detail.value
    console.log('form发生了submit事件，携带数据为：', value)
    Bmob.User.login(value["userId"], value["userPw"]).then(res => {
      console.log(res)
      console.log('跳到index')

      wx.switchTab({
        url: '/pages/index/index'

      })

    }).catch(err => {
      console.log(err)
      wx.showToast({
        title: '用户名或密码输入错误',
        icon: 'none',
        duration: 2000
      })
    })
  },

  register: function(e) {
    console.log('跳到注册')
    wx.navigateTo({
      url: 'register/register'
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
      var uInfo=app.globalData.userInfo
      if (uInfo) {
        console.log('存在用户，显示详情', uInfo)
      }
      else{
        console.log('无用户，进入登录注册界面')
        wx.navigateTo({
          url: 'home',
        })
      }

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})
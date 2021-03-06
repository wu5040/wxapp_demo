// pages/home/register/register.js
var Bmob = require('../../../utils/Bmob-1.6.0.min.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  formSubmit: function(e) {
    var value = e.detail.value
    console.log('form发生了submit事件，携带数据为：', value)
    let params = {
      username: value["userId"],
      password: value["userPw"],
      email: value["userEm"],
    }
    Bmob.User.register(params).then(res => {
      console.log('注册成功',res)
      wx.reLaunch({
        url: '../login/login',
      })
    }).catch(err => {
      console.log(err)
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
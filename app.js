//app.js

var Bmob = require('utils/Bmob-1.6.0.min.js')


// var BmobSocketIo = require('utils/bmobSocketIo.js').BmobSocketIo;
// const BmobSocketIo = require('utils/tunnel');
Bmob.initialize(
  '1252ed4eb5cf10f8fda815860b5587b9',
  '122b9ad1d58dd3840b724c6cd99a5af1'
)

App({

  onLaunch:function(){

    var that=this

    let current = Bmob.User.current()

    this.globalData.userInfo = current
    
    if (that.globalData.userInfo) {    
      console.log('有用户且已登录', that.globalData.userInfo)
    } else {
      console.log('无用户，或用户已退出登录')
    } 
  },

    globalData: {
    userInfo: null,
    }

  // onLaunch: function () {
  //   var user = new Bmob.User() //开始注册用户
  //   user.auth().then(function (obj) {
  //     console.log('登陆成功')
  //   },
  //     function (err) {
  //       console.log('失败了', err)
  //     });
  // },
  // getUserInfo: function (cb) {
  //   var that = this
  //   if (this.globalData.userInfo) {
  //     typeof cb == 'function' && cb(this.globalData.userInfo)
  //   } else {
  //     //调用登录接口
  //     wx.login({
  //       success: function () {
  //         wx.getUserInfo({
  //           success: function (res) {
  //             that.globalData.userInfo = res.userInfo
  //             typeof cb == 'function' && cb(that.globalData.userInfo)
  //           }
  //         })
  //       }
  //     })
  //   }
  // },
  // globalData: {
  //   userInfo: null
  // }


})

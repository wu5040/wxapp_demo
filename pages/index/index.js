//index.js
//获取应用实例
var Bmob = require('../../utils/Bmob-1.6.0.min.js');
var common = require('../../utils/common.js');
var app = getApp();
var that;
Page({

  data: {
    writeDiary: false,
    loading: false,
    windowHeight: 0,
    windowWidth: 0,
    limit: 10,
    textList: [],
    modifyDiarys: false
  },

  onReady: function(e) {

    console.log('e:',e)
    const query = Bmob.Query("text");
    query.find().then(res => {
      console.log(res)
      this.setData({
        'textList': res
      })
      console.log('textList:', this.data.textList)

      //用户和帖子一对多
      const relation = Bmob.Relation('text') // 需要关联的表
      const relID1 = relation.add(['5wbP888B', 'q8p3PPP1']) //关联表中需要关联的objectId, 返回一个Relation对象, add方法接受string和array的类型参数
      const relID2 = relation.add(['I5RuJJJb', 'vCmIBBBb'])
      const query = Bmob.Query('_User')
      // query.get('22aadbd32e').then(res => {
      //   res.set('two', relID1); // 将Relation对象保存到two字段中，即实现了一对多的关联
      //   res.save()
      //   console.log('关联后', res)
      // })

      var writer = null
      query.get('24296c4455').then(res => {
        // res.set('two', relID2); // 将Relation对象保存到two字段中，即实现了一对多的关联
        // res.save()
        writer=res.username
        console.log('1关联后', writer,res)
      })

      const pointer = Bmob.Pointer('_User')
      const poiID = pointer.set('24296c4455')
      const query2 = Bmob.Query('text')
      query2.get('I5RuJJJb').then(res => {
        res.set('own', poiID)
        res.set('writer', writer)
        res.save()
        console.log('2关联后', res)
      })
      query2.get('vCmIBBBb').then(res => {
        res.set('own', poiID)
        res.save()
        console.log('3关联后', res)
      })




      // //查询Relation
      // query.field('two','22aadbd32e')
      // query.relation('text').then(res => {
      //   console.log('查询关联',res);
      // })


    });
    // var Text = Bmob.Object.extend("text");
    // var query = new Bmob.Query(Text);
    // // 查询所有数据
    // query.find({
    //   success: function (results) {
    //     console.log("共查询到 " + results.length + " 条记录");
    //     // 循环处理查询到的数据
    //     for (var i = 0; i < results.length; i++) {
    //       var object = results[i];
    //       console.log(object.id + ' - ' + object.get('content'));
    //     }
    //   },
    //   error: function (error) {
    //     console.log("查询失败: " + error.code + " " + error.message);
    //   }
    // });

    // 创建Bmob.Object子类
    // var Text = Bmob.Object.extend("text");
    // var objects = new Array();
    // for (var i = 0; i < 5; i++) {
    //   // 创建该类的一个实例
    //   var text = new Text();
    //   text.set('objectId', 'ba74dc1f09')
    //   text.set('content', '99999')
    //   objects.push(text)
    // }

    // 批量创建（更新）
    // Bmob.Object.saveAll(objects).then(function (objects) {
    //   // 成功
    //   console.log("批量更新成功", objects);
    // },
    //   function (error) {
    //     // 异常处理
    //     console.log("异常处理");
    //   });

    // var objects = new Array()
    // objects.push({ "id": "1e9b9a093e", "className": "text" })

    // // 批量删除
    // Bmob.Object.destroyAll(objects).then(function (res) {
    //   // 成功
    // },
    //   function (error) {
    //     // 异常处理
    //   });


    // wx.request({
    //   url: 'https://api.bmob.cn/1/pay/refund',
    //   header: {
    //     'Content-Type': 'application/json',
    //     'X-Bmob-Application-Id': 'c6fad58fb29451651c0a4dab46506498',
    //     'X-Bmob-REST-API-Key': '81f67154e5dd055abacc14e5052da513',
    //   },
    //   method: "POST",
    //   data: {
    //     "order_no": "3a94dad09cef0697c87c58befc7jsapi",
    //     "refund_fee": 0.1,
    //     "desc": "退款",
    //   },
    //    success: function (res) {
    //     console.log(res.data)
    //   }
    // })

    // var res = {
    //     "order_no": "3a94dad09cef0697c87c58befc7jsapi",
    //     "refund_fee": 0.1,
    //     "desc": "退款",
    //   }
    // Bmob.refund(res).then(function (obj) {
    //   console.log('333', obj)
    // },
    //   function (err) {
    //     console.log('失败了', err)
    //   });

  },
  onShareAppMessage: function() {
    return {
      title: '自定义转发标题',
      path: '/page/user?id=123',
      success: function(res) {
        // 转发成功
        console.log('成功', res)

        wx.getShareInfo({
          shareTicket: res.shareTickets,
          success(res) {

            //内部调用云端代码
            var currentUser = Bmob.User.current();
            var data = {
              "objectId": currentUser.id,
              "encryptedData": res.encryptedData,
              "iv": res.iv
            };
            console.log(data);

            // console.log(data);
            Bmob.Cloud.run('getOpenGId', data).then(function(obj) {
              // var res = JSON.parse(obj)
              console.log(obj)
            }, function(err) {
              console.log(err)
            });

            data = {
              "objectId": currentUser.id,
              "encryptedData": "Q3h+kMwbKZ52BsxgNT4GS5LTYeLLGIXnA/BZrg/9iMJBD5Qv3Fs5H66xe9ml7iNIsOBEtaeUG0InAxbZOhn1qEeAJ2aC3wYpjARR4pCYA1v87+bj9khaUDY6pvaKX5/4TFHrofKAmA0gTT6bSaHyiw==",
              "iv": "YHoSkWomdfiyvAWHoYvKiQ=="
            };
            console.log(data);
            Bmob.Cloud.run('getOpenGId', data).then(function(obj) {
              // var res = JSON.parse(obj)
              console.log(obj)
            }, function(err) {
              console.log(err)
            });

          }
        })
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
  onLoad: function() {


    that = this;

    wx.showShareMenu({
      withShareTicket: true //要求小程序返回分享目标信息
    })

    var k = 'http://bmob-cdn-12917.b0.upaiyun.com/2017/07/18/d99d3bb7400cb1ed808f34896bff6fcc.jpg';

    var newUrl = k.replace("http://bmob-cdn-12917.b0.upaiyun.com", "https://bmob-cdn-12917.bmobcloud.com")

    console.log(newUrl);
  },
  noneWindows: function() {
    that.setData({
      writeDiary: "",
      modifyDiarys: ""
    })
  },
  onShow: function() {

    getList(this);
    wx.getSystemInfo({
      success: (res) => {
        that.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })
  },
  pullUpLoad: function(e) {
    var limit = that.data.limit + 2
    this.setData({
      limit: limit
    })
    this.onShow()
  },
  toAddDiary: function() {
    that.setData({
      writeDiary: true
    })
  },
  addDiary: function(event) {
    var title = event.detail.value.title;
    var content = event.detail.value.content;
    var formId = event.detail.formId;
    console.log("event", event)
    if (!title) {
      common.showTip("标题不能为空", "loading");
    } else if (!content) {
      common.showTip("内容不能为空", "loading");
    } else {
      that.setData({
        loading: true
      })
      var currentUser = Bmob.User.current();

      var User = Bmob.Object.extend("_User");
      var UserModel = new User();

      // var post = Bmob.Object.createWithoutData("_User", "594fdde53c");

      //增加日记
      var Text = Bmob.Object.extend("text");
      var text = new Text();
      text.set("title", title);
      text.set("formId", formId); //保存formId
      text.set("content", content);
      var f = Bmob.File("a.jpg", [""]);
      text.set("f", f);
      if (currentUser) {
        UserModel.id = currentUser.id;
        text.set("own", UserModel);
      }
      //添加数据，第一个入口参数是null
      text.save(null, {
        success: function(result) {
          // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
          common.showTip('添加日记成功');
          that.setData({
            writeDiary: false,
            loading: false
          })

          var currentUser = Bmob.User.current();

          //成功后发送模板消息，这个只能在手机上测试，模拟器里面没有formid
          // var temp = {
          //   "touser": currentUser.get("openid"),
          //   "template_id": "B-2GcobfYnptevxY8G3SdA72YLYGZpOoJO_FEHlouWg",
          //   "page": "",
          //   "form_id": formId,
          //   "data": {
          //     "keyword1": {
          //       "value": "SDK测试内容",
          //       "color": "#173177"

          //     },
          //     "keyword2": {
          //       "value": "199.00"
          //     },
          //     "keyword3": {
          //       "value": "123456789"
          //     },
          //     "keyword4": {
          //       "value": "2015年01月05日 12:30"
          //     }
          //     ,
          //     "keyword5": {
          //       "value": "恭喜您支付成功，如有疑问请反馈与我"
          //     }
          //   }
          //   , "emphasis_keyword": "keyword1.DATA"
          // }
          // console.log(temp);
          // Bmob.sendMessage(temp).then(function (obj) {
          //   console.log('发送成功');


          // }, function (err) {

          //   common.showTip('失败' + err);
          // });


          // 成功后发送主人模板消息，这个只需把openid改正确即可接收到， Bmob后端云公众号回复openid 
          var temp = {
            "touser": "oUxY3w_jURG89H5wCIvJDPjJ5s2o",
            "template_id": "-ERkPwp0ntimqH39bggQc_Pj55a18CYLpj-Ert8-c8Y",
            "url": "http://www.baidu.cn/",
            "data": {
              "first": {
                "value": "您好，Restful 失效，请登录控制台查看。",
                "color": "#c00"
              },
              "keyword1": {
                "value": "Restful 失效"
              },
              "keyword2": {
                "value": "2017-07-03 16:13:01"
              },
              "keyword3": {
                "value": "高"
              },
              "remark": {
                "value": "如果您十分钟内再次收到此信息，请及时处理。"
              }
            }
          }
          console.log(temp);
          Bmob.sendMasterMessage(temp).then(function(obj) {
            console.log('发送成功');


          }, function(err) {

            common.showTip('失败' + err);
          });



          that.onShow()
        },
        error: function(result, error) {
          // 添加失败
          common.showTip('添加日记失败，请重新发布', 'loading');

        }
      });
    }

  },
  closeLayer: function() {
    that.setData({
      writeDiary: false
    })
  },
  deleteDiary: function(event) {


    var that = this;



    var objectId = event.target.dataset.id;
    wx.showModal({
      title: '操作提示',
      content: '确定要删除要日记？',
      success: function(res) {
        if (res.confirm) {
          //删除日记
          var Text = Bmob.Object.extend("text");
          // var query = new Bmob.Query('text');
          // query.find().then(function (todos) {
          //   return Bmob.Object.destroyAll(todos);
          // }).then(function (todos) {
          //   console.log(todos);
          //   // 更新成功
          // }, function (error) {
          //   // 异常处理
          // });

          //创建查询对象，入口参数是对象类的实例
          var query = new Bmob.Query(Text);
          query.get(objectId, {
            success: function(object) {
              // The object was retrieved successfully.
              object.destroy({
                success: function(deleteObject) {
                  console.log('删除日记成功');
                  getList(that)
                },
                error: function(object, error) {
                  console.log('删除日记失败');
                }
              });
            },
            error: function(object, error) {
              console.log("query object fail");
            }
          });
        }
      }
    })
  },
  toModifyDiary: function(event) {
    var nowTile = event.target.dataset.title;
    var nowContent = event.target.dataset.content;
    var nowId = event.target.dataset.id;
    that.setData({
      modifyDiarys: true,
      nowTitle: nowTile,
      nowContent: nowContent,
      nowId: nowId
    })
  },
  modifyDiary: function(e) {
    var t = this;
    modify(t, e)
  },
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
    getList(this);
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
    getList(this);
  },
  inputTyping: function(e) {
    //搜索数据
    getList(this, e.detail.value);
    this.setData({
      inputVal: e.detail.value
    });
  },
  closeAddLayer: function() {
    that.setData({
      modifyDiarys: false
    })
  }

})


/*
 * 获取数据
 */
function getList(t, k) {
  that = t;

  var query = Bmob.Query('text');
  // var query1 = Bmob.Query('text');

  // //会员模糊查询
  // if (k) {
  //   query.equalTo("title", { "$regex": "" + k + ".*" });
  //   query1.equalTo("content", { "$regex": "" + k + ".*" });
  // }

  //普通会员匹配查询
  //query.equalTo("title", k);

  query.order('-createdAt');
  query.include("own")
  // 查询所有数据
  // query.limit(that.data.limit);

  // var mainQuery=Bmob.Query('text');
  // mainQuery.or(query, query1);
  // mainQuery.find().then(res => {
  //   console.log(res)
  //   that.setData({
  //     textList: results
  //   })
  // }).catch(err => { 
  //   console.log("查询失败: " + error.code + " " + error.message);
  // });


  // var mainQuery = Bmob.Query.or(query, query1);
  // mainQuery.find({
  //   success: function (results) {
  //     // 循环处理查询到的数据
  //     console.log(results);
  //     that.setData({
  //       textList: results
  //     })
  //   },
  //   error: function (error) {
  //     console.log("查询失败: " + error.code + " " + error.message);
  //   }
  // });
}

function modify(t, e) {
  var that = t;
  //修改日记
  var modyTitle = e.detail.value.title;
  var modyContent = e.detail.value.content;
  var objectId = e.detail.value.content;
  var thatTitle = that.data.nowTitle;
  var thatContent = that.data.nowContent;
  if ((modyTitle != thatTitle || modyContent != thatContent)) {
    if (modyTitle == "" || modyContent == "") {
      common.showTip('标题或内容不能为空', 'loading');
    } else {
      console.log(modyContent)
      var Text = Bmob.Object.extend("text");
      var query = new Bmob.Query(Text);
      // 这个 id 是要修改条目的 id，你在生成这个存储并成功时可以获取到，请看前面的文档
      query.get(that.data.nowId, {
        success: function(result) {

          // 回调中可以取得这个 GameScore 对象的一个实例，然后就可以修改它了
          result.set('title', modyTitle);
          result.set('content', modyContent);
          result.save();
          common.showTip('日记修改成功', 'success', function() {
            that.onShow();
            that.setData({
              modifyDiarys: false
            })
          });

          // The object was retrieved successfully.
        },
        error: function(object, error) {

        }
      });
    }
  } else if (modyTitle == "" || modyContent == "") {
    common.showTip('标题或内容不能为空', 'loading');
  } else {
    that.setData({
      modifyDiarys: false
    })
    common.showTip('修改成功', 'loading');
  }
}
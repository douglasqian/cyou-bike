//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {}
  },
  //事件处理函数
  scanQR: function () {
    console.log("scan")
    wx.scanCode({
      onlyFromCamera: true,
      success: function (res) {
        console.log(res)
      },
      fail: function () {
        console.log("failed")
      },
      complete: function () {
        console.log("completeted")
      }
    })
  },
  getMyLocation: function () {
    console.log("locate")
    //wx.navigateTo({
    //  url: '../logs/logs'
    //})
  },
  getOptions: function() {
    console.log("options")

    //wx.navigateTo({
    //  url: '../logs/logs'
    //})
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  onReady: function () {
    console.log('onReady')
    this.mapCtx = wx.createMapContext("myMap")
    console.log(this.mapCtx)
  }
})
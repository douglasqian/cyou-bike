//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    userInfo: {},
    screenWidth: 0,
    screenHeight: 0,
    clicked: false,
    controls: [{
      // LOCATE POSITION ICON
      id: 1,
      iconPath: "../../images/index/locate.png",
      position: {
          left: 0,
          top: 0, 
          width: 75,
          height: 75
      },
      clickable: true
    },{
      // SCAN QR CODE ICON
      id: 2,
      iconPath: "../../images/index/scan.png",
      position: {
          left: 0,
          top: 0,
          width: 180,
          height: 75
      },
      clickable: true
    },{
      // SHOW MORE OPTIONS ICON
      id: 3,
      iconPath: "../../images/index/options.png",
      position: {
          left: 0,
          top: 0,
          width: 75,
          height: 75
      },
      clickable: true
    }, {
      // MORE OPTIONS 1 (ACCOUNT BALANCE)
      id: 4,
      iconPath: "../../images/index/a.png",
      position: {
        left: 1000,
        top: 0,
        width: 75,
        height: 75
      },
      clickable: true
    }, {
      // MORE OPTIONS 2 (FILE A REPORT)
      id: 5,
      iconPath: "../../images/index/b.png",
      position: {
        left: 1000,
        top: 0,
        width: 75,
        height: 75
      },
      clickable: true
    }, {
      // MORE OPTIONS 3 (USER INFORMATION)
      id: 6,
      iconPath: "../../images/index/c.png",
      position: {
        left: 1000,
        top: 0,
        width: 75,
        height: 75
      },
      clickable: true
    }]
  },
  // MOVE MORE OPTIONS INTO FRAME
  showOpts: function () {
    var tempcontrols = this.data.controls;
    tempcontrols[3].position.left = this.data.screenWidth / 3 - this.data.screenWidth / 4;
    tempcontrols[4].position.left = this.data.screenWidth / 2 - this.data.screenWidth / 7.3;
    tempcontrols[5].position.left = this.data.screenWidth - this.data.screenWidth / 2.8;
    this.setData({ 
      clicked: true,
      // Move into frame
      controls: tempcontrols
    });
    console.log(this.data.controls[3].position.left)
  },
  // MOVE MORE OPTIONS OUT OF FRAME
  hideOpts: function () {
    var tempcontrols = this.data.controls;
    tempcontrols[3].position.left = 1000;
    tempcontrols[4].position.left = 1000;
    tempcontrols[5].position.left = 1000;
    this.setData({ 
      clicked: false,
      // Move out of frame
      controls: tempcontrols
    });
    console.log(this.data.controls[3].position.left)
  },
  // ICON TAP EVENT HANDLERS
  controltap: function (e) {
    var that = this
    console.log(e.controlId)
    switch (e.controlId) {
      case 1:
        if (!that.data.clicked) {
          that.mapCtx.moveToLocation();
        }
        break;
      case 2:
        if (!this.data.clicked) {
          that.hideOpts();
          wx.scanCode({
            onlyFromCamera: true,
            success: function (res) {
              console.log(res)
            },
            fail: function () {
              console.log("failed to scan")
            },
            complete: function () {
              console.log("scan complete")
            }
          })
        }
        break;
      case 3:
        if (this.data.clicked) {
          this.hideOpts();
        } else {
          this.showOpts();
        }
        break;
      case 4:
        this.hideOpts();
        console.log("A")
        break;
      case 5:
        this.hideOpts();
        console.log("B")
        break;
      case 6:
        this.hideOpts();
        console.log("C")
        break;
    }
  },
  // INITIAL ICON POSITION CALCULATION
  iconInit: function () {
    console.log("updating icon positions")
    this.setData ({
      // Calibrating icon widths and heights
      "controls[0].position.height": this.data.screenHeight / 8,
      "controls[0].position.width": this.data.screenHeight / 8,
      "controls[1].position.height": this.data.screenHeight / 8,
      "controls[1].position.width": this.data.screenHeight / 8 * 2.4,
      "controls[2].position.height": this.data.screenHeight / 8,
      "controls[2].position.width": this.data.screenHeight / 8,
      "controls[3].position.height": this.data.screenHeight / 6,
      "controls[3].position.width": this.data.screenHeight / 6,
      "controls[4].position.height": this.data.screenHeight / 6,
      "controls[4].position.width": this.data.screenHeight / 6,
      "controls[5].position.height": this.data.screenHeight / 6,
      "controls[5].position.width": this.data.screenHeight / 6,
      // Calibrating vertical alignment
      "controls[0].position.top": this.data.screenHeight - (this.data.screenHeight / 5),
      "controls[1].position.top": this.data.screenHeight - (this.data.screenHeight / 5),
      "controls[2].position.top": this.data.screenHeight - (this.data.screenHeight / 5),
      "controls[3].position.top": this.data.screenHeight - (this.data.screenHeight / 5 * 1.7),
      "controls[4].position.top": this.data.screenHeight - (this.data.screenHeight / 5 * 1.7),
      "controls[5].position.top": this.data.screenHeight - (this.data.screenHeight / 5 * 1.7),
      // Calibrating horizontal alignment
      "controls[0].position.left": this.data.screenWidth / 25,
      "controls[1].position.left": this.data.screenWidth / 2 - this.data.screenHeight / 8 * 1.25,
      "controls[2].position.left": this.data.screenWidth - (this.data.screenHeight / 30) - this.data.screenHeight/8,
    })
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
  onShow: function() {
    console.log('onShow')
    var that = this
    // Getting screen width and height
    wx.getSystemInfo({
      success: function (res) {
        console.log("successful");
        //console.log(res.windowWidth)
        that.setData({
          screenWidth: res.windowWidth,
          screenHeight: res.windowHeight
        })
        //console.log(that.data.screenWidth)
      }
    });
    this.iconInit();

  },
  onReady: function () {
    console.log('onReady')
    this.mapCtx = wx.createMapContext("myMap")
    //this.mapCtx.moveToLocation();
    console.log(this.mapCtx)
  }
})
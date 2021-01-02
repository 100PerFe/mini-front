//app.js
App({
  onLaunch: function () {
    let that = this
    try {
      var value = wx.getStorageSync('userId')
      if (value!="") {
        that.globalData.userId=value;
      }else{
        wx.showModal({
          title: '授权',
          content: '获得您的昵称、图像信息',
          success(res) {
            if (res.confirm) {
              wx.login({
                success: res => {
                  console.log(res.code)
                  wx.request({
                    url: that.globalData.url + "wxlogin?code=" + res.code,
                    success: res => {
                      console.log(res.data.data);
                      //说明该用户未注册
                      if (res.data.data.userSelfDescription == "1") {
                        wx.getUserInfo({
                          success: res => {
                            console.log(res)
                            that.globalData.temp.userNick = res.userInfo.nickName,
                              that.globalData.temp.userAvatar = res.userInfo.avatarUrl
                          }
                        })
                       //延迟1s，在userNick，userAvatar赋值后获取值
                        setTimeout(function () {
                          wx.request({
                            url: that.globalData.url + "wxRegister",
                            data: {
                              userId: res.data.data.id,
                              userNick: that.globalData.temp.userNick,
                              userAvatar: that.globalData.temp.userAvatar
                            },
                            header: {
                              'content-type': 'application/x-www-form-urlencoded' //修改此处即可
                            },
                            method: "POST",
                            success:res=>{
                              console.log(res.data.data)
                              //注册成功
                              wx.setStorage({
                                key:"userId",
                                data:res.data.data.id
                              })
                            }
                          })
                        }, 1000) 
                      }else{
                        //用户已注册，将返回的res.data.data放进缓存中
                        wx.setStorage({
                          key:"userId",
                          data:res.data.data.id
                        })
                      }
                    }
                  })
                }
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    } catch (e) {
      
    }    
  },

  toFinance:function(){
    wx.navigateTo({
      url: "../finance/index"
    })
  },

  toChangeU:function(){
    wx.navigateTo({
      url: "../editInfo/editInfo"
    })
  },

  globalData:{
    temp: {
      userNick: "",
      userAvatar: ""
    },
    userId: 0,
    clubId: 0,
    url:"http://8.129.215.86:8084/"
  }

})
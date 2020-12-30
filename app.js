//app.js
App({
  onLaunch: function () {
   
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
    userId:2,
    clubId:9,
    url:"http://8.129.215.86:8084/"
  }

})
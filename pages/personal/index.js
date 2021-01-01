let app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:"林齐之",
    status:"普通成员",
    club:"日语俱乐部",
    counterType:"",
    rank:0
  },
 
  tofinance:function(e){
    app.toFinance()
    let i = e.currentTarget.dataset.i;
    this.setData({
      counterType:i
    })
    
  },

  tochangeu:function(){
    app.toChangeU()
  },

  toaddtag:function(){
    wx.navigateTo({
      url: "../addtag/index"
    })
  },

  tochangeu:function(){
    app.toChangeU()
  },

  tousermanagement:function(){
    wx.navigateTo({
      url: "../usermanagement/index"
    })
  },

  toinvitecode:function(){
    wx.navigateTo({
      url: "../inviteCode/inviteCode"
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userId = app.globalData.userId;
    let clubId = app.globalData.clubId;
    var s_Url = "getUserClubAndRole";
    wx.request({
      url:app.globalData.url + s_Url,
      data:{
        userId:userId,
        clubId:clubId
      },
      method:"GET",
      success:function(res){
        console.log(res.data)
        var resdata = res.data;
        if(app.searchDataCallback){
          app.searchDataCallback(resdata)
        }
      },
      fail:function(res){
        console.log(res.data)
      }
    })
    app.searchDataCallback = res => {
      console.log(res)
      let name = res.data.userAlias;
      let rank = res.data.userRole;
      let club = res.data.clubName;
      var status = "";
      if(rank == "0"){
        status = "管理员";
      }
      else if(rank == "1"){
        status = "记账员";
      }
      else{
        status = "普通成员";
      }
      this.setData({
        name:name,
        status:status,
        club:club,
        rank:rank      
      })
      // console.log(this.data.rank)

    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let userId = app.globalData.userId;
    let clubId = app.globalData.clubId;
    var s_Url = "getUserClubAndRole";
    wx.request({
      url:app.globalData.url + s_Url,
      data:{
        userId:userId,
        clubId:clubId
      },
      method:"GET",
      success:function(res){
        console.log(res.data)
        var resdata = res.data;
        if(app.searchDataCallback){
          app.searchDataCallback(resdata)
        }
      },
      fail:function(res){
        console.log(res.data)
      }
    })
    app.searchDataCallback = res => {
      console.log(res)
      let name = res.data.userAlias;
      let rank = res.data.userRole;
      let club = res.data.clubName;
      var status = "";
      if(rank == "0"){
        status = "管理员";
      }
      else if(rank == "1"){
        status = "记账员";
      }
      else{
        status = "普通成员";
      }
      this.setData({
        name:name,
        status:status,
        club:club,
        rank:rank      
      })
      // console.log(this.data.rank)

    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
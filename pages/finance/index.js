const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    action:"",
    active_tag:"",
    active_cost:"",
    reason:"",
    subCounterType:""
  },

  active:function(e){
    let inputType = e.currentTarget.dataset.type;
    // console.log(inputType)
    if(inputType == 1){
      var active_tag = e.detail.value;
      this.setData({
        active_tag:active_tag
      })
    }
    else if(inputType == 2){
      var active_cost = e.detail.value;
      this.setData({
        active_cost:active_cost
      })
    }
    var reason = e.detail.value;
    this.setData({
      reason:reason
    })
    
    // console.log(this.data.active_tag,this.data.active_cost)
  },

  finance_submit:function(){
    let userId = app.globalData.userId;
    let clubId = app.globalData.clubId;
    let counterType = this.data.subCounterType;
    if(counterType == "createPay"){
      wx.request({
        url:app.globalData.url + counterType,
        data:{
          clubId:clubId,
          userId:userId,
          pagTag:this.data.active_tag,
          pagAmount:this.data.active_cost,
          payReason:this.data.reason
        },
        header:{ "Content-Type": "application/x-www-form-urlencoded"},
        method:"POST",
        success:function(res){
          console.log(res.data)
        },
        fail:function(res){
          console.log(res)
        }
      })
    }
    else if(counterType == "createIncome"){
      wx.request({
        url:app.globalData.url + counterType,
        data:{
          clubId:clubId,
          userId:userId,
          incomeTag:this.data.active_tag,
          incomeAmount:this.data.active_cost,
          incomeReason:this.data.reason
        },
        header:{ "Content-Type": "application/x-www-form-urlencoded"},
        method:"POST",
        success:function(res){
          console.log(res.data)
        },
        fail:function(res){
          console.log(res)
        }
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    var info = prevPage.data;
    if(info.counterType == "createPay"){
      this.setData({
        subCounterType:info.counterType,
        action:"出账"
      })
    }
    else if(info.counterType == "createIncome"){
      this.setData({
        subCounterType:info.counterType,
        action:"入账"
      })
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
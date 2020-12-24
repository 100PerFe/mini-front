const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:""
  },

  onChange(event) {
    console.log(event.detail);
    let value = event.detail
    this.setData({
      value:value
    })
  },

  update_Tag:function(){
    let clubId = app.globalData.clubId;
    let inputValue = this.data.value;
    var s_Url = "creatTag";
    wx.request({
      url:app.globalData.url + s_Url,
      data:{
        clubId:clubId,
        tagName:inputValue,
        tagType:0
      },
      header:{ "Content-Type": "application/x-www-form-urlencoded"},
      method:"POST",
      success:function(res){
        console.log(res.data)
      },
      fail:function(res){
        console.log(res.data)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
// pages/billDetail/billDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "bill": {
      "billAmount": "520",
      "billDate": "2020-12-15",
      "billTag": "办公",
      "billUser": "Stephen",
      "billReason": "都说办公用咯",
      "billProof": "https://img.yzcdn.cn/vant/cat.jpeg"
    },
    "imgShow": false
  },

  imgOpen() {
    this.setData({
      "imgShow": true
    })
  },

  imgClose( ){
    this.setData({
      "imgShow": false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    
    var bill = JSON.parse(options.bill);
    console.log(bill);
    
    this.setData({
      "bill": bill
    });
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
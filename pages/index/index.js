// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "selectedOrg": "社团A",
    "pickerShow": false,
    "pickerActions": [
      {"name": "社团A"},
      {"name": "社团B"},
      {"name": "社团C"},
    ],
    "orgOptionShow": false,
    "joinOrgShow": false,
    "bill": {
      "billAmount": "520",
      "billDate": "2020-12-15",
      "billTag": "办公",
      "billUser": "Stephen",
      "billReason": "都说办公用咯",
      "billProof": "https://img.yzcdn.cn/vant/cat.jpeg"
    },
  },
  toBillDetail() {
    wx.navigateTo({
      url: '/pages/billDetail/billDetail?bill=' + this.data.bill,
    })
  },

  toApplyOrg() {
    let that = this;
    wx.navigateTo({
      url: '/pages/applyOrg/applyOrg',
    }).then((res)=> {
      that.setData({
        "orgOptionShow": false,
        "joinOrgShow": false,
        "pickerShow": false
      })
    })
  },

  pickerClose() {
    this.setData({
      "pickerShow": false
    });
  },

  pickerOpen() {
    this.setData({
      "pickerShow": true
    })
  },

  pickerSelect(event) {
    this.setData({
      "selectedOrg": event.detail.name
    })
  },

  orgOptionsSwitch() {
    if (this.data.orgOptionShow) {
      this.setData({
        "orgOptionShow": false
      })
    } else {
      this.setData({
        "orgOptionShow": true
      })
    }
    
  },

  orgOptionsClose() {
    this.setData({
      "orgOptionShow": false
    })
  },

  joinOrgOpen() {
    this.setData({
      "orgOptionShow": false
    });
    this.setData({
      "joinOrgShow": true
    })
  },
  
  joinOrgClose() {
    this.setData({
      "joinOrgShow": false
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
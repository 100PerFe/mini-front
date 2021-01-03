import Notify from '../../dist/notify/notify';

var app = getApp();
var serverAddr = app.globalData.url
var userId = app.globalData.userId

// pages/applyOrg/applyOrg.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clubName: null,
    clubDesc: null
  },

  getClubName(event) {
    
    this.setData({
      clubName: event.detail
    })
  },

  getClubDesc(event) {
    this.setData({
      clubDesc: event.detail
    })
  },

  submitClubApply() {
    var that = this;
    wx.request({
      url: serverAddr+'createClub',
      data: {
        "clubDescription": that.data.clubDesc,
        "clubName": that.data.clubName,
        "userId": wx.getStorageSync('userId')
      },
      success(res) {
        if (res.data.code==200) {
          Notify({ type: 'success', message: '创建成功' });
          wx.setStorage({
            data: res.data.data,
            key: 'updateClubList',
          })
        } else {
          Notify({ type: 'danger', message: res.data.msg });
        }
      },
      fail(res) {
        console.log(res);
        
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
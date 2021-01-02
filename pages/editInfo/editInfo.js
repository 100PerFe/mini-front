import Notify from '../../dist/notify/notify';

var app = getApp()
var serverAddr = app.globalData.url
var userId = app.globalData.userId

// pages/editInfo/editInfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: "",
    userSelfDescription: "",
    userEmail: "",
    emailErrorMsg: "",
    userAvatar: ""
  },
  

  submitUpdateInfo() {
    if (this.data.emailErrorMsg=="") {
      wx.request({
        url: serverAddr+"updateUserInfo",
        method: "POST",
        data: {
          "id": userId,
          "userName": this.data.userName,
          "userSelfDescription": this.data.userSelfDescription,
          "userEmail": this.data.userEmail
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        success (res) {
          if (res.data.code==200) {
            Notify({ type: 'success', message: '保存成功' });
          } else {
            Notify({ type: 'danger', message: res.data.msg });
          }
        }
      })
    }
  },

  getUserName(e) {
    console.log(e);
    
    this.setData({
      "userName": e.detail
    })
  },
  getUserSelfDesc(e) {
    this.setData({
      "userSelfDescription": e.detail
    })
  },

  getUserEmail(e) {
    var reg_tel = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
    if (!reg_tel.test(e.detail.value)) {
      this.setData({
        "emailErrorMsg": "请输入正确的邮箱",
        "userEmail": e.detail.value
      })
    } else {
      this.setData({
        "emailErrorMsg": "",
        "userEmail": e.detail.value
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: serverAddr+'getUserClubAndRole',
      data: {
        "clubId": app.globalData.clubId,
        "userId": userId
      },
      success(res) {
        console.log(res.data);
        var user = res.data.data
        that.setData({
          userName: user.userName,
          userSelfDescription: user.userSelfDescription,
          userEmail: user.userEmail,
          userAvatar: user.userAvatar
        })
      }
    })
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
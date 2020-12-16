import Dialog from '../../dist/dialog/dialog';

// pages/inviteCode/inviteCode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "inviteCode": "3c9s94ss"
  },

  comfirmNewCode() {
    let that = this;
    Dialog.confirm({
      title: '警告',
      message: '邀请码更换后，旧邀请码将不可使用',
      confirmButtonText: "确定更新",
      cancelButtonText:"取消更新",
      
    }).then(() => {
        that.setData({
          "inviteCode": that.guid().substr(0, 8)
        })
      })
      .catch(() => {
        // on cancel
      });
  },

  guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
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
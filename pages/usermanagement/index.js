const app = getApp()
import Toast from "../../dist/toast/toast";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:"",
    columns:["管理员","记账员","普通成员"],
    s_UserId:""
  },
  
  showPopup:function(e) {
    this.setData({ show: true });
  },

  onClose:function() {
    this.setData({ show: false });
  },
  
  /*
  修改成员权限
  */
  chooseToChange:function(e){
    let role = e.currentTarget.dataset.k;
    let userId1 = app.globalData.userId;
    let clubId = app.globalData.clubId;
    let userId2 = this.data.s_UserId;
    // console.log(userId2)
    let s_Url = "updateUserClubRole";
    wx.request({
      url:app.globalData.url + s_Url,
      data:{
        clubId:clubId,
        role:role,
        userId1:userId1,
        userId2:userId2
      },
      header:{ "Content-Type": "application/x-www-form-urlencoded"},
      method:"POST",
      success:function(res){
        console.log(res)
        var resdata = res.data;
        if(app.searchDataCallback){
          app.searchDataCallback(resdata)
        }
      },
      fail:function(res){
        console.log(res)
        
      }
    })
    app.searchDataCallback = res => {
      let resCode = res.code;
      console.log(resCode)
      if (resCode == "200") {
        this.btnSub();
      }
      else if(resCode == "400"){
        this.btnSub1();     
      }
    }
    
    
  },

  /*
  获取每一项的userId
  */
  catchUserId:function(e){
    // console.log(e)
    let userId = e.currentTarget.dataset.h;
    this.setData({
      s_UserId:userId
    })

  },

  /*
  修改成功提示
  */
  btnSub:function() {
    Toast.success("修改成功");
  },

  /*
  修改失败提示
  */
  btnSub1:function() {
    Toast.fail("修改失败");
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    let clubId = app.globalData.clubId;
    let s_Url = "getClubAllUsers";
    wx.request({
      url:app.globalData.url + s_Url,
      data:{
        clubId:clubId
      },
      method:"GET",
      success:function(res){
        // console.log(res.data)
        var resdata = res.data;
        if(app.searchDataCallback){
          app.searchDataCallback(resdata)
        }
      },
      fail:function(res){
        console.log(res)
      }
    })
    app.searchDataCallback = res => {
      let rres = res.data;
      let clubUserList = [];
      clubUserList = rres;
      // console.log(clubUserList)
      for(let i=0;i<clubUserList.length;i++){

        let role = clubUserList[i].userRole;
        let roleType = "";
        if(role == "0"){
          roleType = "管理员";
        }
        else if(role == "1"){
          roleType = "记账员";
        }
        else if(role == "2"){
          roleType = "普通成员";
        }
        clubUserList[i].userRole = roleType;
      }
      this.setData({
        clubDetails:clubUserList
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


})
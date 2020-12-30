const app = getApp()
import Toast from "../../dist/toast/toast";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:""
  },

  /*
  获取输入值
  */
  onChange(event) {
    console.log(event.detail);
    let value = event.detail
    this.setData({
      value:value
    })
  },

  /*
  录入成功提示
  */
  btnSub:function() {
    Toast.success("录入成功");
  },

  /*
  更新活动tag
  */
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
      let rres = res.code;
      console.log(rres)
      if (rres == 200) {
        this.btnSub();
      }
      
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

})
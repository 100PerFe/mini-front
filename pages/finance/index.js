const app = getApp();
import Toast from "../../dist/toast/toast";


Page({

  /**
   * 页面的初始数据
   */
  data: {
    action:"",
    active_tag:"",
    active_cost:"",
    reason:"",
    subCounterType:"",
    index:0

  },

  /*
  录入成功提示
  */
  btnSub:function() {
  	Toast.success("录入成功");
  },

  /*
  获取picker中的tagName
  */
  bindPickerChange: function(e) {
    console.log(e)
    let index = e.detail.value;
    let tagArray1 = e.currentTarget.dataset.z;
    let tagName = tagArray1[index];
    this.setData({
      index:index,
      active_tag:tagName
    });
    // console.log(this.data.active_tag)
    
  },


  /*
  接受录入内容
  */
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
    
  },

  /*
  出账/入账
  */
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
          payTag:this.data.active_tag,
          payAmount:this.data.active_cost,
          payReason:this.data.reason
        },
        header:{ "Content-Type": "application/x-www-form-urlencoded"},
        method:"POST",
        success:function(res){
          console.log(res.data)
          var resdata1 = res.data;
          if(app.searchDataCallback){
            app.searchDataCallback(resdata1)
          }
        },
        fail:function(res){
          console.log(res)
        }
      })
      app.searchDataCallback = res => {
        let rres1 = res.data;
        console.log(rres1)
        if (rres1 == "success") {
          this.btnSub();
        }
        
      }
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
          // console.log(res.data)
          var resdata2 = res.data;
          if(app.searchDataCallback){
            app.searchDataCallback(resdata2)
          }
        },
        fail:function(res){
          console.log(res)
        }
      })
      app.searchDataCallback = res => {
          let rres2 = res.data;
          console.log(rres2)
          if (rres2 == "success") {
            this.btnSub();
          }
          
      }
      
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 

    /*
    判断出账/入账
    */
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    var info = prevPage.data;
    let s_Url = "getTagList";
    let clubId = app.globalData.clubId;
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
    
    /*
    获取tagNameList中的tagName
    */
    wx.request({
      url:app.globalData.url + s_Url,
      data:{
        clubId:clubId
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
        console.log(res)
      }
    })
    app.searchDataCallback = res => {
      let resArray = res.data;
      var tagNameArray = [];
      for(let i=0;i<resArray.length;i++){
        let tagName = resArray[i].tagName;
        tagNameArray[i] = tagName;
      }
      // console.log(tagNameArray)
      this.setData({
        tagArray:tagNameArray
      })
    }
    
    },


})
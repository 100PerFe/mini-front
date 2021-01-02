import Notify from '../../dist/notify/notify';

var app = getApp();
var userId = app.globalData.userId;
var serverAddr = app.globalData.url
var inviteCode = "";

// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "selectedOrg": {},
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
    "clubList": [],
    "inviteCode": "",
    "beforeClose": (action) => new Promise((resolve) => {
      if (action === 'confirm') {
        resolve(false)
      } else {
        resolve(true);
      }
    }),
    "payList": [],
    "incomeList": [],
    "totalIncome": 0,
    "totalPay": ""
  },

  submitJoinOrg() {
    var that = this;
    wx.request({
      url: serverAddr+'joinClubByUserId',
      data: {
        userId: userId,
        inviteCode: inviteCode
      },
      success(res) {
        if (res.data.code==200) {
          Notify({ type: 'success', message: '加入成功' });
          let pickerActions = that.data.pickerActions
          let clubList = that.data.clubList
          let action = {}
          action["name"] = res.data.data.clubName
          pickerActions.push(action)
          clubList.push(res.data.data)
          that.setData({
            "clubList": clubList,
            "pickerActions": pickerActions
          })
        } else {
          Notify({ type: 'danger', message: res.data.msg });
        }
      }
    }) 
  },

  getInviteCode(e) {
    this.setData({
      "inviteCode": e.detail.value
    })
    inviteCode = e.detail.value
  },

  toBillDetail(e) {
    let item = e.target.dataset.item;
    let bill = {};
    if (e.target.dataset.type=="pay") {
      bill["billAmount"] = item.payAmount
      bill["billDate"] = this.dateFormat(item.updateTime)
      bill["billTag"] = item.payTags
      bill["billUser"] = item.userName
      bill["billReason"] = item.payReason
      bill["billProof"] = item.payProof
    } else {
      bill["billAmount"] = item.incomeAmount
      bill["billDate"] = this.dateFormat(item.updateTime)
      bill["billTag"] = item.incomeTags
      bill["billUser"] = item.userName
      bill["billReason"] = item.incomeReason
      bill["billProof"] = item.incomeProof
    }
    var billStr = JSON.stringify(bill);
    console.log(billStr);
    
    wx.navigateTo({
      url: '/pages/billDetail/billDetail?bill=' + billStr,
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
    var that = this;
    this.data.clubList.forEach(element=>{
      if (element.clubName==event.detail.name) {
        this.setData({
          "selectedOrg": element
        });
      }
    })
    app.globalData.clubId=this.data.selectedOrg.id
    wx.request({
      url: serverAddr+'getPayList',
      data: {
        "clubId": that.data.selectedOrg.id
      },
      success(res) {
        if (res.data.code == 200) {
          that.setData({
            "payList": res.data.data
          })
        } else {
          Notify({ type: 'danger', message: res.data.msg });
        }
      }
    })
    wx.request({
      url: serverAddr+'getIncomeList',
      data: {
        "clubId": that.data.selectedOrg.id
      },
      success(res) {
        if (res.data.code == 200) {
          that.setData({
            "incomeList": res.data.data
          })
        } else {
          Notify({ type: 'danger', message: res.data.msg });
        }
      }
    })
    wx.request({
      url: serverAddr+'getTotalPay',
      data: {
        "clubId": that.data.selectedOrg.id
      },
      success(res) {
        that.setData({
          "totalPay": res.data.data
        })
      }
    })
    wx.request({
      url: serverAddr+'getTotalIncome',
      data: {
        "clubId": that.data.selectedOrg.id
      },
      success(res) {
        that.setData({
          "totalIncome": res.data.data
        })
      }
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

  dateFormat(dateStr) {
    var date = dateStr.substring(0, 10);
    var time = dateStr.substring(11, 16);
    return date+' '+time
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: serverAddr+'getUserClubs',
      data: {
        "userId": userId
      },
      success(res) {
        let pickerActions = []
        res.data.data.forEach(element => {
          let action = {}
          action["name"] = element.clubName
          pickerActions.push(action);
        });
        that.setData({
          "pickerActions": pickerActions,
          "selectedOrg": res.data.data[0],
          "clubList": res.data.data
        });
        app.globalData.clubId=that.data.selectedOrg.id
        wx.request({
          url: serverAddr+'getPayList',
          data: {
            "clubId": that.data.selectedOrg.id
          },
          success(res) {
            if (res.data.code == 200) {
              that.setData({
                "payList": res.data.data
              })
              console.log(res.data.data);
              
            } else {
              Notify({ type: 'danger', message: res.data.msg });
            }
          }
        })
        wx.request({
          url: serverAddr+'getIncomeList',
          data: {
            "clubId": that.data.selectedOrg.id
          },
          success(res) {
            if (res.data.code == 200) {
              that.setData({
                "incomeList": res.data.data
              })
            } else {
              Notify({ type: 'danger', message: res.data.msg });
            }
          }
        });
        wx.request({
          url: serverAddr+'getTotalPay',
          data: {
            "clubId": that.data.selectedOrg.id
          },
          success(res) {
            that.setData({
              "totalPay": res.data.data
            })
          }
        })
        wx.request({
          url: serverAddr+'getTotalIncome',
          data: {
            "clubId": that.data.selectedOrg.id
          },
          success(res) {
            that.setData({
              "totalIncome": res.data.data
            })
          }
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
    var that = this
    wx.getStorage({
      key: 'updateClubList',
      success(res) {
        let pickerActions = that.data.pickerActions
        let clubList = that.data.clubList
        let action = {}
        action["name"] = res.data.clubName
        pickerActions.push(action)
        clubList.push(res.data)
        that.setData({
          "pickerActions": pickerActions,
          "clubList": clubList
        });
        // res.data.forEach(element => {
        //   let action = {}
        //   action["name"] = element.clubName
        //   pickerActions.push(action);
        // });
        // that.setData({
        //   "pickerActions": pickerActions,
        //   "clubList": res.data
        // });
      },
      fail(res) {
      },
      complete(res) {
        wx.removeStorage({
          key: 'updateClubList',
        })
      }
    });
    if (that.data.selectedOrg.id) {
      wx.request({
        url: serverAddr+'getPayList',
        data: {
          "clubId": that.data.selectedOrg.id
        },
        success(res) {
          if (res.data.code == 200) {
            that.setData({
              "payList": res.data.data
            })
            console.log(res.data.data);
            
          } else {
            Notify({ type: 'danger', message: res.data.msg });
          }
        }
      })
      wx.request({
        url: serverAddr+'getIncomeList',
        data: {
          "clubId": that.data.selectedOrg.id
        },
        success(res) {
          if (res.data.code == 200) {
            that.setData({
              "incomeList": res.data.data
            })
          } else {
            Notify({ type: 'danger', message: res.data.msg });
          }
        }
      });
      wx.request({
        url: serverAddr+'getTotalPay',
        data: {
          "clubId": that.data.selectedOrg.id
        },
        success(res) {
          that.setData({
            "totalPay": res.data.data
          })
        }
      })
      wx.request({
        url: serverAddr+'getTotalIncome',
        data: {
          "clubId": that.data.selectedOrg.id
        },
        success(res) {
          that.setData({
            "totalIncome": res.data.data
          })
        }
      })
    }
    
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
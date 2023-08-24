// const app = getApp()
import '../../utils/msgSendRead.js'

Page({
  data:{
  },

  /*休眠函数*/
  sleep: function(milSec) {
    return new Promise(resolve => {
    setTimeout(resolve, milSec)
    })
  },

  onLoad() {
    var that = this;

  },

  unloadPage:function(){
  },
  onClick1:function () {
    wx.navigateTo({
      url: '/pages/insist_actions/insist_actions?type=' + 1,
    })
  },
  onClick3:function () {
    wx.navigateTo({
      url: '/pages/insist_actions/insist_actions?type=' + 3,
    })
  },
  onClick4:function () {
    wx.navigateTo({
      url: '/pages/insist_actions/insist_actions?type=' + 4,
    })
  },
  onClick5:function () {
    wx.navigateTo({
      url: '/pages/insist_actions/insist_actions?type=' + 5,
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

  onUnload:function() {
    this.unloadPage();
  }
})


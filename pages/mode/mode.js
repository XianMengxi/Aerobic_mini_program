// const app = getApp()

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
  onClickSolid:function () {
    wx.navigateTo({
      url: '/pages/insist_mode/insist_mode',
    })
  },
  onClickExpe:function () {
    wx.navigateTo({
      url: '/pages/control/control?type=' + 2,
    })
  },
  onClickNotlimit:function () {
    wx.navigateTo({
      url: '/pages/control/control?type=' + 3,
    })
  },
  onClickEntertain:function () {
    wx.navigateTo({
      url: '/pages/entertain_mode/entertain_mode',
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


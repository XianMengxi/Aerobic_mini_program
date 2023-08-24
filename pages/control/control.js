
Page({
  data:{
    mode: ''
  },
  /*休眠函数*/
  sleep: function(milSec) {
    return new Promise(resolve => {
    setTimeout(resolve, milSec)
    })
  },

  onLoad(options) {
    this.setData(
      {      
        mode: options.type
      }
    )
  },
  onClick1:function () {
    wx.navigateTo({
      url: '/pages/count_mode/count_mode?type=' + 1 + '&mode=' + this.data.mode,
    })
  },
  onClick2:function () {
    wx.navigateTo({
      url: '/pages/count_mode/count_mode?type=' + 2 + '&mode=' + this.data.mode,
    })
  },
  onClick3:function(){
    wx.navigateTo({
      url: '/pages/count_mode/count_mode?type=' + 3 + '&mode=' + this.data.mode,
    })
  },
  onClick4:function(){
    wx.navigateTo({
      url: '/pages/count_mode/count_mode?type=' + 4 + '&mode=' + this.data.mode,
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
  }
})


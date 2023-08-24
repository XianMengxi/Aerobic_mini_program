// pages/second_deal/second_deal.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: "",   //运动类型
    multiArray_yoga: [['瑜伽动作1', '动作2','动作3','动作4'], ['瑜伽动作1', '动作2','动作3','动作4'], ['瑜伽动作1', '动作2','动作3','动作4'], ['瑜伽动作1', '动作2','动作3','动作4']],
    multiArray_hot: [['动作1', '动作2','动作3','动作4'], ['动作1', '动作2','动作3','动作4'], ['动作1', '动作2','动作3','动作4'], ['动作1', '动作2','动作3','动作4']],
    multiArray_redu: [['减脂动作1', '动作2','动作3','动作4'], ['减脂动作1', '动作2','动作3','动作4'], ['减脂动作1', '动作2','动作3','动作4'], ['减脂动作1', '动作2','动作3','动作4']],
    multiArray_yangwo: [['养我动作1', '动作2','动作3','动作4'], ['减脂动作1', '动作2','动作3','动作4'], ['减脂动作1', '动作2','动作3','动作4'], ['减脂动作1', '动作2','动作3','动作4']],
    multiIndex: [0, 0, 0,0],
  },

  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
    console.log(this.data.type)
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    console.log(data.multiIndex);
    this.setData(data);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    _this.setData({
      type:options.type,
    });
  },
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  slider1change: function(e){
    console.log(e.detail.value)
  },
  slider2change: function(e){
    console.log(e.detail.value)
  },
  slider3change: function(e){
    console.log(e.detail.value)
  },
  onClickJump: function(e){
    wx.navigateTo({
      url: '/pages/msgSendRead/msgSendRead?order='+ JSON.stringify(this.data.multiIndex) + '&type=' + this.data.type,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    wx.navigateBack({
      delta: 1,
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
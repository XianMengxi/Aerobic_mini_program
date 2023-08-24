// pages/show/show.js
import {temp,humi,hr,o2,registerUdp} from '../../utils/msgSendRead.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    timer:'',
    temp_: 25,
    humi_: 60.0,
    hr_: 60,
    o2_: 99,
    inputWeigh: 60.0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var _this = this
    this.data.timer = setInterval(function(){
      _this.setData({
        temp_:temp,
        humi_:humi,
        hr_: hr,
        o2_ : o2
      })
    }, 1000);
  },

  inputYou: function (res) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },
  check_weigh: function () {
  },
  inputYou: function (res){
    console.log(res)
  },
  onClickEntertain:function(res){
    registerUdp()
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
    clearInterval(this.data.timer)
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
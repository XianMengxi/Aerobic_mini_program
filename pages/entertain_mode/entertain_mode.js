// pages/entertain_mode/entertain_mode.js
import {SendMsg,count,registerUdp} from '../../utils/msgSendRead.js'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoUrl: "cloud://hi3861-mqtt-4gnxudlr520eb831.6869-hi3861-mqtt-4gnxudlr520eb831-1311390397/1015649045-1-208.mp4",
    my_count:0,
    max_count:100,
    timer: '',
    my_last_count: 0,
    config: {
      canvasSize: {
        width: 300,
        height: 300
      },
      percent: 100,
      barStyle: [{width: 20, fillStyle: '#f0f0f0'}, {width: 20, animate: true, fillStyle: [{position: 0, color: '#56B37F'}, {position: 1, color: '#c0e674'}]}],
      needDot: true,
      dotStyle: [{r: 20, fillStyle: '#ffffff', shadow: 'rgba(0,0,0,.15)'}, {r: 10, fillStyle: '#56B37F'}]
    },
    percentage: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    var that = this
    this.data.timer = setInterval(function(){
      SendMsg(JSON.stringify({
        mode: parseInt(4),
        type: parseInt(4)
      }))
      that.setData({
        my_count: count
      })
      if(that.data.my_last_count != that.data.my_count)
      {
        that.setData({
          percentage: that.data.my_count / that.data.max_count * 100,
          my_last_count: that.data.my_count
        })
      }
    }, 1000);
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
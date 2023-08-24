// pages/insist_actions/insist_actions.js
// const udp = require('../../utils/msgSendRead.js')
import {SendMsg,registerUdp} from '../../utils/msgSendRead.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    second: 0,
    minute: 0,
    hour: 0,
    mode: 0,
    max_count: 10,
    my_count: 0,
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
    this.setData(
      {
        mode: options.type,
      }
    )
    this.data.timer = setInterval(function(){
      SendMsg(JSON.stringify({
        mode: 1,
        type: parseInt(that.data.mode)
      }))

      var sec = that.data.second + 1
      var min_add = 0
      if(sec >= 60)
      {
        sec = 0
        min_add = 1
      }
      var min = min_add + that.data.minute
      var hour_add = 0
      if(min >= 60)
      {
        hour_add = 1
      }
      var hou = hour_add + that.data.hour
      that.setData(
        {
          second: sec,
          minute: min,
          hour: hou
        }
      )
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
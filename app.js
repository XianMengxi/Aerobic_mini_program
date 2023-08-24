//app.js
import './utils/msgSendRead.js'

App({
  globalData: {
    // 腾讯云物联网通信平台中获取 产品ID和设备名称
    productId: "PZZVOASWFG", // 产品ID
    deviceName: "hi3861_mqtt", // 设备名称
    // 腾讯云控制台-访问管理-访问密钥-API密钥管理中获取 SecretId, SecretKey
    secretId: "AKIDd6KJ2bw2sTpwnOlskMkskNkslOmunQow",
    secretKey: "vazDE3e07zbx5xZyCCzYsxnNiofGcjaC",
    wifi_or_hotspot: true,
  },
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: "hi3861-mqtt-4gnxudlr520eb831",
        traceUser: true,
      })
    }
  wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log(res)
        this.globalData.openid = res.result.openid
      }, 
      fail: err => { 
        console.log('error')
      }
    })

    wx.checkSession({
      success (a) {
        //session_key 未过期，并且在本生命周期一直有效
      },
      fail () {
        // session_key 已经失效，需要重新执行登录流程
        wx.login() //重新登录
      }
    })
  }
})
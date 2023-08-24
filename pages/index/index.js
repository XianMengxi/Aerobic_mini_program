//index.js
// const app = getApp()
const util = require("../../utils/util.js");
var timerID = 0;
Page({
  data: {
    startError: '',//初始化错误提示
    wifiListError: false, //wifi列表错误显示开关
    wifiListErrorInfo: '',//wifi列表错误详细
    system: '', //版本号
    platform: '', //系统 android
    ssid:'HiSpark-AP',
    pass:'12345678',
    bssid: '',//设备号 自动获取
    endError: '',//连接最后的提示
    timerID: ''
  },
  onLoad: function (options) {
    var _this = this;

    //获取输入ssid和passward
    _this.setData({
      ssid:options.WIFI_SSID,
      pass:options.WIFI_PASSWORD
    });
    console.log("wifi名称: "+_this.data.ssid + "  " + "WiFi密码: "+_this.data.pass);

    // 初始化NFC
    _this.NFCAdapter = wx.getNFCAdapter();
    // 获取NDEF对象
    _this.NFCTab = _this.NFCAdapter.getNdef();

    console.log('_this.NFCAdapter',_this.NFCAdapter)
    console.log('_this.NFCTab',_this.NFCTab)

    _this.NFCAdapter.onDiscovered(_this.bind_wifi_start)

    _this.startDiscovery()

    // this.bind_wifi_start();
  },  
  /************** NFC wifi 配网函数**************/
  // 写入数据
  bind_wifi_start() {
    console.log("按下“开始配置”按钮");
    var _this = this;
    var payload = `{"ssid":"${_this.data.ssid}","passwd":"${_this.data.pass}"}`;
    console.log(payload);

    payload = "1234"

    //准备写入的数据
    const records = [
      {
        id: util.str2ab(new Date().getTime().toString()),
        type: util.str2ab('t'), // 无论填入的是大写还是小写，转换完成之后都是小写的字符(十六进制)
        payload: util.str2ab(payload),
        tnf: 2,
      },
    ];

    var NfcA = _this.NFCAdapter.getNfcA()

    NfcA.connect() 
    NfcA.transceive(records)
    NfcA.close()

    _this.NFCAdapter.stopDiscovery() 


    // // 开启定时器
    // this.data.timerID = setInterval(function () {
    //   wx.showToast({
    //     title: "请靠近设备",
    //     icon: "loading",
    //   });
    //   // 搜寻设备
    //   _this.startDiscovery();
    //   // 连接设备
    //   console.log(
    //     'start to connect nfc'
    //   )
    //   _this.NFCconnect(records);
    // }, 1000);
  },

  // 启动NFC搜寻
  startDiscovery:function() {
    this.NFCAdapter.startDiscovery({
      success: (res) => {console.log('sucess to discover')},
      fail: (error) => {console.log('fail to discover',error)},
    });
  },

  // 连接设备
  NFCconnect:function(records) {

    this.NFCTab.connect({
      success: (res) => {
        wx.showToast({
          title: "已连接设备",
          icon: "success",
        });
        // 执行写入
        this.writeNdefMessage(records);
      },
      fail: (error) => {
        wx.showToast({
          title: "请靠近设备",
          icon: "error",
        });
        console.log('nfc connect fail ',error)
      },
      complete: (res) => {},
    });
  },

  // 执行写入
  writeNdefMessage(records) {
    wx.showToast({
      title: "正在执行写入",
      icon: "success",
    });
    this.NFCTab.writeNdefMessage({
      records: records,
      success: (res) => {
        wx.showToast({
          title: "写入数据成功",
          icon: "success",
        });
      },
      fail: (error) => {
        wx.showToast({
          title: "写入数据失败",
          icon: "error",
        });
      },
      complete: () => {
        this.setData({
          disabled: false,
        });
        // 断开连接
        this.NFCTab.close();
        // 关闭定时器
        clearInterval(timerID);
      },
    });
  },

  // 关闭NFC搜寻
  stopDiscovery() {
    wx.showToast({
      title: "关闭NFC搜寻",
      icon: "success",
    });
    this.NFCAdapter.stopDiscovery({
      success: (res) => {
        wx.showToast({
          title: "关闭搜寻成功",
          icon: "success",
        });
      },
      fail: (error) => {
        wx.showToast({
          title: "关闭搜寻失败",
          icon: "error",
        });
      },
    });
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(this.data.timerID)
  },

})
// const app = getApp()

var udp  =  wx.createUDPSocket();
var port = udp.bind(6655);//绑定本机端口号，端口号可以自己设置
var hostport = '6655'
var inputIp = '192.168.43.3'
var inputPort = '5566'

var udp_messages = ''
var receive_flag = false
var is_receive_init = false
var temp = 25
var humi = 50.0;
var count = 0;
var o2 = 99;
var hr = 100;

registerUdp()

function  registerUdp() {
      udp.onMessage(function (res) {
        // console.log(res.message);
        var float32Arr = new Float32Array(res.message)
        console.log(float32Arr)
        temp = float32Arr[0].toFixed(1)
        humi = float32Arr[1].toFixed(1)
        count = float32Arr[2].toFixed(0)
        hr = float32Arr[3].toFixed(0)
        o2 = float32Arr[4].toFixed(0)
        // var unit8Arr = new Uint8Array(res.message);
        // var encodedString = String.fromCharCode.apply(null, unit8Arr),
        // decodedString = decodeURIComponent(escape(encodedString)); //防止中文乱码
        udp_messages = res.message
        receive_flag = true
      });
      udp.onListening(function (res) {
        console.log(res);
      });
      is_receive_init = true
      console.log('regist udp')
  }
  
  //判断输入数据的有效性
  function  JudgeDataValidity(sendMsgbuff){
    if (!inputIp) {
      console.error('请输入要连接设备的IP')
      return false
    } else if (!inputPort) {
      console.error('请输入要连接设备的端口号')
      return false
    } else if (!inputIp && !inputPort) {
      console.error('请输入要连接设备的IP和端口号')
      return false
    } else if (!sendMsgbuff) {
      console.error('数据输入错误')
      return false
    }else {
      return true
    }
  }

  function  SendMsg(sendMsgbuff) {
    console.log('send data')
    if (JudgeDataValidity(sendMsgbuff)) {
      udp.send({
          address:inputIp,
          port:inputPort,
          message:sendMsgbuff,
        });
    }
    else{
      console.error('can not valid udp data')
    }
  }

  export {
    SendMsg,registerUdp,temp,humi,count,o2,hr
  }


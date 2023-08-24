import moment from '../../lib/moment.js'
// const regeneratorRuntime = require('../../lib/runtime.js')

import promisify from '../../lib/promisify.js'; 
const app = getApp()

let chart = 0;
let chart2 = 0;


Page({
  data: {

    onInitChart(F2, config) {
      F2.Global.syncY = true;
      chart = new F2.Chart(config);
      const data = [
        { value: 63.4, city: 'New York', date: '2011-10-01' },
        { value: 62.7, city: 'Alaska', date: '2011-10-01' },
        { value: 72.2, city: 'Austin', date: '2011-10-01' },
        { value: 58, city: 'New York', date: '2011-10-02' },
        { value: 59.9, city: 'Alaska', date: '2011-10-02' },
        { value: 67.7, city: 'Austin', date: '2011-10-02' },
        { value: 53.3, city: 'New York', date: '2011-10-03' },
        { value: 59.1, city: 'Alaska', date: '2011-10-03' },
        { value: 69.4, city: 'Austin', date: '2011-10-03' },
      ];

      chart.source(data, {
        data: {
          tickCount: 5
        },
      });

      chart.scale('date', {
        tickCount: 3
      });
  
      chart.scale('value', {
        tickCount: 5,
        max: 100,
        min: 50
      });
  
      chart.axis('date', {
      label: function label(text, index, total) {
        // 只显示每一年的第一天
        var textCfg = {};
        if (index === 0) {
          textCfg.textAlign = 'left';
        } else if (index === total - 1) {
          textCfg.textAlign = 'right';
        }
        return textCfg;
      }
    });

      // chart.source(data, {
      //   date: {
      //     range: [0, 1],
      //     type: 'timeCat',
      //     mask: 'MM-DD'
      //   },
      //   value: {
      //     max: 100,
      //     tickCount: 10
      //   }
      // });
      chart.area().position('date*value').color('city');
      chart.line().position('date*value').color('city');
      chart.render();
      // 注意：需要把chart return 出来
      return chart;
    },
    onInitChart2(F2, config) {
      chart2 = new F2.Chart(config);
      const data = [
        { value: 33.4, city: 'New York', date: '2011-10-01' },
        { value: 62.7, city: 'Alaska', date: '2011-10-01' },
        { value: 12.2, city: 'Austin', date: '2011-10-01' },
        { value: 58, city: 'New York', date: '2011-10-02' },
        { value: 59.9, city: 'Alaska', date: '2011-10-02' },
        { value: 67.7, city: 'Austin', date: '2011-10-02' },
        { value: 53.3, city: 'New York', date: '2011-10-03' },
        { value: 59.1, city: 'Alaska', date: '2011-10-03' },
        { value: 69.4, city: 'Austin', date: '2011-10-03' },
      ];
      chart2.source(data, {
        date: {
          range: [0, 1],
          type: 'timeCat',
          mask: 'MM-DD'
        },
        value: {
          max: 100,
          tickCount: 4
        }
      });
      chart2.area().position('date*value').color('city').adjust('stack');
      chart2.line().position('date*value').color('city').adjust('stack');
      chart2.render();
      // 注意：需要把chart return 出来
      return chart2;
    },
    noWeight: 60.0,
    remove: 1.0,
    days: 2,
    average: 62.0,
    min: 58.0,
    max: 64.0
  },
  onLoad(options){
    this.getList(app.globalData.openid)
  },  
  addData(){
    DB.collection('user').add({
      data: {
        username: 'zbj'
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        // this.setData({
        //   username: ''
        // })
        wx.showToast({
          title: '新增记录成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad()
 },
  getList(){
    
    const db = wx.cloud.database()
    let This = this
    let resault = {}
    let newArray = []
    db.collection('list').where({
      _openid: app.globalData.openid
    }).get({
      success: function (res) {

        // 坚持天数
        let len = res.data.length - 1
        let days = res.data[len].index
        This.setData({days})

        // 平均体重
        let averageArr = [],average,averageAll = 0
        res.data.forEach(item => {
            item.hasOwnProperty('morningValue') ? (averageAll+=item.morningValue,averageArr.push(item.morningValue)) : ''
            item.hasOwnProperty('eveningValue') ? (averageAll+=item.eveningValue,averageArr.push(item.eveningValue)) : ''
        })
        average = parseInt(averageAll/averageArr.length,10)
        This.setData({average})


        // 最大 最小
        let max = Math.max.apply(null, averageArr),
            min = Math.min.apply(null, averageArr)
        This.setData({max,min})
        
        // 比减少
        let remove =  averageArr[averageArr.length-1] - averageArr[0]
        remove = remove.toFixed(1)
        This.setData({remove})

        // 当前体重
        let noWeight = averageArr[averageArr.length-1]
        This.setData({noWeight})


        // 体重走向
        let weightArr = []
        let weRunData = res.data.length
        This.setData({weRunData})

        res.data.forEach(item => {

          if(item.hasOwnProperty('morningValue')){
            weightArr.push({
              date:moment(item.date,'YYYY-MM-DD').format('M.D'),
              city:'上午',
              value:item.morningValue,
            })
          }

          if(item.hasOwnProperty('eveningValue')){
            weightArr.push({
              date:moment(item.date,'YYYY-MM-DD').format('M.D'),
              city:'下午',
              value:item.eveningValue,
            })
          }

        })

        console.log(weightArr)

        chart.changeData(weightArr);        
      }
    })

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

    let ShareOption = {
      title: '哼，这是我最近的运动状况，你爱看不看╰(￣ω￣ｏ)༼ つ ◕_◕ ༽つ',
      path: '/pages/index1/index1',
    } 
    return ShareOption
  }
});
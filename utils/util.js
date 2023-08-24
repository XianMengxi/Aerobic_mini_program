// 格式化时间
const formatDateTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}
const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}

const formatTime = date => {
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [hour, minute, second].map(formatNumber).join(':')
}

const formatSec = date => {
  const second = date.getSeconds()

  return [second]
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

// 字符串转ArrayBuffer
const str2ab = (str) => {
  var buf = new ArrayBuffer(str.length);
  var bufView = new Uint8Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

// ArrayBuffer转字符串
const ab2str = (buf) => {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}

module.exports = {
  formatTime,
  formatDate,
  formatDateTime,
  formatSec,
  str2ab,
  ab2str
}





function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }

  if ((time + '').length === 10) {
    time = +time * 1000
  }

  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    date = new Date(parseInt(time))
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}
/**
 * 时间过滤器
 */
export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

/**
 * 大写
 * */
export const uppercase = function (value) {
  return value.toUpperCase();
}
/**
 * 截取字符
 * */
export const substring = function (value,index) {
  return value&&value.substring(0,index);
}
/**
 * 截取名字
 * */
export const subName = function (value) {
  let name='';
  if(value && /[\u4E00-\u9FA5\uF900-\uFA2D]/.test(value)){
    if(value.length>3){
      name=value.substring(value.length-2,value.length);
    }else if(value.length==3){
      name=value.substring(1,value.length);
    }else{
      name=value;
    }
  }else{
    name='系统'
  }
  return name;
}
/**
 * 数组变字符串
 * */
export const changeArrayToStr=(arr,symbol,key)=>{
  var str='',symbol=symbol||','
  if(key){
    for(var i=0;i<arr.length;i++){
      str+=i==arr.length-1?arr[i][key]:arr[i][key]+symbol;
    }
  }else{
    for(var i=0;i<arr.length;i++){
      str+=i==arr.length-1?arr[i]:arr[i]+symbol;
    }
  }
  return str;
}
export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

var SIGN_REGEXP = /([yMdhsm])(\1*)/g;
var DEFAULT_PATTERN = 'yyyy-MM-dd';
function padding(s, len) {
    var len = len - (s + '').length;
    for (var i = 0; i < len; i++) { s = '0' + s; }
    return s;
};
import throttle from 'lodash.throttle'
import debounce from 'lodash.debounce'
import Cookies from 'js-cookie';
import { encode } from 'base-64';
import CryptoJS from 'crypto-js'
export default {
    //不重复随机数
    createUniqueString() {
      const timestamp = +new Date() + ''
      const randomNum = parseInt((1 + Math.random()) * 65536) + ''
      return (+(randomNum + timestamp)).toString(32)
    },
    objArrDeepCopy(source,extendObj){
        var sourceCopy = source instanceof Array ? [] : {};
        for (var item in source) {
            sourceCopy[item] = typeof source[item] === 'object' ? this.objArrDeepCopy(source[item],extendObj) : source[item];
            if(typeof extendObj === 'object'&& !(sourceCopy instanceof Array)){
                for(var param in extendObj){
                    sourceCopy[param] = extendObj[param];
                }
            }
        }
        return sourceCopy;
    },
    jsonCopy:(data)=>JSON.parse(JSON.stringify(data)),
    throttle,
    debounce,
    encode,
    Cookies,
    cryptKey:CryptoJS.enc.Utf8.parse("fundway123456789"),
    Encrypt(str){
          let srcs = CryptoJS.enc.Utf8.parse(str);
          let encrypted = CryptoJS.AES.encrypt(srcs, this.cryptKey, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
          return encrypted.toString();
    },
    Decrypt(str){
          let decrypt = CryptoJS.AES.decrypt(str, this.cryptKey, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
          return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    },
    setLoca(key,data){
      localStorage.setItem(key,JSON.stringify(data))
    },
    getLoca(key){
      return JSON.parse(localStorage.getItem(key))
    },
    getSrcUrl(url,data){
      let token=localStorage.getItem('token');
      let urls=this.api;
      if(url.indexOf('?')>-1){
        urls+=url+'&token='+token;
      }else{
        urls+=url+'?token='+token;
      }
      if(data){
        for(var i in data){
          urls+='&'+i+'='+data[i]
        }
      }
      return urls;
    },
    api:process.env.NODE_ENV === 'production'?'':'/apis/',
    resetForm(obj,formName) {
      obj.$refs[formName].resetFields();
    },
    changeArrayToStr(arr,symbol,key){
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
    },
    changeStrToArr(str){
      if(!str){
        return []
      }
      if (str.indexOf(',') > -1) {
        return str.split(',')
      } else {
        return [str]
      }
    },
    getDataFormArr(data,arr,arrkey){
      let newArr=[]
      for(var i=0;i<data.length;i++){
        for(var j=0;j<arr.length;j++){
          if(arr[j][arrkey]==data[i]){
            newArr.push(arr[j])
          }
        }
      }
      return newArr;
    },
    getKeyVal(val,arr,key,symbol){
      var str='',symbol=symbol||',';

      if(typeof(val)=='object'){
        for(var i=0;i<val.length;i++){
          for(var j=0;j<arr.length;j++){
            if(val[i]==arr[j][key]){
              str+=i==val.length-1?arr[j][key]:arr[j][key]+symbol;
            }
          }
        }
      }else{
        for(var j=0;j<arr.length;j++){
          if(val==arr[j][key]){
            str+=arr[j][key];
          }
        }
      }

      return str;
    },
    getValName(val,arr,key,name,symbol){
      var str='',symbol=symbol||',';

      if(typeof(val)=='object'){
        for(var i=0;i<val.length;i++){
          for(var j=0;j<arr.length;j++){
            if(val[i]==arr[j][key]){
              str+=i==val.length-1?arr[j][name]:arr[j][name]+symbol;
            }
          }
        }
      }else{
        for(var j=0;j<arr.length;j++){
          if(val==arr[j][key]){
            str+=arr[j][name];
          }
        }
      }

      return str;
    },
    getQueryStringByName: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        var context = "";
        if (r != null)
            context = r[2];
        reg = null;
        r = null;
        return context == null || context == "" || context == "undefined" ? "" : context;
    },
    removeValFromArr: function(arr,val) {
        for(var i = 0; i < arr.length; i++) {
            if (arr[i] == val){
                arr.splice(i, 1);
                break;
            }
        }
        return arr;
    },
    // 限制上传文件格式
    checkFileType(file){
      const isType = /^.*(doc|docx|pdf|xls|xlsx|jpg|png|jpeg|JPG|JPEG|PNG)$/.test(file.name);
      const isLt20M = file.size / 1024 / 1024 < 20;

      if (!isType) {
        // this.$message.error('上传文件格式只能是 doc,docx,pdf,xls,xlsx,jpg,png,jpeg 格式!');
        alert('上传文件格式不正确!');
      }
      if (!isLt20M) {
        alert('上传头像图片大小不能超过 20MB!');
      }
      return isType && isLt20M;
    },
    changeBaseData:function(dataList,arrKey){
        var newList=[],arrKey=arrKey||["typename","typecode"];
        for(var i=0;i<dataList.length;i++){
          var obj={};
          obj.label=dataList[i][arrKey[0]];
          obj.value=dataList[i][arrKey[1]];
          obj.key=dataList[i][arrKey[1]];
          newList.push(obj);
        }
        return newList;
    },
    // 获取今天
    getToday(){
      let date=new Date();
      return this.formatDate.format(date,'yyyy-MM-dd');
    },
    // 获取最近几天
    getRecentlyDat(num){
      const end = new Date();
      const start = new Date();
      start.setTime(end.getTime() - 3600 * 1000 * 24 * num);
      return [this.formatDate.format(start,'yyyy-MM-dd'), this.formatDate.format(end,'yyyy-MM-dd')];
    },
    // 获取本周
    getWeekDay(){
      let now = new Date();
      let nowTime = now.getTime() ;
      let day = now.getDay();
      let oneDayLong = 24*60*60*1000 ;
      let MondayTime = nowTime - (day-1)*oneDayLong;
      let SundayTime =  nowTime + (7-day)*oneDayLong;

      let monday = new Date(MondayTime);
      let sunday = new Date(SundayTime);
      return [this.formatDate.format(monday,'yyyy-MM-dd'), this.formatDate.format(sunday,'yyyy-MM-dd')];
    },
    // 获取本年
    getNowYear(){
      let currentYear=new Date().getFullYear();
      let currentYearFirstDate=new Date(currentYear,0,1);
      let currentYearLastDate=new Date(currentYear,11,31);
      return [this.formatDate.format(currentYearFirstDate,'yyyy-MM-dd'), this.formatDate.format(currentYearLastDate,'yyyy-MM-dd')];
    },
    // 获取当前月的第一天
    getCurrentMonthFirst(){
      let date=new Date();
      date.setDate(1);
      return this.formatDate.format(date,'yyyy-MM-dd');
    },
    // 获取当前月的最后一天
    getCurrentMonthLast(){
      var date=new Date();
      var currentMonth=date.getMonth();
      var nextMonth=++currentMonth;
      var nextMonthFirstDay=new Date(date.getFullYear(),nextMonth,1);
      var oneDay=1000*60*60*24;
      return this.formatDate.format(new Date(nextMonthFirstDay-oneDay),'yyyy-MM-dd');
    },
    //获取上个月的今天
    getLastMouth(){
      var today = new Date();
      var lastMouth=new Date(today.getTime()-31 * 24 * 3600 * 1000);
      return this.formatDate.format(lastMouth,'yyyy-MM-dd');
    },
    //获取下个月的今天
    getNextMouth(){
      var today = new Date();
      var nextMouth=new Date(today.getTime()+31 * 24 * 3600 * 1000);
      return this.formatDate.format(nextMouth,'yyyy-MM-dd');
    },
    formatDate: {
      format: function (date, pattern) {
        if(!date){
          return null;
        }
        pattern = pattern || DEFAULT_PATTERN;
        return pattern.replace(SIGN_REGEXP, function ($0) {
          switch ($0.charAt(0)) {
            case 'y': return padding(date.getFullYear(), $0.length);
            case 'M': return padding(date.getMonth() + 1, $0.length);
            case 'd': return padding(date.getDate(), $0.length);
            case 'w': return date.getDay() + 1;
            case 'h': return padding(date.getHours(), $0.length);
            case 'm': return padding(date.getMinutes(), $0.length);
            case 's': return padding(date.getSeconds(), $0.length);
          }
        });
      },
      parse: function (dateString, pattern) {
        if(!dateString){
          return null;
        }
        var matchs1 = pattern.match(SIGN_REGEXP);
        var matchs2 = dateString.match(/(\d)+/g);
        if (matchs1.length == matchs2.length) {
          var _date = new Date(1970, 0, 1);
          for (var i = 0; i < matchs1.length; i++) {
            var _int = parseInt(matchs2[i]);
            var sign = matchs1[i];
            switch (sign.charAt(0)) {
              case 'y': _date.setFullYear(_int); break;
              case 'M': _date.setMonth(_int - 1); break;
              case 'd': _date.setDate(_int); break;
              case 'h': _date.setHours(_int); break;
              case 'm': _date.setMinutes(_int); break;
              case 's': _date.setSeconds(_int); break;
            }
          }
          return _date.getTime();
        }
        return null;
      }
    },
    getWeekDays(n){
      var now = new Date;
      var day = now.getDay ();
      var week = "7123456";
      var first = 0 - week.indexOf (day);
      var f = new Date;
      f.setDate (f.getDate () + first);
      var last = 6 - week.indexOf (day);
      var l = new Date;
      l.setDate (l.getDate () + last);
      return [
        f, l
      ];
    },
    //获取当前月
    getCurrentMonth: function(M,noTime) {
        var newDate = new Date();
        var currentMonth = M?M:newDate.getMonth() + 1;
        var start = newDate.getFullYear() + '-' + currentMonth + '-1';
        start = new Date(start);
        var nextStart = new Date(start.getFullYear(), start.getMonth() + 1, start.getDate());
        var end = new Date(nextStart.getTime() - 1000 * 60 * 60 * 24);
        if(noTime){
            start=this.formatDate.format(start, 'yyyy-MM-dd');
            end=this.formatDate.format(end, 'yyyy-MM-dd');
        }
        return [start, end];
    },
    // 比较时间
    compareTime(start,end){
      return new Promise((resolve, reject) => {
        if(!start||!end){
          return
        }
        let starts=this.formatDate.parse(start,'yyyy-MM-dd hh:mm'),
            ends=this.formatDate.parse(end,'yyyy-MM-dd hh:mm')
        if(starts>ends){
          resolve()
        }else if(starts==ends){
          resolve('时间不能相同！')
        }
      })

    },
    pickerOptions:[
    {
      text: '最近一周',
      onClick(picker) {
        const end = new Date(new Date().toDateString());
        const start = new Date();
        start.setTime(end.getTime() - 3600 * 1000 * 24 * 7);
        picker.$emit('pick', [start, end]);
      }
    }, {
      text: '最近一个月',
      onClick(picker) {
        const end = new Date(new Date().toDateString());
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        picker.$emit('pick', [start, end]);
      }
    }, {
      text: '最近三个月',
      onClick(picker) {
        const end = new Date(new Date().toDateString());
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        picker.$emit('pick', [start, end]);
      }
    }]

};

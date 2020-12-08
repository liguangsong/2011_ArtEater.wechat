
import config from '../static/config/index.js'
/** 时间：字符串转换成时间 */
export const toDateFromString = (dateString)=> {
  if (dateString) {
    dateString = dateString.replace(/T/g,' ')
    dateString = dateString.replace(new RegExp("-","gm"),"/");
    var date = new Date(dateString)
    return date;
  }
}
/** 查看过去了多久 */
export const toLostTime = (date)=> {
  var time = date.getTime()
  var now = new Date().getTime()
  var lostTime = now - time;
  var years = new Date().getFullYear() - date.getFullYear();
  var months = years*12 + (new Date().getMonth() - date.getMonth());
  var days = Math.floor(lostTime / 24 / 60 / 60 / 1000);
  var hours = Math.floor(lostTime % (24 * 60 * 60 * 1000) / 60 / 60 / 1000);
  var minits = Math.floor(lostTime % (60 * 60 * 1000) / 60 / 1000);
  var str = ''
  if(years == 1){
    return '去年'
  }
  if(years == 2){
    return '前年'
  }
  if(years > 2){
    return years + '年前'
  }
  if(months == 1){
    return '上个月'
  }
  if(months > 1){
    return months + '月前'
  }
  if (days == 1) {
    return '昨天'
  } else if(days == 2){
    return '前天'
  } else if (days > 2) {
    return days + '天前'
  }
  if (hours > 0) {
    return date.getHours()+':'+ date.getMinutes()
  }
  if (minits > 0) {
    return date.getHours()+':'+ date.getMinutes()
  } else {
    return "刚刚"
  }
}
/** 查看还有多久 */
export const toWillTime = (date)=> {
  var time = date.getTime()
  var now = new Date().getTime()
  var nowDay = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime()
  var lostTime = time - now;
  var willDay = time - nowDay;
  var days = Math.floor(willDay / 24 / 60 / 60 / 1000);
  var hours = Math.floor(lostTime % (24 * 60 * 60 * 1000) / 60 / 60 / 1000);
  var minits = Math.floor(lostTime % (60 * 60 * 1000) / 60 / 1000);
  var str = ''
  if (days == 1) {
    return '明天'
  } else if (days == 2) {
    return '后天'
  } else if (days > 2) {
    return days + '天后'
  }
  if (hours > 0) {
    return hours + '小时后'
  }
  if (minits > 0) {
    return minits + '分钟后'
  } else {
    return "现在"
  }
}
/** 时间：获取指定日期是星期几（中文） */
export const getWeekStr = (date) => {
  var day= date.getDay();
  switch (day) {
    case 0:
      return '周日';
    case 1:
      return '周一';
    case 2:
      return '周二';
    case 3:
      return '周三';
    case 4:
      return '周四';
    case 5:
      return '周五';
    case 6:
      return '周六';
  }
}
/** 时间：获取指定数字是星期几（中文） */
export const getWeekStrByWeek = (week) => {
  switch (week) {
    case 0:
      return '周日';
    case 1:
      return '周一';
    case 2:
      return '周二';
    case 3:
      return '周三';
    case 4:
      return '周四';
    case 5:
      return '周五';
    case 6:
      return '周六';
  }
}
/** 获取日期字符串 */
export const GetDateStr = (date) => {
  if(date == dateFormat(addDays(new Date(), 1), 'yyyy-MM-dd')) {
    return '明天'
  }
  if (date == dateFormat(new Date(), 'yyyy-MM-dd')) {
    return '今天'
  } else if (date == dateFormat(addDays(new Date(), -1), 'yyyy-MM-dd')) {
    return '昨天'
  } else {
    return dateFormat(toDateFromString(date), 'MM月dd日')
  }
}
/** 时间：时间格式化成字符串 */
export const dateFormat = (date, fmt) => {
  let ret;
  const opt = {
    "y+": date.getFullYear().toString(),        // 年
    "M+": (date.getMonth() + 1).toString(),     // 月
    "d+": date.getDate().toString(),            // 日
    "H+": date.getHours().toString(),           // 时
    "m+": date.getMinutes().toString(),         // 分
    "s+": date.getSeconds().toString()          // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    };
  };
  return fmt;
}
/** 增加天数 */
export const addDays = (date, number) => {
  var adjustDate = new Date(date.getTime() + 24 * 60 * 60 * 1000 * number)
  // alert("Date" + adjustDate.getFullYear() + "-" + adjustDate.getMonth() + "-" + adjustDate.getDate());
  return adjustDate;
}
/** 增加秒数 */
export const addSeconds = (date, number) => {
  var adjustDate = new Date(date.getTime() + 1000 * number)
  // alert("Date" + adjustDate.getFullYear() + "-" + adjustDate.getMonth() + "-" + adjustDate.getDate());
  return adjustDate;
}

/** 增加月数 */
export const addMonths = (date, number) => {
  return new Date(date.getFullYear(),date.getMonth()+number,date.getDate(),date.getHours(),date.getMinutes(),date.getSeconds());
  // alert("Date" + adjustDate.getFullYear() + "-" + adjustDate.getMonth() + "-" + adjustDate.getDate());
}

/** 获取文件类型 */
export const getfileType = (filename) => {
  var _index = filename.lastIndexOf('.');
  var lastfilename = filename.substring(_index, filename.length)
  switch (lastfilename) {
    case '.doc':
    case '.docx':
      return 'word';
    case '.xls':
    case '.xlsx':
      return 'excel';
    case '.ppt':
    case '.pptx':
      return 'ppt';
    case '.pdf':
      return 'pdf';
    default:
      return 'default';
  }
}

/**
 * 优化filename显示(用省略号代替)
 */ 
export const getfilename = (filename) => {
  var _index = filename.lastIndexOf('.');
  var firstfilename = filename.substring(0, _index);
  var lastfilename = filename.substring(_index, filename.length)
  if (firstfilename.length > 24) {
    return firstfilename.substring(0, 22) + '…' + lastfilename;
  } else {
    return firstfilename + lastfilename;
  }
}

/**
* 坐标转换，百度地图坐标转换成腾讯地图坐标
* lng 腾讯经度（pointy）
* lat 腾讯纬度（pointx）
* 经度>纬度
*/
export const bMapToQQMap = (lng, lat) => {
  if (lng == null || lng == '' || lat == null || lat == '')
      return [lng, lat];
  var x_pi = 3.14159265358979324 * 3000.0 / 180.0;;
  var x = parseFloat(lng) - 0.0065;
  var y = parseFloat(lat) - 0.006;
  var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
  var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
  var lng = (z * Math.cos(theta)).toFixed(7);
  var lat = (z * Math.sin(theta)).toFixed(7);
  return [lng, lat];
}

/**
* 坐标转换，腾讯地图转换成百度地图坐标
* lng 腾讯经度（pointy）
* lat 腾讯纬度（pointx）
* 经度>纬度
*/

export const qqMapToBMap = (lng, lat) => {
  if (lng == null || lng == '' || lat == null || lat == '')
      return [lng, lat];
  var x_pi = 3.14159265358979324 * 3000.0 / 180.0;;
  var x = parseFloat(lng);
  var y = parseFloat(lat);
  var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
  var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
  var lng = (z * Math.cos(theta) + 0.0065).toFixed(5);
  var lat = (z * Math.sin(theta) + 0.006).toFixed(5);
  return [lng, lat];
}
/**
 * 处理富文本里的图片宽度自适应
 * 1.去掉img标签里的style、width、height属性
 * 2.img标签添加style属性：max-width:100%;height:auto
 * 3.修改所有style里的width属性为max-width:100%
 * 4.去掉<br/>标签
 * @param html
 * @returns {void|string|*}
 */
export const formatRichText = (html) => {
  let newContent= html.replace(/<img[^>]*>/gi,function(match,capture){
      match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
      match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
      match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
      return match;
  });
  newContent = newContent.replace(/style="[^"]+"/gi,function(match,capture){
      match = match.replace(/width:[^;]+;/gi, 'width:100%;').replace(/width:[^;]+;/gi, 'width:100%;');
      return match;
  });
  newContent = newContent.replace(/<br[^>]*\/>/gi, '');
  newContent = newContent.replace(/\<img/gi, '<img style="width:100%;height:auto;display:block;margin:10px 0;"');
  return newContent;
}

export const GetRandomNum = (num) => {
	var res = Math.floor(Math.random() * Math.pow(10, num) - 1 );
	var result = ('000000000' + res).slice(-10); // 补全前置0
	return res
}

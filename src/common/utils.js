// 防抖函数：避免多次访问造成浏览器压力过大
export function debounce(func,delay){
      let timer = null;
      return function(...args) {
         if (timer) clearTimeout(timer);
       timer = setTimeout(() => {
          func.apply(this,args)
         },delay)
      }
   }

// 时间戳的格式化 data/date务必区分
export function FormDate(date,fmt) {
   var date = new Date(date);
   //获取年份
   // y+ -> 1个或多个y
   // y* -> 0个或者多个y
   // y? -> 0个或者1个y
   if (/(y+)/.test(fmt)){
      //RegExp.$1表示fmt，当传入2019，再进行字符串的拼接，同时也进行截取，从左往右截取
      fmt = fmt.replace(RegExp.$1,(date.getFullYear() + '')).substr(4 - RegExp.$1.length);
   }
   let o = {
      'M+': date.getMonth()+1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
   };
   for (let k in o) {
     if (new RegExp(`(${k})`).test(fmt)) {
         let str = o[k] + '';
         fmt = fmt.replace(RegExp.$1,(RegExp.$1.length === 1) ? str : padLeftZero(str));
      }
   }
   return fmt;
};
//巧妙算法 当str为04,加上‘00’等于0004，利用str截取两位，就可以等于04，截取都是从左往右截取
function padLeftZero (str) {
   return ('00' + str).substr(str.length);
};
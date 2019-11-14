import qs from 'qs';
import CryptoJS from 'crypto-js';

// 检测传入的参数类型； 【 'undefined','object', 'number', 'string', 'boolean' 、'function' 】
function checkType(target, hook = undefined) {
  var type = typeof target;
  var flag = true; // 默认是正确类型

  var handleFunction = function() {
    // 提供外部处理方法
    hook && (flag = hook(false) || false);
  };

  var HandleObjectType = function() {
    // Object 、 Array、 null
    if (target instanceof Object) {
      // 如果不是 null
      if (target instanceof Array) {
        // 如果是数组
        handleArray();
      } else {
        handleObject();
      }
    } else {
      flag = false;
    }
  };

  var handleObject = function() {
     try{
        if (JSON.stringify(target) == "{}") flag = false;
     }catch(  error ){
        console.log(error )
     }
  
  };

  var handleArray = function() {
    if (target.length <= 0) flag = false;
  };

  var handleBoolean = function() {
    hook && (flag = hook(false) || false);
  };

  var handleString = function() {
    if (target.trim() === "") flag = false;

    hook && (flag = hook(false) || false);
  };

  var handleNumber = function() {
    hook && (flag = hook(false) || false);
  };

  switch (type) {
    case "undefined":
      flag = false;
      break;
    case "number":
      handleNumber();
      break;
    case "boolean":
      handleBoolean(); // null 也是 object 类型
      break;
    case "object":
      HandleObjectType(); // 区分Object 、 Array、 null
      break;
    case "string":
      handleString();
      break;
    case "function":
      handleFunction();
      break;
  }

  return flag;
}

class Util {


  searchStr() {
    let _regex = /\?(.+)/.exec(window.location.hash);
    return _regex ? _regex[1] : "";
  }

  fontInit(float) {
    document.documentElement.style.fontSize =
      document.documentElement.clientWidth / float + "px";
    window.addEventListener(
      "resize",
      function() {
        document.documentElement.style.fontSize =
          document.documentElement.clientWidth / float + "px";
      },
      false
    );
  }


  /*
  setQsInfo(object) {
    return qs.stringify(Object.assign(qs.parse(this.searchStr()), object ? object : {}))
  }*/
  checkReg(str) {
    let _reg = new RegExp("(?:" + str + "\\=)(\\w+)(?:;)");
    let value = _reg.exec(document.cookie);
    return value ? value[1] : "";
  }

  setCookie(key, val, time = undefined ) {
    /* demo： Util.setCookie("remark","damn it",24) */
    let date = new Date();
    let expiresDays = time;
     if( time ){
         date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000);
         document.cookie = key + "=" + val + ";expires=" + date.toGMTString();
     }else{
        // 只存于页面生命周期
        document.cookie = key + "=" + val;
     }

  }

  getCookie(key) {
     // nodejs 环境没有 window、document 对象
    if (typeof document == "undefined") return '';
    let getCookie = document.cookie.replace(/[ ]/g, "");
    let arrCookie = getCookie.split(";");
    let tips;
    for (let i = 0; i < arrCookie.length; i++) {
      let arr = arrCookie[i].split("=");
      if (key === arr[0]) {
        tips = arr[1];
        break;
      }
    }
    return tips;
  }

  deleteCookie(key) {
    let date = new Date();
        date.setTime(date.getTime() - 10000); //将date设置为过去的时间
        document.cookie = key + "=v; expires =" + date.toGMTString();
  }

  deleteCookies = ( keys ) => {
     if( keys instanceof Array )  keys.forEach( key => this.deleteCookie( key ) );
  }


  typeof(object) {
    return Object.prototype.toString
      .call(object)
      .split(/\s/)[1]
      .slice(0, -1);
  }

  sayswho() {

    // 判断浏览器版本
    let ua = window.navigator.userAgent,
      tem,
      M =
        ua.match(
          /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
        ) || [];
    if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return "IE " + (tem[1] || "");
    }
    if (M[1] === "Chrome") {
      tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
      if (tem != null)
        return tem
          .slice(1)
          .join(" ")
          .replace("OPR", "Opera");
    }
    M = M[2] ? [M[1], M[2]] : [window.navigator.appName, window.navigator.appVersion, "-?"];
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
    return M.join(" ");
  }

  // 类型验证; 空值、 undefined、 null都会返回 false。 【object、 string、 number、 boolean、 空值、 undefined、 null】
  isValid(target) {
    return checkType(target);
  }



  isNumber(target) {
    let f = checkType(target);
    if (f) {
      isNaN( target ) ? (f = false) : (f = true);
    }
    return f;
  }

  isObject(target) {
    let f = checkType(target);
    if (f) {
      if (!(target instanceof Array) && target instanceof Object) {
        f = true;
      } else {
        f = false;
      }
    }
    return f;
  }

  isArray( target ){
      let f = checkType(target);
      if (f) {
        if ( target instanceof Object && target instanceof Array ) {
          f = true;
        } else {
          f = false;
        }
      }
      return f;
  }



  // 随机生成id
  genNonDuplicateID(randomLength = Math.floor(Math.random() * 20) + 1) {
    return Number(
      Math.random()
        .toString()
        .substr(3, randomLength) + Date.now()
    ).toString(36);
  }

  //生成n位长度的字符串,用于前端生成唯一id
  randomKey(n) { 
    let str = "abcdefghijklmnopqrstuvwxyz0123456789"; // 可以作为常量放到random外面
    let result = "";
    for(var i = 0; i < n; i++) {
        result += str[parseInt(Math.random() * str.length)];
    }
    result = result
    return result;
  }
  

  getBodyClientHeight(mpart = 0) {
    // nodejs 环境没有 window、document 对象
    if (typeof document != "undefined")
      return document.documentElement.clientHeight - mpart;
    return 0;
  }

  getBodyClientWeight(mpart = 0) {
    // nodejs 环境没有 window、document 对象
    if (typeof document != "undefined")
       return document.documentElement.clientWidth - mpart;
      return 0;
  }

  // 查找指定元素是否与给定元素存在父子关系
  isChildOf(child, parent) {
    var parentNode;
    if (child && parent) {
      parentNode = child.parentNode;
      while (parentNode) {
        if (parent === parentNode) {
          return true;
        }
        parentNode = parentNode.parentNode;
      }
    }
    return false;
  }

   //生成从minNum到maxNum的随机数
   randomNum(minNum,maxNum){
    switch(arguments.length){
      case 1:
        return parseInt(Math.random()*minNum+1,10);
        break;
      case 2:
        return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
        break;
      default:
        return 0;
        break;
    }
  }


  // 获取url中 ？号后面的参数
  getRequest() {  
    var url = window.location.search; 
    var theRequest = new Object();  
    if (url.indexOf("?") != -1) {  
        var str = url.substr(1);  
        var strs = str.split("&");  
       for(var i = 0; i < strs.length; i ++) {  
          theRequest[strs[i].split("=")[0]]=decodeURIComponent(strs[i].split("=")[1]);  
       } 
        return theRequest;  
    }else{
        return {}
    }  
  
  }  
  


  //校验手机号
  // 中国大陆：开头1 0-9号段，后边跟9位数字
  // 台湾：09开头后面跟8位数字
  // 香港：9或6开头后面跟7位数字
  // 澳门：66或68开头后面跟5位数字
   checkPhone(phone){
   //  let pattern=/^1[0-9]{10}$/;
   let pattern = /^[1][0-9]\d{9}$|^([6|9])\d{7}$|^[0][9]\d{8}$|^[6]([8|6])\d{5}$/;
    return pattern.test(phone);
  }


 checkEmail(email){
    let pattern = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
    return pattern.test(email);
 }



  //给数字加三位一逗号间隔的方法
  formatNumber(nStr ){ 
    nStr += '';  
    let x = nStr.split('.');  
    let x1 = x[0];  
    let x2 = x.length > 1 ? '.' + x[1] : '';  
    let rgx = /(\d+)(\d{3})/;  
    while (rgx.test(x1)) {  
        x1 = x1.replace(rgx, '$1' + ',' + '$2');  
    }  
    return x1 + x2;  
  }


  

/**
 *   清除空格、把中文逗号换成英文逗号、清除句号；
 */
purifyKeywords = ( value ) => {
  var val = value.replace(/[. || 。]/ig,',');  
       val = val.replace(/，/ig,',');  
       val = val.replace(/\s/g,'');
       val = val.replace(/(,)+/g,',');
      return val;
}

  
  toParam = () =>{  // 把 url 参数转成对象
    var url = window.location.search; 
    var theRequest = '';
    var param = {};
    if (url.indexOf("?") != -1) {  
        theRequest = url.substr(1);  
    }
    param = qs.parse( theRequest );
    return  param 
  }



  toQuery = ( param ) =>{ // 转换成 url 
    if( this.isValid( param ) ){
        var stringifyParam = qs.stringify( param  );
            window.history.pushState({}, '', window.location.href.split('?')[0] + '?' + stringifyParam )
      }else{
            window.history.pushState({}, '', window.location.href.split('?')[0] )
      }
  }



  getScrollbarWidth() { // 获取页面滚动条宽度
    var oP = document.createElement('p'),
        styles = {
            width: '100px',
            height: '100px'
        }, i, clientWidth1, clientWidth2, scrollbarWidth;
    for (i in styles) oP.style[i] = styles[i];
    document.body.appendChild(oP);
    clientWidth1 = oP.clientWidth;
    oP.style.overflowY = 'scroll';
    clientWidth2 = oP.clientWidth;
    scrollbarWidth = clientWidth1 - clientWidth2;
    oP.remove();
     return scrollbarWidth;

}



// 切换全屏方法
fullScreen (isOpen, target) {
  let dom = target || void 0
  let open_list = ['requestFullscreen', 'mozRequestFullScreen', 'webkitRequestFullScreen', 'msRequestFullscreen']
  let cancel_list = ['exitFullscreen', 'mozCancelFullScreen', 'webkitCancelFullScreen']
  let fn = void 0

  if (isOpen) {
      fn = open_list.find((n) => { return Boolean(dom[n])  });
      fn && dom[fn]()
  } else {
      fn = cancel_list.find( (n) => { return Boolean(document[n]) });
      try{
        fn && document[fn]()
      }catch( error ){
          console.error( error )
      }
       
     
  }
}


// 判断是否是全屏
isFullScreen () {
  return document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen || document.fullscreen
}


deepCopy( obj ){
  let newObject = {};
 if( Array.isArray( obj ) ) return newObject;
  Object.keys(obj).forEach( key => {
      if( typeof obj[key] == 'object' && obj[key] !== null ){
           if( obj[key] instanceof Array ){
             newObject[key] = [];
             obj[key].forEach(( _obj, index ) =>{
                 if( typeof _obj == 'object' && _obj !== null  ){
                       newObject[key][index] = this.deepCopy( _obj );
                 }else{
                      newObject[key][index] = _obj;
                 }   
             })

           }else{
             if( typeof obj[key] == 'object' && obj[key] !== null  ){
                    newObject[key] = this.deepCopy( obj[key] );
             }else{
                  newObject[key] = obj[key];
             }
         
           }
      }else{
         newObject[key] = obj[key];
      }
 })
 return newObject
}

deepCopyArray( arr ){
    var newArry = [];
   if( Array.isArray( arr ) ){
      arr.forEach( item => {
          if( Array.isArray( item ) ){
              newArry.push( this.deepCopyArray( item ) ); 
          }else{
              newArry.push( this.deepCopy( item ) ); 
          }
      })
   }
  return newArry
}



//获得浏览器的滚动条宽度 var
 getScrollbarWidth = () => {
   if(typeof window !== undefined && window !== null){
      let oP = document.createElement('p'),
          styles = {
              width: '100px',
              height: '100px',
              overflowY: 'scroll'
          }, i, scrollbarWidth;
      for (i in styles) oP.style[i] = styles[i];
      document.body.appendChild(oP);
      scrollbarWidth = oP.offsetWidth - oP.clientWidth;
      try {
          oP.remove();
      } catch (error) {
          oP.removeNode(true);
      }
      return scrollbarWidth;
   }

   return 0
    
}


 isUrl(path) {
    const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;
    return reg.test(path)
  }


  secretkey = 'wshop_201911141230034_5459';


  // 加/解密
    secret( string, operation = false ){
      var res = ''; 
      if( operation ){
        res = CryptoJS.AES.decrypt( string , this.secretkey ).toString(CryptoJS.enc.Utf8);
       // console.log("解密结果："+ res );
      }else{
        res = CryptoJS.AES.encrypt( string , this.secretkey ).toString();
       // console.log("加密结果"+ res );
      }
    return res
  }



}


export default new Util();

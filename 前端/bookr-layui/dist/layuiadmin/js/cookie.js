/** layuiAdmin.std-v1.1.0 LPPL License By http://www.layui.com/admin/ */
 ;layui.define(["jquery"],function(e){var n=layui.jquery;!function(o){!function(o){"function"==typeof define&&define.amd?define(["jquery"],o):o("object"==typeof e?require("jquery"):n)}(function(e){function n(e){return c.raw?e:encodeURIComponent(e)}function o(e){return c.raw?e:decodeURIComponent(e)}function i(e){return n(c.json?JSON.stringify(e):String(e))}function r(e){0===e.indexOf('"')&&(e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{return e=decodeURIComponent(e.replace(u," ")),c.json?JSON.parse(e):e}catch(n){}}function t(n,o){var i=c.raw?n:r(n);return e.isFunction(o)?o(i):i}var u=/\+/g,c=e.cookie=function(r,u,f){if(void 0!==u&&!e.isFunction(u)){if(f=e.extend({},c.defaults,f),"number"==typeof f.expires){var a=f.expires,d=f.expires=new Date;d.setTime(+d+864e5*a)}return document.cookie=[n(r),"=",i(u),f.expires?"; expires="+f.expires.toUTCString():"",f.path?"; path="+f.path:"",f.domain?"; domain="+f.domain:"",f.secure?"; secure":""].join("")}for(var p=r?void 0:{},s=document.cookie?document.cookie.split("; "):[],l=0,m=s.length;l<m;l++){var v=s[l].split("="),y=o(v.shift()),k=v.join("=");if(r&&r===y){p=t(k,u);break}r||void 0===(k=t(k))||(p[y]=k)}return p};c.defaults={},e.removeCookie=function(n,o){return void 0!==e.cookie(n)&&(e.cookie(n,"",e.extend({},o,{expires:-1})),!e.cookie(n))}})}(n),e("cookie",null)});
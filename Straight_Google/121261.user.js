// ==UserScript==
// @name 			Straight Google
// @id				straight_google_pokerface
// @version			1.17.10
// @author			Pokerface - Kevin
// @namespace	  	in.co.tossing.toolkit.google
// @description		Remove URL redirection from google products
// @license			GPL v3 or later version
// @downloadURL		https://userscripts.org/scripts/source/121261.user.js
// @updateURL		https://userscripts.org/scripts/source/121261.meta.js
// @run-at			document-end

// @grant			GM_addStyle
// @grant			GM_xmlhttpRequest

// @include		*://www.google.*/*q=*
// @include		*://www.google.*/*tbs=*
// @include		*://www.google.*/search?*
// @include		*://www.google.*/webhp?*
// @include		*://www.google.*/cse?*
// @include		*://www.google.*/?*
// @include		*://www.google.*/#*
// @include		*://www.google.*/
// @include		*://encrypted.google.*
// @include		*://ipv6.google.*
// @include		*://www.google.*/news*
// @include		*://news.google.*/*
// @include		*://plus.google.com/_/scs/apps-static/_/js/*
// @include		*://images.google.com/*
// @include		*://docs.google.com/*
// @include		*://maps.google.com/*
// @include		*://www.google.com/maps*
// @include		*://ditu.google.com/*
// @include		*://www.youtube.*
// @include		*://groups.google.com/group/*
// @include		*://www.google.com/bookmarks/*
// @include		*://history.google.com/bookmarks/*
// @include		*://www.google.com/history/*
// @include		*://www.google.com/prdhp*
// @include		*://www.google.com/products/catalog?*
// @include		*://www.google.com/shopping/product/*
// @include		*://mail.google.com/* 
// @include		*://www.google.com/mail*
// @include		*://play.google.com/store*

// @exclude		*://www.google.com/reader/*
// ==/UserScript==

/*
    Straight Google (also named as Straight Search)
    Kevin Wang (kevixw'At'gmail.com)
    Copyright (c) 2013 . All rights reserved.
	
	This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

var d=!0,g=null,j=!1;function m(){return function(){}}var n=document;function q(a,b){var c;if(a)if(b)for(c in a)b.call(a[c]);else for(c in a)if("function"===typeof a[c])a[c]()}function s(a,b){for(var c in b)a!==b[c]&&b[c]&&(a[c]=b[c]);return a}
function t(a,b){function c(){function b(){y=(new Date).getTime();k=d;a.apply(z,p);k=j;r.shift()}0<h&&A==g&&(A=setInterval(c,h));var Q=(new Date).getTime()-y,z=this,p=u.b(arguments);if(1>r.length||k)Q<e?r.push(setTimeout(b,Math.max(100,f+e-(k?0:Q)))):r.push(setTimeout(b,Math.max(100,f)))}b=b||{};var e=b.g||0,f=b.i||0,h=b.w||0,y=0,r=[],k=j,A=g;return c}function v(a){aa&&console.debug(a)}
for(var aa=j,u={isStrictArray:function(a){return"[object Array]"===Object.prototype.toString.apply(a)},isRegExp:function(a){return"[object RegExp]"===Object.prototype.toString.apply(a)},toArray:function(a){return this.isArray(a)?this.n(a)?a:Array.prototype.slice.apply(a):[a]},isArray:function(a){a=Object.prototype.toString.apply(a);return"[object Array]"===a||"[object NodeList]"===a||"[object Arguments]"===a},trim:function(a){return a.replace(/^\s+|\s+$/g,"")},trimS:function(a){return this.trim(a).replace(/\s{2,}/g,
" ")}},w=window.navigator,ba=w.userAgent.toLowerCase(),x=[/.*version\/([\w.]+).*(safari).*/,/.*(msie) ([\w.]+).*/,/.*(firefox)\/([\w.]+).*/,/(opera).+version\/([\w.]+)/,/.*(chrome)\/([\w.]+).*/],B={name:"unknown",version:"unknown",language:w.language||w.userLanguage||"",toString:function(){return this.name}},C=0,D=g;C<x.length;++C)if(D=x[C].exec(ba)){B.name=(0==C?D[2]:D[1])||"unknown";B.version=(0==C?D[1]:D[2])||"unknown";B[B.name]=d;break}var E;
function F(a){if(!G)if("undefined"!==typeof unsafeWindow&&"undefined"!==typeof unsafeWindow[a])G=unsafeWindow;else if("undefined"!==typeof window[a])G=window;else try{var b=document.createElement("a");b.setAttribute("onclick","return window;");var c=b.onclick();"undefined"!==typeof c[a]&&(G=c)}catch(e){v("Kissogram Toolkit : Unable to load unsafeWindow Object!"),G=g}return G}
function H(a,b,c){c=c||{};c.m="number"!=typeof c.m?30:c.m;c.g=c.g||300;if(F(a)&&(!c.test||c.test(G)))return v("Kissogram Toolkit : unsafeWindow injection succeed!"),b(G,G[a]);0<c.m--&&setTimeout(function(){H(a,b,c)},c.g)}var G=g,I=[],J=[];window.addEventListener("resize",function(){q(I)},j);window.addEventListener("scroll",function(){q(J)},j);
E={get:function(a){return(this.s(a)||window)[a]},s:function(a){return F(a)},e:H,size:function(){return{U:window.innerHeight,V:window.innerWidth,height:n.documentElement.clientHeight,width:n.documentElement.clientWidth}},L:function(a,b){b&&a();I.push(a);return I.length-1},u:function(a){(a||0==a)&&delete I[a]},I:function(a){a=a?[a]:[document.documentElement,document.body];for(var b=j,c=j,e=0;e<a.length;e++){var f=a[e],h=f.scrollLeft;f.scrollLeft+=0<h?-1:1;f.scrollLeft!==h&&(b=b||d);f.scrollLeft=h;h=
f.scrollTop;f.scrollTop+=0<h?-1:1;f.scrollTop!==h&&(c=c||d);f.scrollTop=h}return{scrollX:b,scrollY:c}},M:function(a,b){b&&a();J.push(a);return J.length-1},v:function(a){(a||0==a)&&delete J[a]}};
var K,L=[],M=n.documentElement,N=/^\s*[.\w][.\w\d-]+[\w\d-]\s*$/,ca="undefined"!=typeof GM_addStyle?GM_addStyle:function(a){var b=document.getElementsByTagName("head")[0],c=b||document.documentElement,e=document.createElementNS("http://www.w3.org/1999/xhtml","link");e.setAttributeNS("http://www.w3.org/1999/xhtml","rel","stylesheet");e.setAttributeNS("http://www.w3.org/1999/xhtml","type","text/css");e.setAttributeNS("http://www.w3.org/1999/xhtml","href","data:text/css,"+encodeURIComponent(a));b?c.appendChild(e):
c.insertBefore(e,c.firstChild)},O={c:[],k:"gpp-",add:function(a,b){if(a&&N.test(b=this.get(b))){b=b.replace(/\./g," ");for(var c=b.split(" "),e="",f=0,h=" "+a.className+" ";f<c.length;f++)c[f]&&0>h.indexOf(" "+c[f]+" ")&&(e+=" "+c[f]);a.className=u.h(a.className+e)}},remove:function(a,b){if(a&&N.test(b=this.get(b))){b=u.h(b.replace(/\./g," "));for(var c=b.split(" "),e=" "+a.className+" ",f=0;f<c.length;f++)e=e.replace(" "+c[f]+" "," ");a.className=u.h(e)}},set:function(a){ca(this.get(a))},get:function(a){a=
(a||"").replace(/\/\*[\s\S]*?\*\//g,"");for(var b=0;b<this.c.length;b++)a=a.replace(this.c[b][0],this.c[b][1]);return a},T:function(a){a=this.get(a).split(/[^\w-]/);do{var b=a.pop();if(b)return b}while(0<a.length);return g},push:function(a,b,c){c=c||{};var e=this.r(a);c.enable&&this.enable({name:a,value:c.value});b=b.replace(/((?:[^,{]+,?)*)\s*{([^}]+)}/g,e+"$1 {$2}");b=b.replace(/,/g,","+e);this.set(b)},P:function(a){return L[a]||g},enable:function(a){if(a){var b=this.l(),c=this.k,e=" "+(M.getAttribute(b)||
"")+" ",f="";u.b(a).forEach(function(a){a="string"==typeof a?{name:a}:a;if(!a.value&&0!=a.value){var b=" "+a.name+" ";0>e.indexOf(b)&&(f+=b)}else M.setAttribute(c+a.name,a.value);L[a.name]=a.value||d});f&&M.setAttribute(b,u.h(e+f))}},disable:function(a){if(!a)return"";var b=this.l(),c=this.k,e=M.hasAttribute(b),f=" "+(M.getAttribute(b)||"")+" ";u.b(a).forEach(function(a){a="string"==typeof a?{name:a}:a;e&&(f=f.replace(" "+a.name+" "," "));M.removeAttribute(c+a.name);delete L[a.name]});e&&M.setAttribute(b,
u.h(f))},l:function(){return this.k+"feature-list"},H:function(a,b){if(!a)return j;b=u.h(this.get(b).replace(/\./g," "));for(var c=b.split(" "),e=" "+a.className+" ",f=0;f<c.length;f++)if(0>e.indexOf(" "+c[f]+" "," "))return j;return d},select:function(a){return n.querySelector(this.get(a))},f:function(a){return u.b(n.querySelectorAll(this.get(a)))},B:function(){if("firefox"==B)return window.innerWidth;for(var a=1,b=window.outerWidth,c=j;!c;a++){0<b&&(c=window.matchMedia("(min-width :"+b+"px) and (max-width:"+
b+"px)").matches);if(c)return b;b+=(0==a%2?1:-1)*a}},z:function(a){this.c=this.c.concat(a.reverse())},r:function(a){if(!a)return"";var b="html",c=this.l(),e=this.k;u.b(a).forEach(function(a){a="string"==typeof a?{name:a,p:d}:a;b+="["+(a.p?c+'~="'+a.name+'"':a.value||0==a.value?e+a.name+'="'+a.value+'"':e+a.name)+"]"});return b+" "},C:function(a){return!/^\d+(px)?$/i.test(a)?g:parseInt(a.replace(/px$/i,""))},A:function(a){var b=l=0;do b+=a.offsetTop,l+=a.offsetLeft;while(a=a.offsetParent);return{left:l,
top:b}}};K=s(function(a){s(this,O);a&&(this.c=this.c.concat(a.reverse()))},O);function P(){var a=R(void 0);return a!=S?(S=a,d):j}function R(a){a=a||n.location.href;/^https?:\/\/[\w.]+\w+$/.test(a)&&(a+="/");return a}function T(a){a?"popstate"==a.type?(v("Kissogram Toolkit: URL [popstate] changed!"),q(U)):"hashchange"==a.type&&(v("Kissogram Toolkit: URL [hash] changed!"),q(V)):(v("Kissogram Toolkit: URL changed!"),q(U))}var S=R(),U=[],V=[],W=g;
window.addEventListener("popstate",function(a){P()&&T(a)},j);window.addEventListener("hashchange",function(a){T(a)},j);function X(a){var b=n.querySelector("body");b.addEventListener(a,function e(){Y[a]=d;b.removeEventListener(a,e,j)},j)}var Z=[],Y={};try{X("DOMSubtreeModified");X("DOMNodeInserted");X("DOMNodeRemoved");var da=n.createElement("div"),ea=n.querySelector("body")||n.body||n.documentElement;ea.appendChild(da);ea.removeChild(da)}catch(fa){v("DOMSubtreeModified test failed.  Something is wrong")}
function ga(a){var b=new XMLHttpRequest;b.onreadystatechange=function(){var c={responseXML:4==b.readyState?b.responseXML:"",responseText:4==b.readyState?b.responseText:"",readyState:b.readyState,o:4==b.readyState?b.getAllResponseHeaders():"",status:4==b.readyState?b.status:0,statusText:4==b.readyState?b.statusText:""};4==b.readyState&&(c={responseXML:b.responseXML,responseText:b.responseText,readyState:b.readyState,o:b.getAllResponseHeaders(),status:b.status,statusText:b.statusText});if(a.onreadystatechange)a.onreadystatechange(c);
if(4==b.readyState){if(a.onload&&200<=b.status&&300>b.status)a.onload(c);if(a.onerror&&(200>b.status||300<=b.status))a.onerror(c)}};try{b.open(a.method,a.url)}catch(c){if(a.onerror)a.onerror({responseXML:"",responseText:"",readyState:4,o:"",status:403,statusText:"Forbidden"});return}if(a.headers)for(var e in a.headers)b.setRequestHeader(e,a.headers[e]);b.send("undefined"!=typeof a.data?a.data:g)}
var $=KissogramToolkit=s(m(),{each:q,extend:s,css:K,listen:function(a,b,c,e){e=e||{};if(b||e.a){var f=b,h=e,y=Z.length,r=t(c,{g:h.g||0,i:h.i||0}),k=function(a,b){var f=t(function(){c.apply(a,u.b(arguments),j);a.removeEventListener(b,f)},{i:h.i});a.addEventListener(b,h.Q?f:function(){r.apply(a,u.b(arguments))})};Z.push(setInterval(function(){var b=u.b("string"==typeof a?K.f(a):a);if(0<b.length){clearInterval(Z[y]);delete Z[y];if(!Y.DOMSubtreeModified)if(u.n(f)){for(var e=-1,r=-1,z=-1,p=0;p<f.length;p++)"DOMNodeInserted"==
f?e=p:"DOMNodeRemoved"==f?r=p:"DOMSubtreeModified"==f&&(z=p);-1<z&&(f.splice(z,p),0>e&&f.push("DOMNodeInserted"),0>r&&f.push("DOMNodeRemoved"))}else"DOMSubtreeModified"==f&&(f=["DOMNodeInserted","DOMNodeRemoved"]);for(p=0;p<b.length;p++)h.a&&("function"==typeof h.a?h.a.call(b[p]):c.call(b[p])),u.n(f)?q(f,function(){k(b[p],this)}):"string"==typeof f&&k(b[p],f)}},500))}},url:{N:function(a,b){b&&a();W==g&&(v("Kissogram Toolkit: URL onChange inited!"),W=setInterval(function(){P()&&T()},500));U.push(a)},
t:function(a,b){b&&a();V.push(a)},O:m(),toString:function(){return S=R()}},mouse:{click:function(a,b){if(a){b=b||{};var c=b.button||0,e=n.createEvent("MouseEvents");e.initMouseEvent("mousedown",d,d,window,0,0,0,0,0,j,j,j,j,c,g);a.dispatchEvent(e);e=n.createEvent("MouseEvents");e.initMouseEvent("mouseup",d,d,window,0,0,0,0,0,j,j,j,j,c,g);a.dispatchEvent(e);e=n.createEvent("MouseEvents");e.initMouseEvent("click",d,d,window,0,0,0,0,0,j,j,j,j,c,g);a.dispatchEvent(e)}}},browser:B,window:E,select:function(a){return K.select(a)},
selectAll:function(a){return K.f(a)},tickTork:t,utils:u,debug:v,httpRequest:{send:"undefined"==typeof GM_xmlhttpRequest?ga:GM_xmlhttpRequest}}),ha=function(a){function b(a){var b;if(b=this.href){var c=[],r=g,k;switch(a){case 1:c.push(/^(?:https?:\/\/[-\w\d.]+\.google\.\w[\w.]*\w(?:\/\w+)*)?\/imgres\?(?:(?!imgrefurl)\w+=[^&]*&)*(?:imgrefurl)=((?:https?(?::\/\/|%3A%2F%2F))?[^&]+).*$/i);break;case 2:c.push(/^(?:https?:\/\/[-\w\d.]+\.google\.\w[\w.]*\w(?:\/\w+)*)?\/imgres\?(?:(?!imgurl)\w+=[^&]*&)*imgurl=((?:https?(?::\/\/|%3A%2F%2F))?[^&]+).*$/i);
break;default:c.push(/^(?:https?:\/\/[-\w\d.]+\.google\.\w[\w.]*\w(?:\/\w+)*)?\/(?:(?:local_)?url|imgres|aclk)\?(?:(?!url|imgurl|adurl)\w+=[^&]*&)*(?:url|imgurl|adurl)=((?:https?(?::\/\/|%3A%2F%2F))?[^&]+).*$/i),c.push(/^(?:https?:\/\/[-\w\d.]+\.google\.\w[\w.]*\w(?:\/\w+)*)?\/(?:(?:local_)?url|imgres|aclk)\?(?:(?!q)\w+=[^&]*&)*(?:q)=((?:https?(?::\/\/|%3A%2F%2F))?[^&]+).*$/i)}for(a=0;a<c.length&&!(k=(r=r||b.match(c[a]))?unescape(r[1]||""):"",/^(https?:\/\/)?[a-zA-Z\.\-&:0-9]+\.[a-zA-Z0-9\-]/i.test(k));a++);
k&&!/^https?:\/\//.test(k)&&(k="http://"+k);b=k}else b=void 0;b&&(this.href=b,$.debug("Redirection of ["+b+"] is now removed."));this.getAttribute("rel")||this.setAttribute("rel","noreferrer");var A=this;e(b||this.href,function(a){A&&(A.href=a)});return b||""}function c(){$.d('a[href*="/url?"], a[href*="/aclk?"]',g,b,{a:d})}var e=function(){var a={},b=/^(?:https?:\/\/)?goo\.gl\/(\w+)$/i;return function(c,e){var k=b.exec(c);if(k){k=k[1];if(a[k])return $f(a[k]);$.debug("Straight Google : trying to expand shorten URL ["+
c+"]");c=/^https?:\/\//.test(c)?c:"http://"+c;$.F.send({method:"GET",url:"https://www.googleapis.com/urlshortener/v1/url?shortUrl={$url}".replace("{$url}",c),onload:function(b,c){return function(e){try{eval("var obj = "+e.responseText)}catch(k){return}"OK"==obj.status&&($.debug("Straight Google : shorten URL expanded ["+obj.longUrl+"]"),a[b]=obj.longUrl,c(obj.longUrl))}}(c,e),onerror:function(a){$.debug("Straight Google : fail to expand shorten URL ["+a.finalUrl+"]")}})}}}();return{start:function(){if(/:\/\/plus\.google\.com\/.*$/.test($.url))/\/_\/scs\/apps-static\/_\/js\//.test($.url)&&
($.debug("Straight Google [Plus] is now loaded"),$.window.e("lAa",function(a){a.J=function(a,b){$.debug("Redirection of ["+b+"] is prevented.");return b}}));else if(/:\/\/news\.google\.[\w.]+\w\/.*$/.test($.url)||/:\/\/www\.google\.[\w.]+\w\/news\/.*$/.test($.url))$.debug("Straight Google [News] is now loaded"),$.d(".blended-section","DOMNodeInserted",function(){$.j($.f("a.article[url]:not(._tracked)"),function(){this.href=this.getAttribute("url");this.getAttribute("rel")||this.setAttribute("rel",
"noreferrer");$.debug("Redirection of ["+this.href+"] is now removed.");$.q.add(this," _tracked")})},{a:d});else if(/:\/\/docs\.google\.com\/.+/.test($.url))$.debug("Straight Google [Docs] is now loaded"),/docs\.google\.com\/spreadsheet\/.+/.test($.url)?$.d('a.docs-bubble-link[target="_blank"]',"mouseover",b):/docs\.google\.com\/(document|presentation|drawings)\/.+/.test($.url)&&$.d('.docs-bubble a[target="_blank"]',"mouseover",b);else if(/:\/\/(ditu|maps)\.google\.com\/.*$/.test($.url)||/:\/\/www\.google\.com\/maps((\?|\/).*)?$/.test($.url))$.debug("Straight Google [Maps] is now loaded"),
/output=js/.test($.url)?$.window.e("w",function(a,c){c.loadVPage&&$.d(c.document.querySelectorAll('#resultspanel a[href*="/local_url?"]'),g,b,{a:d})}):$.d('#resultspanel a[href*="/local_url?"]',g,b,{a:d});else if(/:\/\/groups\.google\.com\/(forum|group)\/.+/.test($.url))$.debug("Straight Google [Groups] is now loaded"),/groups\.google\.com\/group\/.+/.test($.url)&&c();else if(/:\/\/(www|history)\.google\.com\/bookmarks\/.*$/.test($.url))$.debug("Straight Google [Bookmarks] is now loaded"),$.j($.f('.result a[id^="bkmk_href_"]'),
b);else if(/:\/\/(www|history)\.google\.com\/history\/.*$/.test($.url))$.debug("Straight Google [Web History] is now loaded"),c();else if(/:\/\/(www|mail)\.google\.com\/mail\/.*$/.test($.url))$.debug("Straight Google [Mail] is now loaded"),c();else if(/:\/\/(www|play)\.google\.com\/store\/.*$/.test($.url))$.debug("Straight Google [Play] is now loaded"),c();else if(/:\/\/(www|encrypted|ipv6)\.google\.[\w.]+\w\/(imghp\?.+|search(\?|#)(.+&)*tbm=isch(&.+)*)$/.test($.url))$.debug("Straight Google [Image] is now loaded"),
$.window.e("_",function(a){try{a._.Qj.G().K=m(),a._.AR=m()}catch(b){$.debug("Fail to inject!")}},{test:function(a){return a._&&a._.AR&&a._.Qj}});else if(/:\/\/www\.google\.com\/(products\/catalog\?|shopping\/product\/|prdhp).*/.test($.url)){if($.debug("Straight Google [Shopping] is now loaded"),$.d("#os-sellers-content","DOMSubtreeModified",c,{a:d}),/\/products\/catalog\?/.test($.url)){var e=g;$.window.e("showPlusBox",function(a,b){e=b;a.R=function(){e.apply(this,$.S.b(arguments));c()}})}}else if(/:\/\/(www|encrypted|ipv6)\.google\.[\w.]+\w\/cse\?.+/.test($.url))$.debug("Straight Google [iFramed Web Search] is now loaded"),
$.window.e("google",function(a){try{a.D.search.Z.Yi=m()}catch(b){}});else if(/:\/\/(www|encrypted|ipv6)\.google\.[\w.]+\w\/(search|webhp\?.+|(search|webhp)?(\?|#)(.+&)*(q|tbs|as_q)=.+)?$/.test($.url)){$.debug("Straight Google [Web Search] is now loaded");var h=function(){c();$.j($.f('#ires a[href*="/imgres?"]:not([is-clean-link])'),function(){this.setAttribute("ori-url",this.href);b.call(this,2)});$.j(a.querySelectorAll("a[href][onmousedown]"),function(){this.removeAttribute&&this.removeAttribute("onmousedown")})};
$.window.e("_",function(a){try{a._.Qj.G().K=function(a){a.removeAttribute("onmousedown");return d}}catch(b){$.debug("Fail to inject!")}},{test:function(a){return!!a._&&a._.Qj}});$.url.t(h,d);setTimeout(h,200)}else/:\/\/(\w+\.)*youtube\.com\//.test($.url)&&($.debug("Straight Google [Youtube] is now loaded"),$.j($.f(".yt-uix-redirect-link"),function(){$.q.remove(this,".yt-uix-redirect-link");$.debug("Redirection of link ["+this.href+"] is now removed.")}))}}}(document);
$.debug("Straight Google is enabled in current URL ["+$.url+"].");ha.start();
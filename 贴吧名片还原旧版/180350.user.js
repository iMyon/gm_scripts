// ==UserScript==
// @name        tiebaRevertOldPanel 
// @namespace   Myon
// @grant       GM_addStyle
// @description 还原贴吧名片到旧版名片
// @require     http://libs.baidu.com/jquery/1.9.0/jquery.js
// @include     http://tieba.baidu.com/*
// @include     http://tieba.baidu.com/f*ct=*
// @author      Myon<myon.cn@gmail.com>
// @downloadURL https://github.com/iMyon/gm_scripts/raw/master/%E8%B4%B4%E5%90%A7%E5%90%8D%E7%89%87%E8%BF%98%E5%8E%9F%E6%97%A7%E7%89%88/180350.user.js
// @updateURL   https://github.com/iMyon/gm_scripts/raw/master/%E8%B4%B4%E5%90%A7%E5%90%8D%E7%89%87%E8%BF%98%E5%8E%9F%E6%97%A7%E7%89%88/180350.meta.js
// @icon        http://tb.himg.baidu.com/sys/portrait/item/c339b7e2d3a1b5c4c3a8d726
// @version     1.1.4
// ==/UserScript==

var l_panelHtml;

addNodeInsertedListener('.j_user_card,a.at',function(){
  $(this).hover(function() {
    var type = 0;
    if($(this).closest('.j_thread_list').length)
      type = 1;
    var un = JSON.parse($(this).attr('data-field').replace(/'/g,'"')).un;
    if(un === undefined) //如果data-field里边没有un则去href的
    {
      un = this.href.match(/un=([^&]*)&/)[1];
      un = decodeURIComponent(un);
    }
    var jqDom = $(this);
    if($(this).find('img').length){
      jqDom = $(this).find('img')
    }
    if(type === 0){
      var offsetTop = jqDom.offset().top;
      var offsetLeft = jqDom.offset().left + jqDom.width();
    }
    else{
      var offsetTop = jqDom.offset().top - jqDom.height() - 130;
      var offsetLeft = jqDom.offset().left -165 + jqDom.width()/2;
    }
    l_panelHtml = '<iframe src="http://tieba.baidu.com/i/data/panel?un=' + un + '&ie=utf-8" width="330px" height="135px"></iframe>';
    GM_addStyle('#user_visit_card{\
        top:' + offsetTop + 'px !important;\
        left:' + offsetLeft + 'px !important;\
        }');
  });
});
addNodeInsertedListener("#user_visit_card",function(){
  GM_addStyle('#user_visit_card *{\
          display:block !important;\
      }');
  $(this).html(l_panelHtml);
})

//元素精确监听
function addNodeInsertedListener(elCssPath, handler, executeOnce, noStyle) {
  var animName = "anilanim",
  prefixList = ["-o-", "-ms-", "-khtml-", "-moz-", "-webkit-", ""],
  eventTypeList = ["animationstart", "webkitAnimationStart", "MSAnimationStart", "oAnimationStart"],
  forEach = function (array, func) {
    for (var i = 0, l = array.length; i < l; i++) {
      func(array[i]);
    }
  };
  if (!noStyle) {
    var css = elCssPath + "{",
    css2 = "";
    forEach(prefixList, function (prefix) {
      css += prefix + "animation-duration:.001s;" + prefix + "animation-name:" + animName + ";";
      css2 += "@" + prefix + "keyframes " + animName + "{from{opacity:.9;}to{opacity:1;}}";
    });
    css += "}" + css2;
    GM_addStyle(css);
  }
  if (handler) {
    var bindedFunc = function (e) {
      var els = document.querySelectorAll(elCssPath),
      tar = e.target,
      match = false;
      if (els.length !== 0) {
        forEach(els, function (el) {
          if (tar === el) {
            if (executeOnce) {
              removeNodeInsertedListener(bindedFunc);
            }
            handler.call(tar, e);
            return;
          }
        });
      }
    };
    forEach(eventTypeList, function (eventType) {
      document.addEventListener(eventType, bindedFunc, false);
    });
    return bindedFunc;
  }
}
//移除精确监听
function removeNodeInsertedListener(bindedFunc) {
  var eventTypeList = ["animationstart", "webkitAnimationStart", "MSAnimationStart", "oAnimationStart"],
  forEach = function (array, func) {
    for (var i = 0, l = array.length; i < l; i++) {
      func(array[i]);
    }
  };
  forEach(eventTypeList, function (eventType) {
    document.removeEventListener(eventType, bindedFunc, false);
  });
}

GM_addStyle('#user_visit_card{\
    width:330px !important;\
    height:135px !important;\
    border:2px solid #F0F0F0;\
    background:white !important;\
    }\
    #user_visit_card .ui_card_content,#user_visit_card .ui_white_down{\
    display:none !important;\
    }');
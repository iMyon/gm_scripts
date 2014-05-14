// ==UserScript==
// @name        tiebaRevertOldPanel 
// @namespace   Myon
// @description 还原贴吧名片到旧版名片
// @include     http://tieba.baidu.com/*
// @include     http://tieba.baidu.com/f*ct=*
// @author      Myon<myon.cn@gmail.com>
// @downloadURL https://github.com/iMyon/gm_scripts/raw/master/%E8%B4%B4%E5%90%A7%E5%90%8D%E7%89%87%E8%BF%98%E5%8E%9F%E6%97%A7%E7%89%88/180350.user.js
// @updateURL   https://github.com/iMyon/gm_scripts/raw/master/%E8%B4%B4%E5%90%A7%E5%90%8D%E7%89%87%E8%BF%98%E5%8E%9F%E6%97%A7%E7%89%88/180350.meta.js
// @icon        http://tb.himg.baidu.com/sys/portrait/item/c339b7e2d3a1b5c4c3a8d726
// @version     1.0.1
// ==/UserScript==

var $ = unsafeWindow.$;
var un = '',
    l_panelHtml = '',
    offsetTop = '',
    offsetLeft = '';
//帖子内部
if($("#j_p_postlist").length){
  $('#j_p_postlist .j_user_card,#j_p_postlist .p_author_face,#j_p_postlist a.at').hover(function() {
      userHover(this);
  });
}

//首页
if($('.j_thread_list').length){
  $('.j_thread_list .j_user_card').hover(function() {
      userHover(this,1);
  });
}



//监听动态添加的节点
var observeNewUserDom = function(records) {
    records.forEach(function(record) {
        Array.prototype.forEach.call(record.addedNodes, function(element) {
            if (element.getAttribute('class') && element.getAttribute('class').indexOf("lzl_cnt")) {
                $(element).find('.j_user_card,a.at').hover(function() {
                    if($(this).closest('.j_thread_list').length)
                      userHover(this,1);
                    else
                      userHover(this);
                });
            }
            //添加面板
            if (element.id == "user_visit_card") {
                GM_addStyle('#user_visit_card *{\
                    display:block !important;\
                }');
                $(element).html(l_panelHtml);
            }
        });
    });
};

//悬浮触发事件
// type 1 首页悬浮 0 其他
var userHover = function(user,type) {
    if(type === undefined) type = 0;

    un = JSON.parse($(user).attr('data-field')).un;
    if(type === 0){
      offsetTop = $(user).offset().top;
      offsetLeft = $(user).offset().left + $(user).width();
    }
    else{
      offsetTop = $(user).offset().top - $(user).height() - 130;
      offsetLeft = $(user).offset().left -165 + $(user).width()/2;
    }
    l_panelHtml = '<iframe src="http://tieba.baidu.com/i/data/panel?un=' + un + '" width="330px" height="135px"></iframe>';
    GM_addStyle('#user_visit_card{\
        top:' + offsetTop + 'px !important;\
        left:' + offsetLeft + 'px !important;\
        }');
};

var mp = new MutationObserver(observeNewUserDom);

var option = {
    'childList': true,
    'subtree': true
};

mp.observe(document.body, option);

GM_addStyle('#user_visit_card{\
    width:330px !important;\
    height:135px !important;\
    border:2px solid #F0F0F0;\
    background:white !important;\
    }\
    #user_visit_card .ui_card_content,#user_visit_card .ui_white_down{\
    display:none !important;\
    }');
// ==UserScript==
// @name        tiebaLastPage 
// @namespace   Myon
// @description 贴吧列表加入直达最后一页的链接
// @include     http://tieba.baidu.com/f?kw=*
// @author      Myon<myon.cn@gmail.com>
// @downloadURL https://github.com/iMyon/gm_scripts/raw/master/tiebaLastPage/tiebaLastPage.user.js
// @updateURL   https://github.com/iMyon/gm_scripts/raw/master/tiebaLastPage/tiebaLastPage.meta.js
// @icon        http://tb.himg.baidu.com/sys/portrait/item/c339b7e2d3a1b5c4c3a8d726
// @version     1.0.1
// ==/UserScript==

var $ = unsafeWindow.$;

//添加链接函数
var addLastPage = function(element)
{
  if ($(element).find('a[class*=th_tit]').length != 0) {
    var a = $(element).find('a[class*=th_tit]').attr("href").replace("/p/", "");
    var href = "http://tieba.baidu.com/f?ct=335675392&z=" + a + "&sc=1#sub";
    $(element).find('.threadlist_rep_num,.j_rp_num').wrap("<a id='llink' href=" 
      + href + " target='_blank' >&nbsp;&nbsp;&nbsp;&nbsp;");
  }
}

//添加原本网页的
$('.j_thread_list').each(function(){
  addLastPage(this);
});

//添加动态生成的
new MutationObserver(function(records) {
    records.forEach(function(record) {
        Array.prototype.forEach.call(record.addedNodes, function(element) {
            if (element.getAttribute && element.getAttribute('class') &&element.getAttribute('class').indexOf("j_thread_list")!=-1) {
                addLastPage(element);
            }
        });
    });
}).observe(document.body, {
    'childList': true,
    'subtree': true
});

//话题贴
var topic = $('#thread_topic');
if (topic.length != 0) {
  var a = topic.find('a#topic_post_title').attr("href").replace("http://tieba.baidu.com/p/", "");
  var href = "http://tieba.baidu.com/f?ct=335675392&z=" + a + "&sc=1#sub";
  topic.find('#topic_post_relynum').wrap("<a id='llink' href=" + href + " target='_blank' >&nbsp;&nbsp;&nbsp;&nbsp;");
}
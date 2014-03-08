// ==UserScript==
// @name        尾页链接
// @namespace   .
// @include     http://tieba.baidu.com/*
// @version     1
// ==/UserScript==

var $=unsafeWindow.$;
$('.j_thread_list').each(function()
{
	if($(this).find('a.j_th_tit').length!=0)
	{
    	var a=$(this).find('a.j_th_tit').attr("href").replace("/p/","");
    	var href="http://tieba.baidu.com/f?ct=335675392&z="+a+"&sc=1#sub";
    	$(this).find('.threadlist_rep_num,.j_rp_num').wrap("<a id='llink' href="+href+" target='_blank' >&nbsp;&nbsp;&nbsp;&nbsp;");
	}
});

var topic=$('#thread_topic');
if(topic.length!=0)
{
	var a=topic.find('a#topic_post_title').attr("href").replace("http://tieba.baidu.com/p/","");
    var href="http://tieba.baidu.com/f?ct=335675392&z="+a+"&sc=1#sub";
    topic.find('#topic_post_relynum').wrap("<a id='llink' href="+href+" target='_blank' >&nbsp;&nbsp;&nbsp;&nbsp;");
}

//GM_xmlhttpRequest({
//method: 'POST',
//url: 'http://www.acfun.tv/member/checkin.aspx'
//});

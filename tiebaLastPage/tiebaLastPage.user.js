// ==UserScript==
// @name        tiebaLastPage 
// @namespace   Myon
// @grant       none
// @description 贴吧列表加入直达最后一页的链接
// @include     http://tieba.baidu.com/f?kw=*
// @include     http://tieba.baidu.com/f?ie=utf-8&kw=*
// @author      Myon<myon.cn@gmail.com>
// @downloadURL https://github.com/iMyon/gm_scripts/raw/master/tiebaLastPage/tiebaLastPage.user.js
// @updateURL   https://github.com/iMyon/gm_scripts/raw/master/tiebaLastPage/tiebaLastPage.meta.js
// @icon        http://tb.himg.baidu.com/sys/portrait/item/c339b7e2d3a1b5c4c3a8d726
// @version     1.0.6
// ==/UserScript==


//添加原本网页的
function addLink(){
	[].forEach.call(document.querySelectorAll(".j_thread_list"), function(element){
		if (!!element.querySelector('a[class*=th_tit]')) {
	    var a = element.querySelector('a[class*=th_tit]').getAttribute("href").replace("/p/", "");
	    var href = "http://tieba.baidu.com/f?ct=335675392&z=" + a + "&sc=1#sub";
	    var achor = document.createElement("a");
	    achor.href = href;
	    achor.target = "_blank";
	    element.querySelector(".j_threadlist_li_left").appendChild(achor);
	    achor.appendChild(element.querySelector('.threadlist_rep_num,.j_rp_num'));
	  }
	});
}

function exec(){
	if(document.querySelectorAll(".j_thread_list").length){
		addLink();
	}
	else{
		setTimeout(exec, 300);
	}
}

exec();
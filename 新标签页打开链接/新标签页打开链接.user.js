// ==UserScript==
// @name        新标签页打开链接
// @namespace   .
// @include     http://www.o2v3.imotor.com/*
// @version     1
// ==/UserScript==


var a=document.querySelectorAll('a');
[].forEach.call(a,function(e)
	{
		e.setAttribute('target',"_blank");
	});
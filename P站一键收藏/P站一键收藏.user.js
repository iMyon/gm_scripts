// ==UserScript==
// @name        P站一键收藏
// @include     http://www.pixiv.net/*
// @version     2013.6.23
// ==/UserScript==

var $=unsafeWindow.$;

var id=location.href.match(/[0-9]{1,15}$/)[0];
$('.bookmark-container a._button').click(function(event)
	{
		event.preventDefault();
		$.post("http://www.pixiv.net/bookmark_add.php",{mode:"add",tt:"c7716dcc6312156ce0979b8554cd77a4",id:id,type:"illust",from_sid:"",comment:"",tag:"",restrict:"0"},
		function(data){
			var shoucang=data.match(/[0-9]{1,8}(?=<\/a><\/li><\/ul><\/li><\/ul><ul class="menu-items">)/)[0];
			var div='<div class="bookmark-container"><a data-tooltip="总共收到'+shoucang+'收藏" class="bookmark-count ui-tooltip" href="bookmark_detail.php?illust_id=15735222"><i class="_icon sprites-bookmark-badge"></i>'+shoucang+'</a><a class="button-on" href="bookmark_add.php?type=illust&amp;illust_id='+id+'">编辑收藏</a></div>';
			$('.bookmark-container').html(div);
		});
	});
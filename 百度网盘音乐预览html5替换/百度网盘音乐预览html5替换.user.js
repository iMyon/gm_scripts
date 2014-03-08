// ==UserScript==
// @name        百度网盘音乐预览html5替换
// @include     http://pan.baidu.com/share/link?*
// @include		http://pan.baidu.com/s/*
// @version     2014.3.1
// ==/UserScript==

var $=unsafeWindow.$;
var category=unsafeWindow.FileUtils.shareLogData.category;
var _mMusiclink;
if(category == 2)
{
	(function run()
	{
		if(_mMusiclink)
		{
			//如果存在音乐预览，则替换
			if(_mMusiclink)
			{
				var rHtml = '<video width="712px" height="100px" src="'+_mMusiclink+'" controls="controls" autoplay="1"></video>';
				$(".mb-hd.mb-controller.clearfix").replaceWith(rHtml);
			}
		}
		else
		{
			_mMusiclink = unsafeWindow.FileUtils._mMusiclink;
			setTimeout(run,100);
		}
	})();
}
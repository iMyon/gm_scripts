// ==UserScript==
// @name        度盘playlist自用
// @include     http://pan.baidu.com/disk/home*
// @version     1
// ==/UserScript==

var temphref="";
(function cc()
{
	if(location.href.match(/path/))
	{
		var matches=location.href.match(/http:\/\/pan\.baidu\.com\/disk\/home(\?)?#dir\/path=(.*)$/);
			if(matches.length!=0)
			{
				dir=matches[2];
				var ahref="http://yukiii.duapp.com/myplaylist/playlist?shareid=&uk=&dir="+dir;
				var linkHtml='<span id="Plist"><a target="_blank" href="'+ahref+'" hidefocus="true" class="new-dbtn  lalalala" _i="3"><em class="icon-download"></em><b>播放列表</b></span>';
				if($('#Plist').length!=0)
					$('.lalalala').attr('href',ahref);
				else
					$('#barCmdOffline').after(linkHtml+'</a><input type="checkbox" id="digui">');
			}
	}
	if($('#digui').length!=0)
	{
		if($('#digui').get(0).checked)
			digui=1;
		else
			digui=0;
		$('.lalalala').attr('href',$('.lalalala').attr('href').replace(/&digui=(0|1)/,'')+"&digui="+digui);
	}
	setTimeout(cc,200);
})();
// ==UserScript==
// @name        BaiduYun-ShowAlbum_and_Artist
// @include     http://pan.baidu.com/share/link?*
// @include		http://pan.baidu.com/s/*
// @version     2014.3.19
// @description 度盘音乐文件显示专辑名和歌手
// @icon        http://tb.himg.baidu.com/sys/portrait/item/c339b7e2d3a1b5c4c3a8d726
// ==/UserScript==

var $=unsafeWindow.$;
var api_key = "99b302feea0fe14df4721382f9c73c4a"; //lastfm的app key

//构造函数
var song = function(albumTitle,artistName,trackTitle)
{
	this.albumTitle = albumTitle;	//专辑名
	this.artistName = artistName;	//歌手
	this.trackTitle = trackTitle;	//分轨名称
	this.albumImage = null;			//专辑封面
	this.albumUrl   = null;			//专辑lastfm url
	var context = this;
	//获取专辑封面
	GM_xmlhttpRequest({
		method:"get",
		url:"http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key="+api_key
			+"&artist="+encodeURIComponent(context.artistName)
			+"&album="+encodeURIComponent(context.albumTitle)
			+"&format=json",
			onload:function(res)
			{
				var json = JSON.parse(res.responseText);
				context.albumImage = json.album.image.pop()["#text"];
				context.albumUrl = json.album.url;
				context.setImageUi();
			}
		});
	//显示歌曲信息
	this.setTextUi = function()
	{
		$('.slide-show-other-cns').append('<span style="float:rignt">\
			<a target="_blank" href="http://cn.last.fm/music/'+this.artistName+'" title="歌手">'+this.artistName+'\
			</a href=""> - [<a target="_blank" href="http://www.baidu.com/s?wd=site:pan.baidu.com+'+this.albumTitle+'" title="专辑">'+this.albumTitle+'</a href="">] \
			<a target="_blank" href="http://www.baidu.com/s?wd=site:pan.baidu.com+'+this.trackTitle+'" title="歌名">'+this.trackTitle+'</a href="">\
			</span>');
	}
	//显示专辑封面
	this.setImageUi = function()
	{
		(function run()
		{
			if($('#playListContainer').length)
			{
				$("#playListContainer").wrap('<a href="'+context.albumUrl+'" target="_blank"></a>');
				GM_addStyle('\
				#playListContainer {\
				    text-align: center;\
				    background: url('+context.albumImage+') !important;\
				    background-position: center !important;\
				    background-repeat: no-repeat !important;\
				}\
				#playListContainer img{\
					height:auto;\
				}');
			}
			else
				setTimeout(function(){run();},500);
		})();
	}
}

var curSong = new song(unsafeWindow.FileUtils.albumTitle,
					unsafeWindow.FileUtils.artistName,
					unsafeWindow.FileUtils.trackTitle);
if(curSong.albumTitle)
	curSong.setTextUi();
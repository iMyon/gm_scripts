// ==UserScript==
// @name        百度贴吧图片放大
// @namespace   http://sbwtw.cn/
// @description 鼠标移动到上面时放大，移走还原。
// @include     http://tieba.baidu.com/p/*
// @include     http://tieba.baidu.com/f?*
// @author      o丨Reborn <sbwtws@gmail.com>
// @updateURL   https://userscripts.org/scripts/source/156914.meta.js
// @downloadURL https://userscripts.org/scripts/source/156914.user.js
// @icon        http://tb.himg.baidu.com/sys/portrait/item/d92f6fd8ad5265626f726ee90f
// @version     13-01-29.1
// ==/UserScript==

//13-01-29.1	解决楼中视频无法播放的bug
//13-01-25.1    防止图片缩过小无法关闭,解决个别图片脚本不生效,保留收藏图片功能,去除百度小图不能收藏的bug
//13-01-23.2    修复在看大图时不能右键下载,新增鼠标滚动调整大小功能:w
//13-01-23.1    应网友建议,将双击移除图片改为单击移除.
//13-01-22.1    去掉了一个ajax查询,应该能快点,图片显示从左上角改为居中
//13-01-21.4    一些小改动
//13-01-21.3    支持同时点开多个图片
//13-01-21.2    解决拖动卡
//13-01-21.1    解决图片位置错乱

window.addEventListener('DOMContentLoaded',function(){
    var $=unsafeWindow.$;
    // 遍历每个图片元素,额外多包一层,防止影响楼中的视频.
    $(".BDE_Image").each(function(){$(this).wrap(function(){return '<span/>';})});
	// 去除原来的事件
	$(".BDE_Image").each(function(){$(this).parent().html($(this).parent().html());});
    // 右下角的分享
    $(".fav-toolbar").css("padding-left","1px");
    // 连续看图
    $("#pic_to_album_tip").remove();
    // 重新为每个元素绑定事件
    $(".BDE_Image").each(function(){
        // 新元素
        var img=document.createElement("img");
        // 得到图片ID
        var reg=/\/[a-z0-9]{20,}(?=\.[jpg|gif|png])/;
        var match=$(this).attr("src").match(reg);
        if(!match){return;}
        var picSrc="http://imgsrc.baidu.com/forum/pic/item"+match[0]+".jpg";
	    // 图片资源
        img.src=picSrc;
        // 当点击
        $(this).click(function(){
            // 增加
            document.body.appendChild(img);
            // 为mousedown 和mouseup 共享鼠标位置
            var mousePos;
	        // 拖动事件
            $(img).mousedown(function(e){
                // 当鼠标为右键时,不判断,这样可以下载大图
                if(e.button=='2'){return ;}
                // 保存鼠标按下时位置,单击remove
	            mousePos=e.pageX/e.pageY;
                var mouse_x=e.pageX;
	            var old_y=parseInt($(this).css("top"));
	            var mouse_y=e.pageY;
	            var old_x=parseInt($(this).css("left"));
	            $(document).bind("mousemove",function(e){
	                // 移动位置
	                $(img).css({
	                    "top":e.pageY-mouse_y+old_y,
	                    "left":e.pageX-mouse_x+old_x
	                });
	            });
                return false;
            });
            // 弹起弄全局的
            $(document).mouseup(function(e){
                // 位置没变则remove
                if(e.pageX/e.pageY==mousePos){$(img).remove()};
	            $(document).unbind("mousemove");
            });
            // 鼠标滚动,jquery好像没有这个事件
            img.addEventListener('DOMMouseScroll',function(e){
                // 改变一个大小就行,改两个反而会变形
                $(img).attr('width',(img.width-e.detail*15) < 100 ? 100 : img.width-e.detail*15);
                //$(img).attr('height',img.height+img.height*e.detail*0.03);
                // 实现由中间扩大
                $(img).css({
                    "margin-top":-parseInt($(img).css("height"))/2.0+"px",
                    "margin-left":-parseInt($(img).css("width"))/2.0+"px"
                });
                // 取消浏览器默认的事件
                e.preventDefault();
                //e.stopPropagation();
                return false;
            },true);
            // 添加效果
            $(img).css({
                "position":"fixed",
                "z-index":"999",
                // 居中
                "top":"50%",
                "left":"50%",
                "margin-top":-parseInt($(img).css("height"))/2+"px",
                "margin-left":-parseInt($(img).css("width"))/2+"px",
                "border":"1px dashed hsl(40,50%,30%)",
                "box-shadow":"0px 0px 5px gray"
            });
        });
    });
},false);


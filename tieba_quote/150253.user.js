// ==UserScript==
// @name           tieba_quote
// @description    百度贴吧引用
// @include        http://tieba.baidu.com/p/*
// @include        http://tieba.baidu.com/f?ct=*
// @include        http://tieba.baidu.com/f?kz=*
// @updateURL      https://userscripts.org/scripts/source/150253.meta.js
// @downloadURL    https://userscripts.org/scripts/source/150253.user.js
// @icon           http://tb.himg.baidu.com/sys/portraitn/item/4e2ed7f8bbb3d4f2c2d2bb21
// @author         congxz6688
// @version        2013.10.15.0
// ==/UserScript==

var replyCss = "";
replyCss += ".ordiFloor>.SimQuote,.ordiFloor>.jiangyou,.ordiFloor>.quoteButton{margin:0px 3px; float:right} .ordiFloor>.splitl{color:#7B6681; float:right}";
replyCss += ".lzlFloor>.quoteButton{margin:0px 3px 0px 6px;} .lzlFloor>.splitl{color:#7B6681;}";
replyCss += "fieldset{width:580px !important; background-color:#E7E6E0 !important;color:#555555 !important; border: solid 1px #D2B48C !important;}";
replyCss += "legend{background-color:#F2F1EE !important;border: solid 1px #C3A782 !important; border-radius: 5px !important;}.super_jubao{display:none !important;}";
replyCss += "fieldset .myresized,fieldset .BDE_Image{height:auto !important; width:auto !important; max-height:200px; max-width:560px !important;}";
GM_addStyle(replyCss);

$ = unsafeWindow.$;
var splitt = "<br>———————————————————————————<br>";

//函数 元素精确定位
function addNodeInsertedListener(elCssPath, handler, executeOnce, noStyle) {
	var animName = "anilanim",
	prefixList = ["-o-", "-ms-", "-khtml-", "-moz-", "-webkit-", ""],
	eventTypeList = ["animationstart", "webkitAnimationStart", "MSAnimationStart", "oAnimationStart"],
	forEach = function (array, func) {
		for (var i = 0, l = array.length; i < l; i++) {
			func(array[i]);
		}
	};
	if (!noStyle) {
		var css = elCssPath + "{",
		css2 = "";
		forEach(prefixList, function (prefix) {
			css += prefix + "animation-duration:.001s;" + prefix + "animation-name:" + animName + ";";
			css2 += "@" + prefix + "keyframes " + animName + "{from{opacity:.9;}to{opacity:1;}}";
		});
		css += "}" + css2;
		GM_addStyle(css);
	}
	if (handler) {
		var bindedFunc = function (e) {
			var els = document.querySelectorAll(elCssPath),
			tar = e.target,
			match = false;
			if (els.length !== 0) {
				forEach(els, function (el) {
					if (tar === el) {
						if (executeOnce) {
							removeNodeInsertedListener(bindedFunc);
						}
						handler.call(tar, e);
						return;
					}
				});
			}
		};
		forEach(eventTypeList, function (eventType) {
			document.addEventListener(eventType, bindedFunc, false);
		});
		return bindedFunc;
	}
}
//函数 元素精确定位取消绑定
function removeNodeInsertedListener(bindedFunc) {
	var eventTypeList = ["animationstart", "webkitAnimationStart", "MSAnimationStart", "oAnimationStart"],
	forEach = function (array, func) {
		for (var i = 0, l = array.length; i < l; i++) {
			func(array[i]);
		}
	};
	forEach(eventTypeList, function (eventType) {
		document.removeEventListener(eventType, bindedFunc, false);
	});
}
//兼容小脸
function smallFaceEnbale() {
	$('#cLinkContent1').css({
		"display" : 'table-cell'
	}); //兼容旧版小脸，打开编辑窗
	$('#cLinkContent').css({
		"display" : 'table-cell'
	}); //兼容新版小脸，打开编辑窗
	$('#menuSwitch').html('>>'); //兼容小脸，打开编辑窗
}
//兼容浮动编辑窗
function alsoFloatEditor() {
	var normalEditorCss = "";
	normalEditorCss += "body{margin-bottom:360px !important;}";
	normalEditorCss += "#edit_parent *{max-width:635px !important}";
	normalEditorCss += ".tb-editor-editarea{max-height:266px !important; min-height:50px !important;}";
	normalEditorCss += ".edit_title_field{padding:0px 3px!important; margin:0px 0px -5px 0px !important;}";
	document.getElementById("floatEditorCSS").innerHTML = normalEditorCss;
	document.getElementById("edit_parent").setAttribute("class", "floatEditor");
	document.getElementById("OaCbutton").setAttribute("status", "open");
}
// 函数 回复层引用
function replyQuote(e) {
	var opyu = e.target;
	allInfo = JSON.parse($(".l_post").has(opyu).attr("data-field"));
	Louzhu = allInfo.author.name;
	Louceng = allInfo.content.floor + "楼";
	quoteText = ($(".l_post").has(opyu).find(".d_post_content").html()) ? $(".l_post").has(opyu).find(".d_post_content").html().replace(/<a[ ].*?>@?/g, "").replace(/<\/a>/g, "").replace(/<spa[mn][ ]class="addPlus.*?<\/spa[mn]>/g, "").replace(/<spa[mn][ ]class="picFrdTab.*?<\/spa[mn]>/g, "") : $(".l_post").has(opyu).find(".d_post_content").text();
	
	//以下屏蔽小尾巴
	quoteText = quoteText.replace(/<span[ ]class="apc_src_wrapper">.*?span>/g, "");
	quoteText = quoteText.replace(/<span[ ]class="edit_font.*?">(<strong>)?\s*————.*?span>/g, "");
	quoteText = quoteText.replace(/<strong>.*?————.*?strong>/g, "");
	quoteText = quoteText.replace(//g, "");
	quoteText = quoteText.replace(/<br>\s*[-—]{2,}.*|<br>>{2,}.*|<br>([-]\s){2,}.*/g, "");
	
	//去除以下的签名图
	quoteText = quoteText.replace(/<img.*?height="21"[ ]width="570".*/, "");
	quoteText = quoteText.replace(/<img.*?height="19"[ ]width="570".*/, "");
	quoteText = quoteText.replace(/<img.*?height="20"[ ]width="560".*/, "");
	quoteText = quoteText.replace(/<img.*?height="19"[ ]width="320".*/, "");
	
	//消除多余的空格回车
	quoteText = quoteText.replace(/(<br>){2,}/g, "<br>");

	//兼容小脸
	if (document.getElementById("Mark1") || document.getElementById("cMark")) {
		smallFaceEnbale();
	}
	//兼容浮窗
	if (document.getElementById("OaCbutton") && document.getElementById("OaCbutton").getAttribute("status") == "close") {
		alsoFloatEditor();
	}	
	//队形
	if (opyu.className == "jiangyou") {
		unsafeWindow.test_editor.execCommand("inserthtml", quoteText);
		//$(".tb-editor-editarea img:not(.BDE_Smiley)").removeAttr("id").attr("class", "BDE_Image");
		content.scrollTo(0, 99999);
		setTimeout(function () {
			document.querySelector(".poster_submit").click();
		}, 500);
	} else {
		//引用
		var temp = '引用&nbsp;@' + Louzhu + '&nbsp;(' + Louceng + ')<br>' + quoteText + splitt + '<br>';
		temp = temp.replace(/<\/?span>/g,"").replace(/(<br>){2,}—————————/,"<br>—————————");
		//简引
		if (opyu.className == "SimQuote") {
			var nhtemp = quoteText.replace(/<img.*?>/g, " [图] ").replace(/<(?!br).*?>/g, "");
			var temp = '引用&nbsp;@' + Louzhu + '&nbsp;(' + Louceng + ')<br>' + ((nhtemp.length < 61) ? nhtemp : nhtemp.slice(0, 50) + '......（此处省略' + (nhtemp.length - 50 - (nhtemp.slice(50).match(/<br>/g) ? nhtemp.slice(50).match(/<br>/g).length * 4 : 0) - (nhtemp.slice(50).match(/\[图\]/g) ? nhtemp.slice(50).match(/[ ]\[图\][ ]/g).length * 5 : 0)) + '字）') + splitt + '<br>';
			temp = temp.replace("<br><br>—————————","<br>—————————");
		}
		unsafeWindow.test_editor.execCommand("inserthtml", temp);
		$(".tb-editor-editarea img:not(.BDE_Smiley)").removeAttr("id").attr("class", "BDE_Image");
	}
}

//函数 楼中楼引用
function replyQuote_lzl(e) {
	var opyu = e.target;
	allInfo = JSON.parse($(".l_post").has(opyu).attr("data-field"));
	Louzhu = JSON.parse($(".lzl_single_post").has(opyu).attr("data-field")).user_name;
	Louceng = allInfo.content.floor + "楼，楼中楼";
	quoteText = $(".lzl_cnt").has(opyu).find(".lzl_content_main").html().replace(/回复.*?[ ][：:]/,"").replace(/<a[ ].*?>@?/g, "").replace(/<\/a>/g, "").replace(/<spa[mn][ ]class="addPlus.*?<\/spa[mn]>/g, "").replace(/<spa[mn][ ]class="picFrdTab.*?<\/spa[mn]>/g, "").replace(/^(<br>)+/, "").replace(/(<br>)+$/, "");
	var temp = '引用&nbsp;@' + Louzhu + '&nbsp;(' + Louceng + ')<br>' + quoteText + splitt + '<br>';
	var nhtemp = quoteText.replace(/<img.*?>/g, " [图] ").replace(/<(?!br).*?>/g, "").replace(/^\s*/, "").replace(/\s*$/, "");
	if (document.getElementById("Mark1") || document.getElementById("cMark")) { //兼容小脸
		smallFaceEnbale();
	}
	if (document.getElementById("OaCbutton") && document.getElementById("OaCbutton").getAttribute("status") == "close") {
		alsoFloatEditor();
	}
	unsafeWindow.test_editor.execCommand("inserthtml", temp);
	$(".tb-editor-editarea img:not(.BDE_Smiley)").removeAttr("id").attr("class", "BDE_Image");
}
//帖子内刷新
var freshDiv = $("<spadn>", {
		html : "刷"
	}).css({
		"cursor" : "pointer",
		"color" : "blue",
		"font-size" : "14px",
		"backgroundColor" : "grey",
		"height" : "14px",
		"width" : "14px",
		"padding" : "2px 5px 7px 5px",
		"position" : "fixed",
		"bottom" : "0px",
		"left" : "0px",
		"z-index" : "997"
	}).click(function () {
		window.location = window.location.href.replace(/#\d+/, "");
	}).appendTo(document.body);

//主楼层引用按钮
addNodeInsertedListener('.p_mtail', function () {
	var uuyuui = $("<li>", {
			class : "ordiFloor"
		});
	$("<span>", {
		class : "splitl",
		html : "|"
	}).appendTo(uuyuui);
	
	$("<a>", {
		href : "javascript:void(0);",
		title : "全文引用",
		html : "引用",
		class : "quoteButton",
		click : replyQuote
	}).appendTo(uuyuui);
	
	$("<span>", {
		class : "splitl",
		html : "|"
	}).appendTo(uuyuui);
	
	$("<a>", {
		href : "javascript:void(0);",
		title : "象征性引用前面一部分",
		html : "简引",
		class : "SimQuote",
		click : replyQuote
	}).appendTo(uuyuui);
	
	$("<span>", {
		class : "splitl",
		html : "|"
	}).appendTo(uuyuui);
	
	$("<a>", {
		href : "javascript:void(0);",
		html : "队形",
		class : "jiangyou",
		click : replyQuote
	}).appendTo(uuyuui);
	
	$(this).append(uuyuui);
});
//楼中楼引用按钮
addNodeInsertedListener('.lzl_content_reply', function () {
	var tabPid = JSON.parse($(".l_post").has(this).attr("data-field")).content.id;
	var lzlspid = JSON.parse($(".lzl_single_post").has(this).attr("data-field")).spid;
	var hreff = window.location.href.replace(/f\?ct.*?&z=/, "p/").replace(/\?.*/, "").replace(/#.*/, "");
	var iip = $("<span>", {
			class : "lzlFloor"
		}).insertAfter($(this).find(".lzl_jb"));
	
	$("<a>", {
		href : "javascript:void(0);",
		html : "引用",
		class : "quoteButton",
		click : replyQuote_lzl
	}).appendTo(iip);
	
	$("<span>", {
		class : "splitl",
		html : "|"
	}).appendTo(iip);
	
	$("<a>", {
		href : hreff + "?pid=" + tabPid + "&cid=" + lzlspid + "#" + lzlspid,
		title : "右键复制链接地址，可供访问者直达此楼",
		class : "quoteButton",
		html : "链接",
	}).appendTo(iip);
	
	$("<span>", {
		class : "splitl",
		html : "|"
	}).appendTo(iip);
});

//给引用部分改个式样
$(".d_post_content").html(function (a, ol) {
	var splittReg = new RegExp("<br>—{27,36}", "g");
	var howManyQuote = ol.match(splittReg);
	if (howManyQuote && ol.indexOf("楼)") != -1) {
		$(this.parentNode.parentNode).find("br").detach();
		var partQuote = ol.split(howManyQuote[0]);
		if (howManyQuote.length == 1) {
			var uu = partQuote[0].replace(/.*?(?=引用[ ])/, "");
			var tmp1 = uu.substr(0, uu.indexOf("楼)") + 2);
			if (tmp1.match(/\(\d{6,}[ ]\d+楼/)) {
				var thisTabId = window.location.href.match(/(\/p\/|&z=)\d{8,}/)[0].replace("/p/", "").replace("&z=", "");
				tmp1 = tmp1.replace(/\((\d{6,})[ ](\d+楼)/, "(<a href='http://tieba.baidu.com/p/" + thisTabId + "?pid=$1#$1' target='_blank'>$2</a>");
			}
			var tmp2 = (partQuote[0].split("楼)<br>")[1]) ? partQuote[0].split("楼)<br>")[1] : "";
			var quote = '<blockquote class="d_quote"><fieldset><legend>' + tmp1 + '</legend><p class="quote_content">' + tmp2 + '</fieldset></blockquote>';
			$(quote).insertBefore(this.parentNode);
			return partQuote[1].replace(/^(<br>){1,}/, "");
		} else {
			for (ss = 0; ss < howManyQuote.length; ss++) {
				if (partQuote[ss].indexOf("楼)") == -1) {
					continue;
				} else {
					var uu = partQuote[ss].replace(/.*?(?=引用[ ])/, "");
					var tmp1 = uu.substr(0, uu.indexOf("楼)") + 2);
					if (tmp1.match(/\(\d{6,}[ ]\d+楼/)) {
						var thisTabId = window.location.href.match(/(\/p\/|&z=)\d{8,}/)[0].replace("/p/", "").replace("&z=", "");
						tmp1 = tmp1.replace(/\((\d{6,})[ ](\d+楼)/, "(<a href='http://tieba.baidu.com/p/" + thisTabId + "?pid=$1#$1' target='_blank'>$2</a>");
					}
					var tmp2 = partQuote[ss].split("楼)<br>")[1];
					oll = partQuote[ss + 1].substr(0, (partQuote[ss + 1].indexOf("引用 ") == -1) ? partQuote[ss + 1].length : partQuote[ss + 1].indexOf("引用 "));
					var quote = '<blockquote class="d_quote"><fieldset><legend>' + tmp1 + '</legend><p class="quote_content">' + tmp2 + '</fieldset></blockquote>';
					$(this.parentNode.parentNode).append(quote);
					var partText = '<cc><div class="d_post_content">' + oll.replace(/^(<br>){1,}/, "") + '</div></cc><br>';
					$(this.parentNode.parentNode).append(partText);
				}
			}
			return "";
		}
	}
});

//给各楼层号添加直达链接
addNodeInsertedListener('.p_tail>li:first-child>span', function () {
	var tabPid = JSON.parse($(".l_post").has(this).attr("data-field")).content.id;
	var hreff = window.location.href.replace(/f\?ct.*?&z=/, "p/").replace(/\?.*/, "").replace(/#.*/, "");
	var newAn = $("<a>", {
			href : hreff + "?pid=" + tabPid + "#" + tabPid,
			title : "右键复制链接地址，可供访问者直达此楼",
			html : this.innerHTML
		});
	$(this).replaceWith(newAn);
});

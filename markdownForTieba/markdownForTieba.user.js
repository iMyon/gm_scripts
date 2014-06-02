// ==UserScript==
// @name        markdownForTieba
// @namespace   Myon
// @include     http://tieba.baidu.com/p/*
// @include     http://tieba.baidu.com/f*ct=*
// @author      Myon<myon.cn@gmail.com>
// @downloadURL https://github.com/iMyon/gm_scripts/raw/master/markdownForTieba/markdownForTieba.user.js
// @updateURL   https://github.com/iMyon/gm_scripts/raw/master/markdownForTieba/markdownForTieba.meta.js
// @icon        http://tb.himg.baidu.com/sys/portrait/item/c339b7e2d3a1b5c4c3a8d726
// @version     0.2.2
// ==/UserScript==

var $ = unsafeWindow.$;

var cssfile = "http://imyon.github.io/github-markdown-css/github-markdown.css";
var is_cssLoad = false;

var markdown = {
  init: function(){
    $("cc div").each(function() {
      var context = this;
      var matches = $(context).html().match(/&lt;markdown&gt;((.|\s)*)&lt;\/markdown&gt;/i);
      if (matches) {
        (!is_cssLoad) && loadcssfile(cssfile);
        is_cssLoad = true;
        //异步请求，给局部变量做个闭包
        (function(context,matches){
          markdown.format(context);
          matches = $(context).html().match(/&lt;markdown&gt;((.|\s)*)&lt;\/markdown&gt;/i);
          var text = matches[1].replace(/<br>/ig, "\n")
            .replace(/&lt;/ig, "<")
            .replace(/&gt;/ig, ">")
            .replace(/&nbsp;/ig, " ")
            .replace(/&amp;/ig, "&");
          markdown.parse(text,function(data){
            try{
              JSON.parse(data);
            }catch(e){
              $(context).html($(context).html().replace(matches[0],data));
              $(context).wrap('<article class="markdown-body"></article>');
            }
          });
        })(context,matches);
      }
    });
  },
  parse:function(text,callback){
    $.ajax({
        type: 'POST',
        url: "https://api.github.com/markdown/raw?client_id=f07c04b23bc414850b4f&client_secret=d4def73f1fda054d88aa6371aa1156ba442ac142",
        headers: {
            "Accept":"application/vnd.github.v3+json",
            "Content-Type":"text/plain"
        },
        data:text,
        success:callback
    });
  },
  //格式化贴吧的img和a节点为文本
  format: function(element){
    $(element).find("a").each(function(){
      if(!$(this).hasClass('at'))
        $(this).replaceWith(this.innerHTML);
    });
    $(element).find("img").each(function(){
      $(this).replaceWith(this.src);
    });
  }
}

markdown.init();
$(".left_section").on("DOMNodeInserted",function(e) {
  if(e.target.id && e.target.id.indexOf("j_p_postlist")!= -1){
    markdown.init();
  }
});

function loadcssfile(filename){
  var fileref = document.createElement('link');
  fileref.setAttribute("rel","stylesheet");
  fileref.setAttribute("type","text/css");
  fileref.setAttribute("href",filename);
  document.head.appendChild(fileref);
}

GM_addStyle("code{\
  width:auto;\
  height:auto;\
  display: inline;\
}\
em{\
    font-style: italic;\
}\
.octicon-link:before {\
}");
// ==UserScript==
// @name        pixivGifZipDownloader
// @namespace   Myon
// @description p站gif图zip包下载
// @include     http://www.pixiv.net/member_illust.php?mode=medium&illust_id=*
// @author      Myon<myon.cn@gmail.com>
// @icon        http://tb.himg.baidu.com/sys/portrait/item/c339b7e2d3a1b5c4c3a8d726
// @downloadURL https://github.com/iMyon/gm_scripts/raw/master/pixivGifZipDownloader/pixivGifZipDownloader.user.js
// @updateURL   https://github.com/iMyon/gm_scripts/raw/master/pixivGifZipDownloader/pixivGifZipDownloader.meta.js
// @version     0.1
// @grant       GM_addStyle
// ==/UserScript==

var $ = unsafeWindow.$;
if($("._ugoku-illust-player-container").length){
  var downloadUrl = $('meta[property="og:image"]').attr("content")
    .replace("img-inf","img-zip-ugoira")
    .replace(/(.*)(\d+_)(s.*)$/,"$1$2ugoira600x600.zip");
  var downloadButton = document.createElement("div");
  downloadButton.setAttribute("id","downloadZip");
  var link = document.createElement("a");
  link.href = downloadUrl;
  link.setAttribute("class","_button");
  link.innerHTML = "下载";
  link.title = "下载zip";
  downloadButton.appendChild(link);
  $(".bookmark-container").before(downloadButton);

  GM_addStyle('\
    #downloadZip{\
      display: inline;\
      float: right;\
      position: relative;\
      right: 80px; \
      top: -20px;\
    }\
  ');
}
  
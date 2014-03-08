// ==UserScript==
// @name        Niconvert Commnet Link
// @namespace   qixinglu.com
// @description 显示 Acfun 和 Bilibili 的弹幕评论地址
// @grant       GM_xmlhttpRequest
// @include     http://www.bilibili.tv/video/*
// @include     http://bilibili.kankanews.com/video/*
// @include     http://bilibili.smgbb.cn/video/*
// @include     http://www.acfun.tv/v/*
// ==/UserScript==

var createCommentLink = function(commentUrl) {
    var link = document.createElement('a');
    link.href = commentUrl;
    link.text = '评论地址';
    return link;
};

var createConvertLink = function() {
    var url = encodeURIComponent(location.href);
    var link = document.createElement('a');
    link.href = 'http://niconvert.appspot.com/?url=' + url;
    link.text = '转换弹幕';
    return link;
}

var bilibili = function() {
    var innerHTML = document.documentElement.innerHTML;
    var matches = innerHTML.match(/flashvars="(.+?)"/i);
    if (matches === null) {
        matches = innerHTML.match(/\/secure,(.+?)"/i);
    }
    var infoArgs = matches[1].replace(/&amp;/g, '&');
    var infoUrl = 'http://interface.bilibili.tv/player?' + infoArgs;

    GM_xmlhttpRequest({
        method: 'GET',
        url: infoUrl,
        onload: function(response) {
            var prefix = 'http://comment.bilibili.tv/';
            var reg = /<chatid>(.+?)<\/chatid>/;
            var commentUid = response.responseText.match(reg)[1];
            var commentUrl = prefix + commentUid + '.xml';
            var commentLink = createCommentLink(commentUrl);
            var convertLink = createConvertLink();

            convertLink.style.marginLeft = '13px';
            var wrapContainer = document.createElement('div');
            wrapContainer.style.marginTop = '3px';
            wrapContainer.style['float'] = 'left';
            wrapContainer.appendChild(commentLink);
            wrapContainer.appendChild(convertLink);

            document.querySelector('.tminfo').appendChild(wrapContainer);
            document.querySelector('.sf').style.marginTop = '24px';
        }
    });
};

var acfun = function() {
    var innerHTML = document.documentElement.innerHTML;
    var matches = innerHTML.match(/\[Video\](.+?)\[\/Video\]/i);
    if (matches === null) {
        matches = innerHTML.match(/value="vid=(.+?)&/i);
    }
    var infoArgs = matches[1];
    var infoUrl = 'http://www.acfun.tv/api/player/vids/' + infoArgs + '.aspx';

    GM_xmlhttpRequest({
        method: 'GET',
        url: infoUrl,
        onload: function(response) {
            var prefix = 'http://comment.acfun.tv/';
            var commentUid = JSON.parse(response.responseText).cid;
            if (commentUid === undefined) {
                commentUid = infoArgs;
            }
            var commentUrl = prefix + commentUid + '.json';
            var commentLink = createCommentLink(commentUrl);
            var convertLink = createConvertLink();

            commentLink.style.marginLeft = '12px';
            convertLink.style.marginLeft = '12px';
            var position = document.querySelector('#subtitle-article');
            position.appendChild(commentLink);
            position.appendChild(convertLink);
        }
    });

};

if (location.href.indexOf('http://www.acfun.tv') === 0) {
    window.addEventListener('load', acfun);
} else {
    bilibili();
}


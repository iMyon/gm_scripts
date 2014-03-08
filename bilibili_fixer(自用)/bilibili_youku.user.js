// ==UserScript==
// @name        bilibili fixer(自用)
// @include     http://www.bilibili.tv/video/av*
// ==/UserScript==

$ = unsafeWindow.$;
var convertToBilibiliPlayer = function() {
    if ($('#bofqi embed').length || $('param[name="flashvars"]').length) {
        var cid = '';
        if ($('#bofqi embed').length !== 0)
            cid = $('#bofqi embed').attr('flashvars');
        else
            cid = $('param[name="flashvars"]').val();
        cid = cid.match(/cid=([0-9]*)/)[1];

        var bofqi = document.querySelector('#bofqi');
        bofqi.innerHTML = '<iframe width="950" scrolling="no" height="482" frameborder="no" onload="window.securePlayerFrameLoaded=true" framespacing="0" border="0" src="https://secure.bilibili.tv/secure,cid=' + cid + '&amp;aid=895232" class="player"></iframe>';


    } else {
        setTimeout(function() {
            convertToBilibiliPlayer();
        }, 1000);
    }
};
convertToBilibiliPlayer();

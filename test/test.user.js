// ==UserScript==
// @name        test
// @namespace   .
// @include     *
// @version     1
// ==/UserScript==


var $=unsafeWindow.$;
unsafeWindow.aaa = function()
{
	alert(0);
}
$('#pb_content').attr('onclick','aaa()');

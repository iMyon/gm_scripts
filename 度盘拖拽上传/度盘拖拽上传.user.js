// ==UserScript==
// @name        度盘拖拽上传
// @include     http://pan.baidu.com/disk/home*
// @version     1
// ==/UserScript==

(function (w) {
	'use strict';
	w.addEventListener('dragover', function (e) {
		e.preventDefault();
	}, true);
	w.addEventListener('drop', function (e) {
		var files, i;
		if (!(files = e.dataTransfer.files).length) return;
		e.preventDefault();
		i = 0;
		[].forEach.call(files, function (file) {
			var fd, xhr;
			if (!file.size) return;
			++i;
			fd = new FormData;
			fd.append('file', file);
			xhr = new XMLHttpRequest;
			xhr.open('POST', 'http://c.pcs.baidu.com/rest/2.0/pcs/file?method=upload&type=tmpfile&app_id=250528&' + w.document.cookie.match(/\b(BDUSS=.*?);/)[1], true);
			xhr.onload = function () {
				fd = new FormData;
				fd.append('path', (location.hash.indexOf('path=') !== -1 ? decodeURIComponent(location.hash.split('path=')[1]) + '/' : '/') + file.name);
				fd.append('block_list', '["' + JSON.parse(this.responseText).md5 + '"]');
				fd.append('isdi', '0');
				fd.append('size', file.size);
				fd.append('method', 'post');
				this.abort();
				this.onload = null;
				this.open('post', 'http://pan.baidu.com/api/create?a=commit&channel=chunlei&clienttype=0&web=1&bdstoken' + w.FileUtils.bdstoken, false);
				this.send(fd);
				--i || location.reload();
			};
			xhr.send(fd);
		});
	}, false);
})(window);
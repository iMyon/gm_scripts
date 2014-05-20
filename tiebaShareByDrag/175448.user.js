// ==UserScript==
// @name        tiebaShareByDrag 
// @namespace   Myon
// @description 拖拽文件到贴吧发贴框自动生成百度云分享链接
// @include     http://tieba.baidu.com/*
// @author      Myon<myon.cn@gmail.com>
// @downloadURL https://github.com/iMyon/gm_scripts/raw/master/tiebaShareByDrag/175448.user.js
// @updateURL   https://github.com/iMyon/gm_scripts/raw/master/tiebaShareByDrag/175448.meta.js
// @icon        http://tb.himg.baidu.com/sys/portrait/item/c339b7e2d3a1b5c4c3a8d726
// @version     1.1.1
// ==/UserScript==

var $ = unsafeWindow.$;
var userdata = GM_getValue('userdata', '{}');
userdata = JSON.parse(userdata);
var path = '';
var shareUrl = '';

var files,
  bdstoken,
  container = "";
var user = unsafeWindow.PageData.user.user_id;
console.log(user);

//GM保存的数据，多账号支持
var postDiv = "#ueditor_replace";
(function l_init() {
  container = document.querySelector(postDiv);
  if (container) {
    GM_registerMenuCommand("贴吧拖拽分享设置", setting);
    container.addEventListener("drop", function(event) {
      if (userdata[user]) {
        path = userdata[user].path;
      } else
        userdata[user] = {
          path: ''
        };
      i, j = 0;
      if (!path) {
        alert('首次使用会自动进行设置，以后需要修改的话<ctrl+鼠标左键>弹出设置\n\n确定后请等待设置完成（一般几秒后就会提示完成设置）');
        GM_xmlhttpRequest( //获取token
          {
            method: "GET",
            url: "http://pan.baidu.com/disk/home",
            //synchronous:true,
            onload: function(res) {
              bdstoken = res.responseText.match(/bdstoken="(.{1,50})";/)[1];
              setting();
            }
          });
        //throw(-1);
      } else {
        files = event.dataTransfer.files;
        //console.log(files[0].type);
        GM_xmlhttpRequest( //获取token
          {
            method: "GET",
            url: "http://pan.baidu.com/disk/home",
            //synchronous:true,
            onload: function(res) {
              bdstoken = res.responseText.match(/bdstoken="(.{1,50})";/)[1];
              createFolder(path);
            }
          });
        for (var i = 0; i < files.length; i++) {
          if ((!files[i].type.match(/image/)) && (!(files[i].name.match(/zip$|7z$|rar$|tar$/) && files[i].size < 1000000)))
            uploadFile(i); //上传文件
        }
      }
    }, false);

  } else {
    setTimeout(l_init, 100)
  }
})();


function uploadFile(i) {
  var fd = new FormData; //post数据
  fd.append('file', files[i]);
  var xhr = GM_xmlhttpRequest({
    method: "POST",
    data: fd,
    upload: {
      onprogress: uploadProgress
    },
    url: "http://c.pcs.baidu.com/rest/2.0/pcs/file?method=upload&type=tmpfile&app_id=250528", //上传给度娘获取md5
    onload: function(res) {
      //console.log(res.responseText);
      fd = new FormData;
      fd.append('path', path + files[i].name);
      fd.append('block_list', '["' + JSON.parse(res.responseText).md5 + '"]');
      fd.append('method', 'post');
      fd.append('size', files[i].size);
      GM_xmlhttpRequest({
        method: "POST",
        data: fd,
        url: 'http://pan.baidu.com/api/create?a=commit&channel=chunlei&clienttype=0&web=1&bdstoken=' + bdstoken, //根据md5值保存到自己的网盘
        onload: function(res) {
          var fid = JSON.parse(res.responseText).fs_id;
          var name = JSON.parse(res.responseText).server_filename;
          Share(fid,function(res){
            var json = JSON.parse(res.responseText);
            if(json.errno == 0){
              insertContent(name,json.shorturl);
            }
            else{
              console.log("创建分享失败");
            }
          });
        }
      });
      var bar = document.querySelector('#tbsdProgressBar');
      bar.parentNode.removeChild(bar); //移除进度条
    }
  });
}

function uploadProgress(evt) //进度条
{
  if (!document.querySelector('#tbsdProgressBar')) {
    var progressBar = document.createElement('progress');
    progressBar.id = 'tbsdProgressBar';
    progressBar.value = 0;
    progressBar.setAttribute('style', 'position:absolute;left:20%;top:50px;z-index:auto;');
    document.querySelector(".edui-editor-body").appendChild(progressBar);
  }
  if (evt.lengthComputable) {
    document.querySelector('#tbsdProgressBar').value = evt.loaded / evt.total;
  } else {
    alert("上传失败");
  }
}

function insertContent(name, panlink) {
  var html = document.querySelector(postDiv).innerHTML;
  if (html == '<p><br></p>')
    html = '';
  else
    html += '<p><br></p>';
  html = html + "<p>" + name + '</p>';
  html = html + "<p>" + panlink + '</p>';
  document.querySelector(postDiv).innerHTML = html;
}

function setting() //设置path和shareUrl
{
  var p = prompt('输入你要保存到度盘的目录路径，例如：/test/', userdata[user] && userdata[user].path || "/apps/拖拽脚本/");
  if(p){
    path = p;
    userdata[user] = {
      path: p
    };
    createFolder(p);
    GM_setValue('userdata', JSON.stringify(userdata));
  }
}

function createFolder(cpath, callback) {
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://pan.baidu.com/api/list?channel=chunlei&clienttype=0&web=1&num=100&page=1&dir=' + encodeURIComponent(path) + '&order=time&desc=1',
    onload: function(res) {
      var info = JSON.parse(res.responseText);
      if (info.errno != 0) //创建目录
      {
        var cfd = new FormData;
        cfd.append('path', cpath);
        cfd.append('block_list', '[]');
        cfd.append('method', 'post');
        cfd.append('size', '');
        cfd.append('isdir', '1');
        GM_xmlhttpRequest({
          method: 'POST',
          url: 'http://pan.baidu.com/api/create?a=commit&channel=chunlei&clienttype=0&web=1&bdstoken=' + bdstoken + '&block_list=%5B%5D&isdir=1&method=post&path=%2F53135&size=',
          data: cfd,
          onload: function(res) {
            alert("成功创建目录 " + cpath);
          }
        });
      }
    }
  });
}

function Share(cfid, callback) {
  var cfd = new FormData;
  cfd.append('channel_list', '[]');
  cfd.append('schannel', '0');
  cfd.append('fid_list', '[' + cfid + ']');
  GM_xmlhttpRequest({
    method: 'POST',
    url: 'http://pan.baidu.com/share/set?channel=chunlei&clienttype=0&web=1&bdstoken=' + bdstoken,
    data: cfd,
    onload: callback
  });
}
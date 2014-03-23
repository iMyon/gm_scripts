// ==UserScript==
// @name        fuck tieba_lasyload
// Author: 8649807600cc
// Licence: WTFPL


if (document.getElementById('pblistCodeArea')) {
    //document.getElementById('list_loading').outerHTML=document.getElementById('pblistCodeArea').value;
    //document.getElementById('pblistCodeArea').parentElement.removeChild(document.getElementById('pblistCodeArea'));
    var lazyload_nodes = document.getElementById('pblistCodeArea').childNodes;
    for (var i = 0; i < lazyload_nodes.length; i++) {
        if (lazyload_nodes[i].nodeType == 8) {
            document.getElementById('list_loading').outerHTML = lazyload_nodes[i].data;
            lazyload_nodes[i].parentElement.removeChild(lazyload_nodes[i]);
            break;
        }
    }
    _.Module.use("pb/widget/ForumListV3", {
        listcount: "30"
    });
}

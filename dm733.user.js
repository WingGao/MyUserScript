// ==UserScript==
// @name       733dm查看利器
// @namespace  https://github.com/WingGao/MyUserScript
// @require http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js
// @version    1.4
// @description  方便看动漫
// @match      http://www.733dm.net/mh/*
// @copyright  2017+, WingGao
// ==/UserScript==

$("<style type='text/css'> \
a:active, a:visited {color: red;}\
.wing-div {display: inline-block;box-sizing:border-box;width: 45%;padding: 3%;} \
</style>").appendTo("head");
$("<div/>").addClass("redbold").text("SOME NEW TEXT").appendTo("body");
$(document).ready(function () {
    //修改快捷方式
    $('.plist.pmedium a').attr('target', '_blank');
    //修改样式
    if (photosr == null)return;
    var htmlstr = '';
    for (var i = 0; i < photosr.length; i++) {
        var img = 'http://733dm.zgkouqiang.cn/' + photosr[i];
        console.log('http://733dm.zgkouqiang.cn/' + photosr[i]);
        htmlstr += '<div class="wing-div"><div>' + (i + 1) + '</div><img src="' + img + '"></div>';
    }
    document.body.innerHTML = htmlstr;
});
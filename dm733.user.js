// ==UserScript==
// @name       733dm查看利器
// @namespace  https://github.com/WingGao/MyUserScript
// @version    0.1
// @description  方便看动漫
// @match      http://www.733dm.net/mh/*
// @copyright  2017+, WingGao
// ==/UserScript==


$(document).ready(function () {
    var htmlstr = ''
    for(var i=0;i<photosr.length;i++){
        var img = 'http://733dm.zgkouqiang.cn/'+photosr[i];
        console.log('http://733dm.zgkouqiang.cn/'+photosr[i]);
        htmlstr += '<p style="text-align: center"><img src="'+img +'"></p>';
    }
    document.body.innerHTML = htmlstr;
});
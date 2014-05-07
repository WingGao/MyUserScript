// ==UserScript==
// @name       DownHighFlickr
// @namespace  http://wingao.me/
// @version    0.1
// @description  get high image form flickr.com
// @match   https://*.flickr.com/photos/*
// @match   http://*.flickr.com/photos/*
// @copyright  2014, WingGao
// @require http://libs.baidu.com/jquery/2.0.3/jquery.min.js
// ==/UserScript==

//origan https://www.flickr.com/photos/93000893@N03/13939956410/sizes/o/in/photostream/
var url = window.location.href;
if (url.indexOf('/sizes/') > 0) {
    console.log('hello2');
}
else {
    $.get(url + 'sizes/o/', function (data, d) {
        var html = $($.parseHTML(data));
        var photoDiv = html.children('#allsizes-photo').children('img')[0];
        var downDiv = document.createElement('a');
        downDiv.textContent = "[Download]";
        downDiv.setAttribute('href', photoDiv.src);
        $('#title_div').append(downDiv);
        console.log();
    }, 'html')
}
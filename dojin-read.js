// ==UserScript==
// @name       同人方便看
// @namespace  https://github.com/WingGao/MyUserScript
// @version    1.0
// @description  用于在线观看同人
// @include      http://doujin-labo.com/eromanga/*
// @copyright  2016+, WingGao
// ==/UserScript==


function clearpage() {
    $("#side").remove();
    $('.page_list li a').removeAttr('href');
}

$(document).ready(function () {
    clearpage();
    $(document).scroll(function () {
        clearpage();
    });
});
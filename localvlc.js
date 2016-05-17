// ==UserScript==
// @name       贴吧 — 只显示楼主 精简界面
// @namespace  https://github.com/WingGao/MyUserScript
// @version    0.3
// @description  用于贴吧 【只看楼主】 页面，清理无用部分。
// @match      http://tieba.baidu.com/p/*?see_lz=1*
// @copyright  2015+, WingGao
// ==/UserScript==

var div = document.createElement('a');
div.innerText = "VLC";
div.style="top: 200px;position: fixed; background-color: red; z-index: 9999;font-size: 50px;";
div.setAttribute('src',encodeURIComponent(window.location.href))
document.body.appendChild(div);
document.getElementById('movie_player').remove();
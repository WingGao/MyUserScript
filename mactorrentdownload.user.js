// ==UserScript==
// @name       mac-torrent-download.net 去广告
// @namespace  https://github.com/WingGao/MyUserScript
// @version    1.2
// @description  mac-torrent-download.net 去广告
// @match      *://mac-torrent-download.net/*
// @copyright  2018+, WingGao
// ==/UserScript==


setInterval(function () {
    document.onclick = null;
}, 200);
$('a').each((i, v) => { var vq = $(v); if (vq.width() >= window.innerWidth * 0.9) { vq.remove(); }; });

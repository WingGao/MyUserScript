// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  try to take over the world!
// @author       WingGao
// @updateURL    https://github.com/WingGao/MyUserScript/raw/master/mtyun.user.js
// @match        https://www.mtyun.com/login?u-login
// @grant        none
// @require https://cdn.staticfile.org/jquery/3.4.1/jquery.slim.min.js
// @require https://github.com/WingGao/MyUserScript/raw/master/utils.js
// ==/UserScript==

(function() {
    WingWaitElement('#unitive-login-iframe',(jqIframe)=>{
        $('.login-content-right').append(`<a href='${jqIframe.attr('src')}'>login</a>`);
    })
})();

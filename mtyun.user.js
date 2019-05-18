// ==UserScript==
// @name         美团云优化
// @namespace    http://tampermonkey.net/
// @version      0.4
// @description  美团云优化
// @author       WingGao
// @updateURL    https://github.com/WingGao/MyUserScript/raw/master/mtyun.user.js
// @match        https://www.mtyun.com/login?*
// @grant        none
// @require      https://github.com/WingGao/MyUserScript/raw/master/utils.js
// ==/UserScript==

(function () {
    WingWaitElement('#unitive-login-iframe', (jqIframe) => {
        $('.login-content-right').append(`<a href='${jqIframe.attr('src')}'>login</a>`);
    })
})();

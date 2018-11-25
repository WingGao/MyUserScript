// ==UserScript==
// @name       steamdb - wing
// @namespace  https://github.com/WingGao/MyUserScript
// @version    0.1
// @description  steamdb modify
// @match      *://steamdb.info/app/*
// @copyright  2018+, WingGao
// ==/UserScript==


function modHistory() {
    if (window.location.href.indexOf('/history') == -1) {
        return;
    }
    let dom = `
    <div id="wing-div" style="position:fixed;right:0;top:50%;">
        <button id="wing-show-name">show name</button>
    </div>
    `
    $('body').append(dom)
    $('#wing-show-name').click(() => {
        $('.app-history .tooltipped').each((i, a) => {
            let a2 = $(a);
            let name = a2.attr('aria-label')
            if (name != null) {
                a2.text(name);
                a2.removeAttr('aria-label')
            }
        })
    })
}

$(document).ready(function () {
    modHistory()
});
// ==UserScript==
// @name       mweiqi GitLab
// @namespace  https://github.com/WingGao/MyUserScript
// @version    1.0
// @description  mweiqi GitLab
// @include      http://gitlab.mweiqi.com/real-time/server/issues/*
// @copyright  2016+, WingGao
// ==/UserScript==

function findSgTags() {
    var texts = document.getElementsByClassName('note-text');
    for (var i = 0; i < texts.length; i++) {
        var textJq = $(texts[i]);
        textJq.children('p').each(function (ind, pEle) {
            pEle.innerHTML = pEle.innerHTML.replace(/sg@(\w+)/i, function (match, p1) {
                return '<a href="https://gitlab.com/nweiqi/s-game/commit/' + p1 + '" ' + ' title="Commit: ' + p1 +
                    '" class="gfm gfm-commit" target="_blank">' + p1.substring(0, 8) + '</a>'
            })
        });

    }
}

$(document).ready(function () {
    findSgTags();
});
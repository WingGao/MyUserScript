// ==UserScript==
// @name           Wing's Anime and Manga seeker
// @description    Adds links to searches for Anime and Manga
// @version 1.0
// @include        http://myanimelist.net/anime/*
// @include        http://myanimelist.net/manga/*
// ==/UserScript==
var searchs = [
    {name: 'btdigg', short: 'bt', href: 'http://btdigg.org/search?q=%s'},
    {name: 'bitsnoop', short: 'bs', href: 'http://bitsnoop.com/search/all/%s'}
];
function getTitle(item) {
    var txt = item.innerText;
    var index = txt.indexOf(':');
    if (index >= 0)
        return txt.substr(index + 1);
    else return undefined;
}
function addSearch(item) {
    var link = document.createElement('div');
    var title = getTitle(item);
    if (title) {
        for (var i = 0; i < searchs.length; i++) {
            var s = searchs[i];
            var a = document.createElement('a');
            a.target = '_blank';
            a.href = s.href.replace('%s', title);
            a.title = s.name;
            a.innerText = s.short;
            link.appendChild(document.createTextNode('['));
            link.appendChild(a);
            link.appendChild(document.createTextNode('] '));
        }
    }
    item.appendChild(link);
}
function getItems() {
    var path = "//div[@class='spaceit_pad' and ./span[@class='dark_text']]";
    var divs = document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var div;
    for (var i = 0; div = divs.snapshotItem(i); i++) {
        addSearch(div);
//        console.log(div);
    }
}

function main() {
    getItems();
}

main();

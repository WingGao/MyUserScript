// ==UserScript==
// @name           Wing's Anime and Manga seeker
// @description    Adds links to searches for Anime and Manga
// @version 1.2
// @include        http://myanimelist.net/anime/*
// @include        http://myanimelist.net/manga/*
// ==/UserScript==
var searchs = [
    {name: 'btdigg', short: 'BT', href: 'http://btdigg.org/search?q=%s'},
    {name: 'bitsnoop', short: 'BS', href: 'http://bitsnoop.com/search/all/%s'},
    {name: 'NyaaTorrents', short: 'Nyaa', href: 'http://www.nyaa.se/?page=search&term=%s'},
    {name: 'KickAss', short: 'KA', href: 'http://kickass.to/usearch/%s'},
    {name: 'Google', short: 'GG', href: 'https://www.google.co.jp/search?q=%s+torrent&ie=UTF-8'},
    {name: 'PPC', short: 'PPC', href: 'http://localhost/ppc/item/add?title=%t&url=%u&img=%i&type=anime&r=1'}
];
function getTitle(item) {
    var txt = item.innerText;
    var index = txt.indexOf(':');
    return txt.substr(index + 1);
}
function addSearch(item, title) {
    var link = document.createElement('div');
    for (var i = 0; i < searchs.length; i++) {
        createSearchItem(link, searchs[i], title);
    }
    item.appendChild(link);
}

function createSearchItem(link, sitem, title) {
    var s = sitem;
    var a = document.createElement('a');
    a.target = '_blank';
    if (s.short == 'PPC')a.href = getPPC(s.href, title);
    else a.href = s.href.replace('%s', title);
    a.title = s.name;
    a.innerText = s.short;
    link.appendChild(document.createTextNode('['));
    link.appendChild(a);
    link.appendChild(document.createTextNode('] '));
}

function getItems() {
    var path = "//div[@class='spaceit_pad' and ./span[@class='dark_text']]";
    var divs = document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var div;
    for (var i = 0; div = divs.snapshotItem(i); i++) {
        addSearch(div, getTitle(div));
    }
    var al = document.getElementsByTagName('h2')[0];
    addSearch(al, document.title.substr(0, document.title.lastIndexOf('-')));
}

function getPPC(href, title) {
    var img = document.evaluate('//*[@id="content"]/table/tbody/tr/td[1]/div[1]/a/img');
    img = img.iterateNext();
    return href.replace('%t', encodeURIComponent(title)).replace('%u', encodeURIComponent(window.location.href))
        .replace('%i', encodeURIComponent(img.src));
}
function main() {
    getItems();
}

main();

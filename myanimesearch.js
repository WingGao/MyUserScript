// ==UserScript==
// @name           Wing's Anime and Manga seeker
// @description    Adds links to searches for Anime and Manga
// @version        2.0
// @include        http://myanimelist.net/anime/*
// @include        http://myanimelist.net/manga/*
// @include        http://anidb.net/perl-bin/animedb.pl?show=anime*
// ==/UserScript==
var searchs = [
    {name: 'btdigg', short: 'BT', href: 'http://btdigg.org/search?q=%s'},
    {name: 'bitsnoop', short: 'BS', href: 'http://bitsnoop.com/search/all/%s'},
    {name: 'NyaaTorrents', short: 'Nyaa', href: 'http://www.nyaa.se/?page=search&term=%s'},
    {name: 'KickAss', short: 'KA', href: 'http://kickass.to/usearch/%s'},
    {name: 'Google', short: 'GG', href: 'https://www.google.co.jp/search?q=%s+torrent&ie=UTF-8'},
    {name: 'PPC', short: 'PPC', href: 'http://localhost/ppc/item/add?title=%t&url=%u&img=%i&type=anime&r=1'}
];
var SETTING_ITEM = {}
//start myanimallist
function getTitle_MAL(item) {
    var txt = item.innerText;
    var index = txt.indexOf(':');
    return txt.substr(index + 1);
}
function getimg_MAL() {
    var img = document.evaluate('//*[@id="content"]/table/tbody/tr/td[1]/div[1]/a/img').iterateNext();
    if (img == null) {
        img = document.evaluate('//*[@id="content"]/table/tbody/tr/td[1]/div[1]/img').iterateNext();
    }
    return img
}
// end myanimallist
//start anidb
function getTitle_ADB(item) {
    var txt = item.innerText;
    var index = txt.lastIndexOf('(');
    if (index > 0)
        return txt.substr(0, index);
    else return txt
}
function getimg_ADB() {
    var img = document.evaluate('//*[@id="layout-main"]/div[1]/div[1]/div[2]/div[1]/img').iterateNext();
    return img
}
//end anidb

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
    else a.href = s.href.replace('%s', encodeURIComponent(title));
    a.title = s.name;
    a.innerText = s.short;
    link.appendChild(document.createTextNode('['));
    link.appendChild(a);
    link.appendChild(document.createTextNode('] '));
}

function getItems() {
    for (var j = 0; j < SETTING_ITEM.tpaths.length; j++) {
        var path = SETTING_ITEM.tpaths[j];
        var divs = document.evaluate(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        var div;
        for (var i = 0; div = divs.snapshotItem(i); i++) {
            addSearch(div, SETTING_ITEM.gettitle(div));
        }
    }

}

function getItem_MAL() {
    var al = document.getElementsByTagName('h2')[0];
    addSearch(al, document.title.substr(0, document.title.lastIndexOf('-')));
}

function getPPC(href, title) {
    var img = SETTING_ITEM.img;
    return href.replace('%t', encodeURIComponent(title)).replace('%u', encodeURIComponent(window.location.href))
        .replace('%i', encodeURIComponent(img.src));
}
function main() {
    switch (location.host) {
        case 'anidb.net':
            SETTING_ITEM = {
                tpaths: ['//tr[contains(@class,"romaji") or contains(@class,"official")]/td'],
                gettitle: getTitle_ADB,
                img: getimg_ADB()
            };

            break;
        case 'myanimelist.net':
            SETTING_ITEM = {
                tpaths: ["//div[@class='spaceit_pad' and ./span[@class='dark_text']]"],
                gettitle: getTitle_MAL,
                img: getimg_MAL()
            };
            getItem_MAL();
            break;
    }
    getItems();
}

main();

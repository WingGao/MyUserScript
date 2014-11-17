// ==UserScript==
// @name           Wing's Anime and Manga seeker
// @description    Adds links to searches for Anime and Manga
// @version        2.1
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
function ed2k_ADB() {
    var old_parseEpisodeData = function (xmldoc) {
        var root = xmldoc.getElementsByTagName('root').item(0);
        if (!root) return;
        //updateStatus('Processing anime episode(s)...');
        globalStatus.updateBarWithText('Processing anime episode(s)...', 0, 'Total progress: ');
        var animesNode = root.getElementsByTagName('animes')[0];
        if (!animesNode) return;
        var animeNodes = animesNode.getElementsByTagName('anime');
        for (var i = 0; i < animeNodes.length; i++) {
            if (animeNodes[i].parentNode.nodeName != 'animes') continue; // wrong node
            var aid = Number(animeNodes[i].getAttribute('id'));
            var epNodes = animeNodes[i].getElementsByTagName('ep');
            var filedataNodes = animeNodes[i].getElementsByTagName('filedata');
            var t1 = new Date();
            for (var k = 0; k < filedataNodes.length; k++)
                parseFiledata(filedataNodes[k], aid);
            var epNodestime = (new Date()) - t1;
            t1 = new Date();
            processingEps = true; // make the table creation wait
            for (var k = 0; k < epNodes.length; k++) {
                // if we are handling just one episode do stuff now otherwise defer execution
                var eid = Number(epNodes[k].getAttribute('id'));
                updateLoadingStatus(eid, 'parsing episode data', false);
                globalStatus.updateBarWithText('Processed ' + (k + 1) + ' episode(s)', Math.round((k + 1) / epNodes.length * 100), 'Total progress: ');
                parseEpisode(epNodes[k], aid);
                var episode = episodes[eid];
                if (!episode) continue;
                var eprow = document.getElementById('eid_' + episode.id);
                if (!eprow) {
                    errorAlert('parseEpisodeData', 'no episode row for eid: ' + episode.id);
                    continue;
                } // no episode row for some reason
                //copy all copy all ed2k
                var a_copy = getElementsByClassName(eprow.getElementsByTagName("td"), "episode", true)[0].getElementsByTagName('a')[0];
                a_copy.removeAttribute('href');
                a_copy.onclick = function () {
                    var curAnime = animes[aid];
                    var fileNodes = epNodes[0].getElementsByTagName('file');
                    var files = []
                    for (var i = 0; i < fileNodes.length; i++) {
                        var v = new CFileEntry(fileNodes[i]);
                        if (v.type == 'video')
                            files.push(v);
                    }
                    var getCen = function (f) {
                        if (f.isCensored)
                            return 0;
                        if (f.isUncensored)
                            return 1;
                        else
                            return -1;
                    };
                    var sorted = files.sort(function (a, b) {
                        return getCen(b) - getCen(a) || b.pixelarea - a.pixelarea || b.usersTotal - a.usersTotal;
                    });
                    console.log(sorted.map(function (v) {
                        return [getCen(v), v.pixelarea, v.usersTotal].join('_');
                    }));
                    GM_setClipboard(sorted.map(function (file) {
                        var ed2k_link = "ed2k://|file|" + curAnime.getTitle() + " " + episode.epno + " " + file.crc32 + "." + file.fileType + "|" + file.size + "|" + file.ed2k + "|/";
                        return ed2k_link.replace(/ /mgi, hashObj.spacesChar);
                    }).join('\n'));
                };
                a_copy.onclick();
                //end copy
                var a = getElementsByClassName(eprow.getElementsByTagName("td"), "expand", true)[0].getElementsByTagName('a')[0];
                if (a) a.onclick = foldEp;
                if (loadExpand) { // Normal behaviour
                    var eprowid = eprow.rowIndex + 1;
                    var tbRow = document.getElementById('eid_' + eid + '_ftHolder');
                    if (tbRow) {
                        var rmTable = tbRow.getElementsByTagName('table')[0];
                        if (rmTable) tbRow.cells[0].removeChild(rmTable);
                    }
                }
                if (!internalExpand) {
                    updateLoadingStatus(eid, 'creating file table', false);
                    createFileTable(episode);
                    document.getElementById('eid_' + episode.id + '_ftHolder').cells[0].className = '';
                }
            }
            processingEps = false;
            pseudoFilesCreator(); // create pseudo files
            if (loadExpand) loadExpand = false;
            if (seeTimes)
                alert('Processing...\n\tepNodes: ' + ((new Date()) - t1) + ' ms\n\tfiledataNodes: ' + epNodestime + ' ms');
        }
        // Little Hack for the expand all by group
        if (internalExpand) {
            // find file tables without files
            for (var e in episodes) {
                var episode = episodes[e];
                if (!episode) continue;
                forceFileTableRedraw(episode);
            }
        }
        //updateStatus('');
        globalStatus.updateBarWithText('Done.', 100, 'Total progress: ');
        globalStatus.clearAfterTimeout('globalStatus', 1000);
    }
    parseEpisodeData = old_parseEpisodeData;
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
            ed2k_ADB();
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
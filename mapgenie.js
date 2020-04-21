// ==UserScript==
// @name         mapgenie扩展工具
// @namespace    https://github.com/WingGao/MyUserScript
// @version      0.1
// @description  mapgenie扩展工具
// @author       WingGao
// @include      https://mapgenie.io/*
// @run-at      document-start
// @grant        GM_xmlhttpRequest
// @grant unsafeWindow
// @connect *
// @nocompat Chrome
// @require https://cdnjs.cloudflare.com/ajax/libs/qs/6.9.1/qs.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.15/lodash.min.js
// @require http://127.0.0.1:7113/utils.js
// ==/UserScript==
unsafeWindow.MyServer = 'http://127.0.0.1:7112'
unsafeWindow.Qs = Qs
unsafeWindow.WingJq = $
// 只支持firefox
unsafeWindow.addEventListener('beforescriptexecute',
  function (event) {
    let originalScript = event.target;

    // debug output of full qualified script url
    console.log('script detected:', originalScript.src);

    // script ends with 'originalscript.js' ?
    // you can test as well: '<full qualified url>' === originalScript.src
    if (originalScript.src.indexOf('/js/map.js') >= 0) {
      WingMain().then(()=>{
        let replacementScript = document.createElement('script');
        replacementScript.src = `${MyServer}/files/mapgenie.io_map.js`;
        originalScript.parentNode.replaceChild(replacementScript, originalScript);
      })
      // prevent execution of the original script
      event.preventDefault();
    }
  }
);

var WingMain = (function () {
  let paths = window.location.pathname.split('/')
  unsafeWindow.WingGameInfo = {
    Game: paths[1],
    MapName: paths[3],
  }
  // 查询已有数据
  // Object.defineProperty(window, 'user', {
  //   set: (u) => {
  //     window._user = u
  //   }, get: () => window._user,
  // });
  return new Promise(resolve => {
    $.getJSON(MyServer + '/api/wgw/mapgenie/location?' + window.Qs.stringify(WingGameInfo)).done(res => {
      console.log('my', res)
      if (res.total == 0) {
        // 同步到服务器
        console.log('同步location', _.size(user.locations))
        _.forEach(user.locations, (b, id) => {
          if (b) {
            $.post(MyServer + '/api/wgw/mapgenie/location', _.merge({
              LocationId: parseInt(id),
            }, WingGameInfo))
          }
        })
      } else {
        // 更新store
        let foundLocations = _.reduce(res.items, (r, v, k) => {
          r[v.LocationId] = true
          return r
        }, {})
        // store.getState().user.foundLocations = foundLocations
        user.locations = foundLocations
        user.hasPro = true
        resolve()
      }
    })
  })

  function alphabeticalSort(a, b) {
    return a.localeCompare(b);
  }

  function showPost(config) {
    let params = window.Qs.parse(location.search, { ignoreQueryPrefix: true })

    let item = {
      Host: location.host, Path: location.pathname, Search: window.Qs.stringify(params, { sort: alphabeticalSort }),
    }
    if (config.Search === false) item.Search = null
    console.log('showPost', item)
    $.post('')
  }

  function match() {
    for (let i = 0; i < readedSites.length; i++) {
      let site = readedSites[i]
      // 判断是否是文章页
      let postConfig = site.postMatcher(location.href)
      if (postConfig != null) {
        return showPost(postConfig)
      }
    }
  }

  // match()
})

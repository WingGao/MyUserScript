// ==UserScript==
// @name         已读工具
// @namespace    https://github.com/WingGao/MyUserScript
// @version      0.1
// @description  标记已读
// @author       WingGao
// @include      *
// @run-at document-end
// @grant        GM_xmlhttpRequest
// @connect *
// @require https://cdnjs.cloudflare.com/ajax/libs/qs/6.9.1/qs.min.js
// @require https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js
// @require http://pc.local:7113/utils.js
// ==/UserScript==

// 根据地址进入不同的配置
(function () {
  const MyServer = 'http://pc.local:7112'
  let readedSites = [
    {
      postMatcher: (postUrl) => {
        if (/tieba.baidu.com\/p\/\d+/.test(postUrl)) {
          return { Search: false }
        }
      },
    }
  ]

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

  match()
})()

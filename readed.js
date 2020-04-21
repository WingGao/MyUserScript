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
// @require https://cdnjs.cloudflare.com/ajax/libs/vue/2.6.11/vue.min.js
// @require http://pc.local:7113/utils.js
// ==/UserScript==

// 根据地址进入不同的配置
(function () {
  const MyServer = 'http://pc.local:7112'
  // $.ajaxSetup({
  //   xhr: function () {
  //     return new GM_XHR;
  //   }
  // });
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
    $.postJson(MyServer + '/api/wgw/readed/save', Object.assign({ Op: 'check' }, item)).done(res => {
      buildPostDom(res)
    }).fail(e => {
      // 不存在
      buildPostDom(item)
    })
  }

  function buildPostDom(item) {
    // language=vue
    $('body').append(`
      <div id="wing-read-pop">
        <button @click="markRead">{{item.ReadTime ? '已读':'标记已读'}}</button>
        <div class="notice">{{ notice }}</div>
      </div>`)
    const vmPop = new Vue({
      el: '#wing-read-pop',
      data: {
        item,
        notice: '',
      },
      methods: {
        markRead: () => {
          if (item.ReadTime) return //已读
          $.postJson(MyServer + '/api/wgw/readed/save', item).done(res => {
            vmPop.item.ReadTime = new Date().getTime()
          }).fail(e => {
            vmPop.notice = WingGetReqErr(e)
          })
        }
      }
    })
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

  function addStyle() {
    $('head').append(`<style>
#wing-read-pop {
position: absolute;
top: 10%;
right: 10%;
}
</style>`)
  }

  addStyle()
  match()
})()

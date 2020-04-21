function WingWaitElement(sel, cb) {
  let t = setInterval(() => {
    let dom = $(sel)
    if (dom.length) {
      clearInterval(t)
      cb(dom)
    }
  }, 300)
}

// Wrapper function
function GM_XHR() {
  this.type = null;
  this.url = null;
  this.async = null;
  this.username = null;
  this.password = null;
  this.status = null;
  this.headers = {};
  this.readyState = null;

  this.open = function (type, url, async, username, password) {
    this.type = type ? type : null;
    this.url = url ? url : null;
    this.async = async ? async : null;
    this.username = username ? username : null;
    this.password = password ? password : null;
    this.readyState = 1;
  };

  this.setRequestHeader = function (name, value) {
    this.headers[name] = value;
  };

  this.abort = function () {
    this.readyState = 0;
  };

  this.getResponseHeader = function (name) {
    return this.headers[name];
  };

  this.getAllResponseHeaders = function () {
    return this.headers
  }
  this.send = function (data, done) {
    this.data = data;
    var that = this;
    GM_xmlhttpRequest({
      method: this.type,
      url: this.url,
      headers: this.headers,
      data: this.data,
      onload: function (rsp) {
        // Populate wrapper object with all data returned from GM_XMLHttpRequest
        for (k in rsp) {
          that[k] = rsp[k];
        }
        that.response = rsp.response
        that.statusText = that.responseText = rsp.responseText //转换错误
        that.onload()
      },
      onerror: function (rsp) {
        for (k in rsp) {
          that[k] = rsp[k];
        }
        that.onerror()
      },
      onreadystatechange: function (rsp) {
        for (k in rsp) {
          that[k] = rsp[k];
        }
      }
    });
  };
};

// Tell jQuery to use the GM_XHR object instead of the standard browser XHR
if ($) {
  $.ajaxSetup({
    xhr: function () {
      return new GM_XHR;
    }
  });
  $.postJson = (url, data, cb) => {
    return $.post(url, data, cb, 'json')
  }
}

function WingGetReqErr(req) {
  try {
    let r = ''
    if (req.statusText) r = req.statusText
    let em = JSON.parse(r)
    return em
  } catch (e) {
    return r
  }
}

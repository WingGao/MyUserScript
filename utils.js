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

  this.send = function (data) {
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
      },
      onerror: function (rsp) {
        for (k in rsp) {
          that[k] = rsp[k];
        }
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
$ && $.ajaxSetup({
  xhr: function () {
    return new GM_XHR;
  }
});

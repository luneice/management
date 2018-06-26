/**
 * Created by luneice on 18-6-20.
 */
/* eslint-disable */

export default Request = function () {
  var inherit = Request.prototype;
  inherit.xhr = new XMLHttpRequest();
  // 请求前的准备
  var prepare = function(method, url) {
    inherit.xhr.open(method, url, true); // 强行异步请求
    inherit.xhr.setRequestHeader('Accept', '*/*');
    inherit.xhr.setRequestHeader('x-csrf-token', document.cookie ? document.cookie.match(/csrfToken=([0-9A-Za-z\-_]+)/)[1] : 'null');
    if (method === 'POST') {
      inherit.xhr.setRequestHeader('Content-Type', 'application/json');
    } else if (method === 'GET') {
      inherit.xhr.setRequestHeader('Content-Type', 'text/plain');
    }
    inherit.xhr.withCredentials = true;
  };

  // 状态改变时的函数监听
  var process = function(resolve, reject) {
    inherit.xhr.onreadystatechange = function(e) {
      if (this.readyState === 4) {
        if (this.status >= 200 && this.status < 400) {
          resolve(e.target.response);
        } else if (this.status >= 400) {
          reject(e.target.response);
        }
      }
    };
  };

  // 对象提供的 get 请求方法
  this.get = function(url, params) {
    var formatParams = function(params) {
      return '?' + Object.keys(params).map(function(key) {
        return key + '=' + encodeURIComponent(params[ key ]);
      }).join('&');
    };
    url += formatParams(params);
    prepare('GET', url);
    return new Promise((resolve, reject) => {
      process(resolve, reject);
      inherit.xhr.send();
    });
  };

  // 对象提供的 post 请求方法
  this.post = function(url, data) {
    prepare('POST', url);
    return new Promise((resolve, reject) => {
      process(resolve, reject);
      inherit.xhr.send(JSON.stringify(data));
    })
  };
}

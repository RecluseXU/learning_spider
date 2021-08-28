// 参考：https://developer.chrome.com/docs/extensions/reference/proxy/

function log(info) {
  // 日志函数
  document.getElementById('log').innerText += info + '\n'
}

function clearProxy() {
  const _clearProxy = function () {
    chrome.proxy.settings.set(
      {
        value: { mode: 'system' },
        scope: 'regular'
      },
      function () { },
    );
    return true
  }

  for (var times = 3; times > 0; times--) {
    if (_clearProxy()) {
      log('清理代理设置: 成功');
      return true
    } else {
      log('清理代理设置: 失败, 重试')
    }
  }
  log('清理代理设置: 放弃')
  return false
}

function _setProxy(proxyHost, proxyPort, proxyUsername, proxyPassword, scheme) {
  var config = {
    mode: "fixed_servers",
    rules: {
      singleProxy: {
        'scheme': scheme,
        'host': proxyHost,
        'port': parseInt(proxyPort),
      },
      bypassList: ['<local>']
    }
  };
  chrome.proxy.settings.set(
    { value: config, scope: "regular" },
    function () { }
  );
  // 代理认证相关
  // 参考：https://developer.chrome.com/docs/extensions/reference/webRequest/#onAuthRequired
  if (proxyUsername && proxyPassword) {
    function callbackFn(details) {
      return {
        authCredentials: {
          'username': proxyUsername,
          'password': proxyPassword,
        }
      };
    }
    chrome.webRequest.onAuthRequired.addListener(
      callbackFn,
      { urls: ["<all_urls>"] },
      ['blocking']
    );
  }
}

async function checkProxy() {
  // 检查当前ip
  var valid = false;
  try {
    await axios({
      url: 'https://www.baidu.com/',
      timeout: 5000,
    }).then((response) => {
      if (response.data.indexOf('百度')) { valid = true; }
    })
  } catch (err) { log(err) }
  return valid
}


proxy = {
  host: null,
  port: null,
  user: null,
  password: null,
}
async function setProxy(proxy) {
  log('设置代理: 开始')
  log(JSON.stringify(proxy))
  self.log('设置代理: 清理代理')
  clearProxy()
  _setProxy(proxy['host'], proxy['port'], proxy['user'], proxy['password'])
  self.log('设置代理: 检测代理')
  var valid = await checkProxy()
  if (valid) {
    log('设置代理：代理检测:有效代理')
    log('设置代理: 成功')
  } else {
    log('设置代理：代理检测:无效代理')
    log('设置代理: 失败')
  }
}

(() => {
  var params = {}
  var queries = window.location.search.slice(1).split('&');
  queries.forEach((param) => {
    var param = param.split('=');
    params[param[0]] = param[1];
  })
  if('host' in params && 'port' in params){
    setProxy(params)
  }
})()
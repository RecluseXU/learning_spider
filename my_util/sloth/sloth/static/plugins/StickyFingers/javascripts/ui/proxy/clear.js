
(() => {
  const logElement = document.getElementById('log')
  const log = function (info) {
    logElement.innerText += '\n' + info;
  }
  log('清理代理: 开始')
  const clearProxy = function () {
    chrome.proxy.settings.set(
      {
        value: { mode: 'system' },
        scope: 'regular'
      },
      function () { },
    );
    return true
  }
  var times = 3;
  while (times > 0) {
    if (clearProxy()) {
      log('清理代理: 成功');
      return true
    } else {
      logger.innerHTML = '清理代理: 失败, 重试';
    }
    times--;
  }
  logger.innerHTML = '清理代理: 失败, 放弃';
  return false
})()
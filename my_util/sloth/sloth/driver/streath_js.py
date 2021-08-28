# -*- encoding: utf-8 -*-
'''
@Time    :   2021-08-07
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   stealth.js 掩盖指纹的方式
'''

# here put the import lib
from selenium.webdriver.chrome.webdriver import WebDriver
from selenium.webdriver.chrome.options import Options
from selenium import webdriver

from typing import Dict
import os
from platform import system as platform_system
from random import randint
from hashlib import md5
from threading import Lock
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from sloth.plugins import Plugins

# 页面加载策略
DesiredCapabilities.CHROME['pageLoadStrategy'] = "eager"


BASE_PATH = os.path.dirname(os.path.dirname(__file__))
DRVIER_INIT_LOCK = Lock()


def _get_webdriver_path():
    system_type = platform_system().lower()
    if system_type == 'windows':
        driver_name = 'chromedriver.exe'
    elif system_type == 'linux':
        driver_name = 'chromedriver'
    return os.path.join(BASE_PATH, 'static/', driver_name)


def webdriver_default_option(
        options: Options = Options(),
        data_dir: str = None,
        headless: bool = True,
        proxy: Dict = None,
        debugger_port: int = None,
        ) -> Options:
    """對webdriver進行設置
    :param options: 設置對象
    :param data_dir: 數據存儲文件夾名
    :kwarg headless: 是否开始无头模式
    :kwarg proxy: {'host'：代理ip, 'port': str 代理端口}
        不可进行认证, 不可动态刷新, 非无头模式不建议使用
    :kwarg debugger_port: 調試端口, 通常仅在无头模式开启时使用
        本地调试可通过浏览器访问 http://localhost:调试端口/json/list
        获取 devtoolsFrontUrl 拼接访问调试无头浏览器
    """
    # experimental參數
    preferences = {
        # 不渲染圖片
        "profile.managed_default_content_settings.images": 2,
        # 關閉WebRTC
        "webrtc.ip_handling_policy": "disable_non_proxied_udp",
        "webrtc.multiple_routes_enabled": False,
        "webrtc.nonproxied_udp_enabled": False,
    }
    options.add_experimental_option("prefs", preferences)
    options.add_experimental_option('excludeSwitches', ['enable-automation'])
    options.add_experimental_option("useAutomationExtension", False)
    # argument參數
    if headless:
        options.add_argument('--headless')
    options.add_argument('disable-blink-features=AutomationControlled')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-gpu')
    options.add_argument('--window-position=217,172')
    options.add_argument('--window-size=1200,1000')
    options.add_argument('-ignore-certificate-errors')
    options.add_argument('-ignore -ssl-errors')
    options.add_argument('--allow-http-background-page')
    options.add_argument(
        'user-agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) \
         AppleWebKit/537.36 (KHTML, like Gecko) \
         Chrome/{}.0.3945.130 Safari/537.36"'.format(randint(13, 91)))
    options.add_argument('log-level=3')  # 日志相关
    # 代理（不可动态刷新,非无头模式不建议使用）
    if proxy:
        proxy_uri = f'http://{proxy["host"]}:{proxy["port"]}'
        options.add_argument(f'--proxy-server={proxy_uri}')
    # 缓存数据目录
    if data_dir:
        dir_path = os.path.join(BASE_PATH, 'temp', data_dir)
        options.add_argument(f'--user-data-dir={dir_path}')
    # 调试端口
    if debugger_port:
        options.add_argument(f'--remote-debugging-port={debugger_port}')
    # 插件加载(static/plugins目录下所有插件)
    if not headless:
        plugins = Plugins.load_local_plugins()
        plugins_path = ','.join([plugin['path'] for plugin in plugins])
        options.add_argument('--load-extension=' + plugins_path)
    return options


def webdriver_stealth_js(
        id: str, options: Options = None,
        ) -> WebDriver:
    """獲取webdriver
    :param id: 唯一標識
    :param port: 连接端口
        若端口未部署，则新开浏览器连接部署
        若端口已部署, 连接操作已有浏览器
    :param debugger_port: 调试端口
    :param options_func: 處理 Chrome Option 的函數
    """
    if not options:
        options = webdriver_default_option(
            data_dir=md5(str(id).encode('utf-8')).hexdigest(),
        )
    DRVIER_INIT_LOCK.acquire()
    driver = webdriver.Chrome(
        executable_path=_get_webdriver_path(),
        options=options,
        port=0,
    )

    # 執行 stealth.js 消除大部分指紋
    stealth_js_path = os.path.join(
        BASE_PATH, 'static/js/stealth.min.js')
    with open(stealth_js_path) as fp:
        stealth_jscode = fp.read()
    driver.execute_cdp_cmd(
        "Page.addScriptToEvaluateOnNewDocument",
        {"source": stealth_jscode},
    )

    # 附加
    # 插件附加
    plugins_note = Plugins.load_local_plugins()
    Plugins.load_plugins_id(driver, plugins_note)
    Plugins.create_plugins_instance(driver, plugins_note)

    DRVIER_INIT_LOCK.release()
    return driver

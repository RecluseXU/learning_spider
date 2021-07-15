# -*- encoding: utf-8 -*-
'''
@Time    :   2021-07-15
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   獲取webdriver, 加以掩盖指纹啓動
'''
# here put the import lib
from typing import Callable
from threading import Thread
from os import system
from os.path import exists, dirname
from script.chrome_webdriver_downloader import dl_chrome_web_driver
from selenium import webdriver
from selenium.webdriver.chrome.webdriver import WebDriver
from selenium.webdriver.chrome.options import Options


def webdriver_default_option(options: Options) -> Options:
    """對webdriver進行設置
    """
    # 设置为开发者模式，防止网站识别
    options.add_experimental_option('excludeSwitches', ['enable-automation'])
    # options.add_argument('--proxy-server={0}'.format(random.choice(proxy_list)))
    options.add_experimental_option("useAutomationExtension", False)
    # 消除webdriver痕迹
    options.add_argument("disable-blink-features=AutomationControlled")
    # options.add_argument('--headless')
    # options.add_argument('--no-sandbox')
    # options.add_argument('--disable-gpu')
    # prefs = {"profile.managed_default_content_settings.images": 2}
    # options.add_experimental_option("prefs", prefs)
    return options


def webdriver_stealth_js(options_func: Callable = webdriver_default_option
                         ) -> WebDriver:
    """獲取webdriver
    :param options_func: 處理 Chrome Option 的函數
    """
    folder_path = dirname(__file__)
    webdriver_path = folder_path + '/chromedriver.exe'

    # webdriver不存在則下載
    if not exists(webdriver_path):
        dl_chrome_web_driver()

    # options 創建並設置
    options = options_func(webdriver.ChromeOptions())

    # Selenium啓動
    driver = webdriver.Chrome(webdriver_path, options=options)
    # 加載 stealth_js 消除大部分指紋
    with open(folder_path + '/script/stealth.min.js', 'r') as fr:
        stealth_js = fr.read()
    driver.execute_cdp_cmd(
        "Page.addScriptToEvaluateOnNewDocument",
        {"source": stealth_js},
    )
    return driver


def webdriver_takeover(
    options_func: Callable = webdriver_default_option,
    chrome_path: str = 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    debugger_port: int = 9222,
) -> WebDriver:
    """命令行系統啓動Chrome，webdriver 接管
    :param options_func: 處理 Chrome Option 的函數
    :param chrome_path: 本地 Chrome.exe 的路徑
    :param debugger_port: Chrome 提供的調試端口
    """
    folder_path = dirname(__file__)
    webdriver_path = folder_path + '/chromedriver.exe'

    # webdriver不存在則下載
    if not exists(webdriver_path):
        dl_chrome_web_driver()

    # options 創建並設置
    options = options_func(webdriver.ChromeOptions())

    # 命令行系統啓動Chrome，webdriver 接管
    chrome_setting_path = '{}/AutomationProfile'.format(folder_path)
    options.add_experimental_option(
            "debuggerAddress", "127.0.0.1:{}".format(debugger_port))

    def start_chrome():
        """通过cmd命令启动一个chrome
        """
        cmd_command = (
            '"{}"'.format(chrome_path),
            '--remote-debugging-port={}'.format(debugger_port),
            '--user-data-dir="{}"'.format(chrome_setting_path),
        )
        cmd_command = '"{}"'.format(' '.join(cmd_command))
        system(cmd_command)
        print('cmd:', cmd_command)

    chrome_thread = Thread(target=start_chrome)
    chrome_thread.start()
    driver = webdriver.Chrome(webdriver_path, options=options)
    return driver


if __name__ == '__main__':
    # webdriver_stealth_js()
    webdriver_takeover()

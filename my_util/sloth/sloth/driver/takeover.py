# -*- encoding: utf-8 -*-
'''
@Time    :   2021-08-07
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   webdriver 接管操作系统启动的 Chrome
'''

# here put the import lib

from threading import Thread
from os import popen
from os.path import dirname, join as path_join
from platform import system as platform_system
from selenium import webdriver
from selenium.webdriver.chrome.webdriver import WebDriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from sloth.plugins import Plugins


BASE_PATH = dirname(dirname(__file__))
DesiredCapabilities.CHROME['pageLoadStrategy'] = "eager"


def _get_webdriver_path():
    system_type = platform_system().lower()
    if system_type == 'windows':
        driver_name = 'chromedriver.exe'
    elif system_type == 'linux':
        driver_name = 'chromedriver'
    return path_join(BASE_PATH, 'static/', driver_name)


def webdriver_takeover(
    chrome_path: str = 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    data_dir: str = 'Default',
    debugger_port: int = 26660,
) -> WebDriver:
    """命令行系統啓動Chrome，webdriver 接管
    :param chrome_path: 本地 Chrome.exe 的路徑
    :param debugger_port: Chrome 提供的調試端口
    :param data_dir: Chrome 保存數據的路徑
    """

    # 命令計算
    os_name = platform_system()
    if 'Windows' == os_name:
        command = '"{}" '.format(chrome_path)
    elif 'Linux' == os_name:
        command = 'google-chrome '
    else:
        raise Exception('Unknow OS:', os_name)
    # Chrome啓動參數
    # 參考：https://peter.sh/experiments/chromium-command-line-switches/
    command += ' '.join((
        '--remote-debugging-port={}'.format(debugger_port),
        '--no-sandbox',  # 关闭沙盒
        '--disable-gpu',  # 禁用GPU
        '--lang=zh-CN',  # 简体中文
        '--disable-webrtc',  # 禁用webrtc
        '--disable-popup-blocking'  # 允许弹出弹窗
    ))
    if data_dir:
        data_dir_path = path_join(BASE_PATH, 'temp', data_dir)
        command += f' --user-data-dir="{data_dir_path}"'

    # 插件读取
    plugins_note = Plugins.load_local_plugins()
    if plugins_note:
        plugin_arg = ','.join([note['path'] for note in plugins_note])
        command += f' --load-extension={plugin_arg}'

    if 'Windows' == os_name:
        command = "{}".format(command)

    def start_chrome(command):
        """通过cmd命令启动一个chrome
        """
        print('Command:', command)
        popen(command)

    chrome_thread = Thread(target=start_chrome, args=(command,))
    chrome_thread.start()
    # 命令行系統啓動Chrome，webdriver 接管
    options = webdriver.ChromeOptions()
    options.add_experimental_option(
        "debuggerAddress", f'127.0.0.1:{debugger_port}')
    driver = webdriver.Chrome(
        _get_webdriver_path(),
        options=options,
    )

    # 插件对象创建
    plugins_note = Plugins.load_plugins_id(driver, plugins_note)
    Plugins.create_plugins_instance(driver, plugins_note)
    return driver

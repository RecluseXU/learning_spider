#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   my_selenium.py
@Time    :   2020/07/19 15:12:54
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
'''

# here put the import lib
import os
from selenium import webdriver
from auto_dl_chrome_webdriver import check_chrome_version, dl_chrome_webdriver

selenium_webdriver_location = 'util/selenium/selenium_webdriver'


def _init_selenium_chrome_driver(lib_location: str, load_picture=True, headless=False):
    '''
    @summary: 配置selenium.webdriver   chrome
    @return: selenium.webdriver chrome
    '''
    chromedriver = lib_location + '/chromedriver.exe'
    drivePath = os.path.join(os.path.dirname(__file__), chromedriver)
    options = webdriver.ChromeOptions()
    # 禁止图片加载
    if not load_picture:
        prefs = {"profile.managed_default_content_settings.images": 2}
        options.add_experimental_option("prefs", prefs)
        # 不显示图片
        options.add_argument('--blink-settings=imagesEnabled=false')
    # 非沙盒模式
    options.add_argument('no-sandbox')
    # 无头模式
    if headless:
        options.add_argument('--headless')
    # header
    options.add_argument('user-agent="Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"')
    driver = webdriver.Chrome(executable_path=drivePath,
                              chrome_options=options)
    return driver


def get_selenium_chrome_web_driver(load_picture=True, headless=False):
    '''
    获取selenium chrome webdriver
    '''
    lib_location = selenium_webdriver_location
    if not os.path.exists(lib_location + '/chromedriver.exe'):
        chrome_version = check_chrome_version()
        print('chrome_version:', chrome_version)
        webdriver_version, webdriver_os_version = dl_chrome_webdriver(chrome_version, lib_location)
        print('chrome_webdriver:', webdriver_version, webdriver_os_version)
    return _init_selenium_chrome_driver('selenium_webdriver', load_picture, headless)


if __name__ == "__main__":
    web_driver = get_selenium_chrome_web_driver()
    web_driver.get('http://www.baidu.com/')
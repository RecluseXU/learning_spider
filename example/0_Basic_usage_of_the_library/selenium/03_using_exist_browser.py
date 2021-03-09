#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   03_using_exist_browser.py
@Time    :   2021-03-09
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   
    通过cmd命令启动chrome浏览器，再让Selenium接管已经打开的浏览器
    也许可以规避很多检查
'''

# here put the import lib
from os import system, path
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from threading import Thread


def start_chrome():
    '''
    通过cmd命令启动一个chrome
    '''
    chrome_path = '"C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"'
    chrome_setting_path = '{}/AutomationProfile'.format(path.dirname(__file__))
    cmd_command = '"{} --remote-debugging-port=9222 --user-data-dir="{}""'.format(chrome_path, chrome_setting_path)
    print(cmd_command)
    system(cmd_command)

# 由于执行cmd启动chrome会让程序一直等待chrome关闭，导致后续代码不运行，所以开线程打开
thread_ = Thread(target=start_chrome)
thread_.start()

chrome_options = Options()
chrome_options.add_experimental_option("debuggerAddress", "127.0.0.1:9222")
driver_path = '{}/BrowserDriver/chromedriver.exe'.format(path.dirname(__file__))
driver = webdriver.Chrome(driver_path, chrome_options=chrome_options)

driver.get('https://www.baidu.com')
print(driver.title)

driver.close()
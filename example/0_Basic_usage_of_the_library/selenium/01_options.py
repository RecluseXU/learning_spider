#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   01_mobile_setting.py
@Time    :   2021-03-09
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   多种启动设置
'''

# here put the import lib
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from os import path

driver_path = '{}/BrowserDriver/chromedriver.exe'.format(path.dirname(__file__))

options = webdriver.ChromeOptions()

# 禁止图片加载
prefs = {"profile.managed_default_content_settings.images": 2}
options.add_experimental_option("prefs", prefs)
options.add_argument('--blink-settings=imagesEnabled=false')  # 不显示图片

# 非沙盒模式
options.add_argument('no-sandbox')

# 代理
# options.add_argument('--proxy-server=' + proxy_server)

# 无头模式
# options.add_argument('--headless')

# header
options.add_argument('user-agent="Mozilla/5.0 (iPod; U; CPU iPhone OS 2_1 like Mac OS X; ja-jp) AppleWebKit/525.18.1 (KHTML, like Gecko) Version/3.1.1 Mobile/5F137 Safari/525.20"')

# 设置中文
options.add_argument('lang=zh_CN.UTF-8')

driver = webdriver.Chrome(
    executable_path=driver_path,
    chrome_options=options,
)

driver.close()
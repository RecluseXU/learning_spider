#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   02_mobile_option.py
@Time    :   2021-03-09
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   模仿手机设置启动
'''

# here put the import lib
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from os import path

driver_path = '{}/BrowserDriver/chromedriver.exe'.format(path.dirname(__file__))

options = webdriver.ChromeOptions()

# 中文
options.add_argument('lang=zh_CN.UTF-8')
# header
options.add_experimental_option(
    'mobileEmulation', 
    {
        'deviceMetrics':{
            'width': 320, 
            'height': 640, 
            'piexelRatio': 3.0, 
            'userAgent': 'Mozilla/5.0 (Linux; Android 4.1.1; GT-N7100 Build/JRO03C) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/35.0.1916.138 Mobile Safari/537.36 T7/6.3'
        }
    },
)
driver = webdriver.Chrome(executable_path=driver_path,
                            chrome_options=options)
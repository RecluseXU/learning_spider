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
import winreg
import requests
from requests.exceptions import RequestException
import xml.etree.cElementTree as ET
import difflib
import operator
import zipfile
import os


# 最终webdriver保存的路径，如果路径不存在，会报错
selenium_webdriver_location = 'my_util/auto_dl_chrome_webdriver/selenium_webdriver'


'''
下載相關
'''
def check_chrome_version() -> str:
    '''
    @summary: 从注册表中获取chrome 版本
    @return : chrome 版本号
    '''
    print('获取Chrome版本号')
    try:
        aReg = winreg.ConnectRegistry(None, winreg.HKEY_CURRENT_USER)
        aKey = winreg.OpenKey(aReg, r"Software\Google\Chrome\BLBeacon")
        data = winreg.QueryValueEx(aKey, "version")[0]
        return data
    except Exception as e:
        print(e)
        print('访问注册表失败，也许是因为没有安装chrome 或 没有权限访问')


def dl_chrome_webdriver(my_chrome_version: str, lib_location: str):
    '''
    @summary: 根据已经安装在电脑上的Chrome版本，在 http://chromedriver.storage.googleapis.com/index.html 把对应的webdriver下载下来
    @return: 版本相似度, 系统相似度
    '''
    def _get_most_similar_element(_xml: str, element_xpath: str, contrast: str):
        '''
        相似度计算
        '''
        element_list = ET.fromstring(_xml).findall(element_xpath)
        ratio = map(
            lambda x: difflib.SequenceMatcher(None, x.text, contrast).ratio(),
            element_list)
        max_index, max_number = max(enumerate(ratio), key=operator.itemgetter(1))
        return element_list[max_index], max_number

    # webdriver版本页
    sess = requests.session()
    sess.keep_alive = False
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:59.0) Gecko/20100101 Firefox/59.0',
        'Host': 'chromedriver.storage.googleapis.com',
        }
    url = 'http://chromedriver.storage.googleapis.com/?delimiter=/&prefix='
    try:
        response = sess.get(url, headers=headers)
    except RequestException as e:
        print(e)

    xml_info = response.content.decode('utf-8').replace(r"xmlns='http://doc.s3.amazonaws.com/2006-03-01'", '')
    print('解析chrome webdriver版本信息')
    aim_webdriver_version, wd_confidence_degree = _get_most_similar_element(xml_info, './CommonPrefixes/Prefix', my_chrome_version)
    print('最接近webdriver版本为:', aim_webdriver_version.text[:-1], '相似度:', wd_confidence_degree)

    # os版本页
    url = 'http://chromedriver.storage.googleapis.com/?delimiter=/&prefix=' + aim_webdriver_version.text
    try:
        response = sess.get(url, headers=headers)
    except RequestException as e:
        print(e)

    xml_info = response.content.decode('utf-8').replace(r"xmlns='http://doc.s3.amazonaws.com/2006-03-01'", '')
    print('解析chrome webdriver os 信息')
    aim_os_version, os_confidence_degree = _get_most_similar_element(xml_info, './Contents/Key', 'win')
    print('最接近os版本为:', aim_os_version.text, '相似度:', os_confidence_degree)

    # 下载webdriver
    print('下载chrome webdriver')
    url = 'http://chromedriver.storage.googleapis.com/' + aim_os_version.text
    try:
        response = sess.get(url, headers=headers)
    except RequestException as e:
        print(e)

    with open('dl_chrome_webdiver.zip', 'wb')as f:
        f.write(response.content)

    # 解压
    print('解压下载的压缩包')
    zip_file = zipfile.ZipFile('dl_chrome_webdiver.zip')
    zip_file.extractall(lib_location)
    zip_file.close()

    # 删除压缩包
    print('清理压缩包')
    os.remove("dl_chrome_webdiver.zip")
    return aim_webdriver_version.text, aim_os_version.text


'''
配置相關
'''


def _init_selenium_chrome_driver(lib_location: str, load_picture=True, headless=False, proxy_server=None):
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
        options.add_argument('--blink-settings=imagesEnabled=false')  # 不显示图片
    
    options.add_argument('no-sandbox')  # 非沙盒模式

    # 代理
    if proxy_server:
        options.add_argument('--proxy-server=' + proxy_server)
    
    # 无头模式
    if headless:
        options.add_argument('--headless')

    # header
    options.add_argument('user-agent="Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36"')
    driver = webdriver.Chrome(executable_path=drivePath,
                              chrome_options=options)
    return driver


def get_selenium_chrome_web_driver(load_picture=True, headless=False, proxy_server=None):
    '''
    获取selenium chrome webdriver
    '''
    lib_location = selenium_webdriver_location
    if not os.path.exists(lib_location + '/chromedriver.exe'):
        chrome_version = check_chrome_version()
        print('chrome_version:', chrome_version)
        webdriver_version, webdriver_os_version = dl_chrome_webdriver(chrome_version, lib_location)
        print('chrome_webdriver:', webdriver_version, webdriver_os_version)
    return _init_selenium_chrome_driver('selenium_webdriver', load_picture, headless, proxy_server)



if __name__ == "__main__":
    web_driver = get_selenium_chrome_web_driver()
    web_driver.get('http://www.baidu.com/')
#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   auto_dl_chrome_webdriver.py
@Time    :   2020/07/26 13:33:53
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
@description :   自动下载电脑对应selenium chrome webdriver 脚本，下载地址：http://chromedriver.storage.googleapis.com/index.html
'''

# here put the import lib
import winreg
import requests
from requests.exceptions import RequestException
import xml.etree.cElementTree as ET
import difflib
import operator
import zipfile
import os


requests.adapters.DEFAULT_RETRIES = 5


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
    print('清理下载')
    os.remove("dl_chrome_webdiver.zip")
    return aim_webdriver_version.text, aim_os_version.text

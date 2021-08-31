# -*- encoding: utf-8 -*-
'''
@Time    :   2021-07-14
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   windows下自动下载电脑已经安装的Chrome的webdriver
'''

# here put the import lib
from os.path import dirname
import winreg
import requests
import xml.etree.cElementTree as ET
import difflib
import operator
import zipfile
from tqdm import tqdm
from io import BytesIO
from typing import Callable


# 最终webdriver保存的路径，如果路径不存在，会报错
WEBDRIVER_FOLDER = dirname(__file__)


'''
下載相關
'''


def check_chrome_version() -> str:
    '''从注册表中获取chrome 版本
    @return : chrome 版本号
    '''
    print('获取Chrome版本号')
    try:
        aReg = winreg.ConnectRegistry(None, winreg.HKEY_CURRENT_USER)
        aKey = winreg.OpenKey(aReg, r"Software\Google\Chrome\BLBeacon")
        data = winreg.QueryValueEx(aKey, "version")[0]
        print('chrome_version:', data)
        return data
    except Exception as e:
        print(e)
        print('访问注册表失败，也许是因为没有安装chrome 或 没有权限访问')


class Crawler:
    """进行爬虫的类"""
    def __init__(self, baseurl: str) -> None:
        """初始化
        :baseurl str: 作为基本的url
        """
        self.session = requests.session()
        self.session.keep_alive = False
        self.session.headers = {
            'User-Agent': 'Mozilla/5.0 ' +
                          '(Windows NT 10.0; Win64; x64; rv:59.0) ' +
                          'Gecko/20100101 Firefox/59.0',
            'Host': 'chromedriver.storage.googleapis.com',
        }
        self.base_url = baseurl

    def spider(self, url: str):
        try:
            url = self.base_url + url
            print('Crawl: {}'.format(url))
            with self.session.get(url, timeout=15) as response:
                return response.content.decode('utf-8')
        except Exception as e:
            print(e)
            exit(1)

    def spider_stream(self, url: str, callback: Callable):
        try:
            with BytesIO() as file:
                url = self.base_url + url
                print('Crawl: {}'.format(url))
                with self.session.get(url, stream=True,
                                      timeout=20)as resp:
                    download_process_bar = tqdm(
                        total=float(resp.headers['content-length']),
                        initial=len(file.getvalue()),
                        unit_scale=True,
                    )
                    for chuck in resp.iter_content(chunk_size=1024):
                        file.write(chuck)
                        download_process_bar.update(1024)
                return callback(file)
        except Exception as e:
            print(e)
            exit(1)


def _dl_chrome_webdriver(my_chrome_version: str):
    '''根据已经安装在电脑上的Chrome版本。
    在 http://chromedriver.storage.googleapis.com/index.html 把对应的webdriver下载下来
    :param my_chrome_version: 电脑上安装的Chrome版本号
    '''
    def get_most_similar(_xml: str, element_xpath: str, contrast: str):
        '''相似度计算
        '''
        element_list = ET.fromstring(_xml).findall(element_xpath)
        ratio = map(
            lambda x: difflib.SequenceMatcher(None, x.text, contrast).ratio(),
            element_list)
        max_index, max_number = max(
            enumerate(ratio), key=operator.itemgetter(1))
        return element_list[max_index], max_number

    crawler = Crawler(baseurl='http://chromedriver.storage.googleapis.com')

    # webdriver版本页
    pattern = r"xmlns='http://doc.s3.amazonaws.com/2006-03-01'"
    xml_info = crawler.spider('/?delimiter=/&prefix=').replace(pattern, '')

    print('解析chrome webdriver版本信息')
    aim_webdriver_version, confidence = get_most_similar(
        xml_info, './CommonPrefixes/Prefix', my_chrome_version)
    aim_webdriver_version = aim_webdriver_version.text
    print('\t最接近 webdriver 版本为:{}\t相似度:{}'.format(
        aim_webdriver_version[:-1], confidence))

    # os版本页
    xml_info = crawler.spider('/?delimiter=/&prefix=' + aim_webdriver_version)
    xml_info = xml_info.replace(pattern, '')

    print('解析chrome webdriver os 信息')
    aim_os_version, confidence = get_most_similar(
        xml_info, './Contents/Key', 'win'
    )
    aim_os_version = aim_os_version.text
    print('\t最接近os版本为:{}\t相似度:{}'.format(aim_os_version, confidence))

    # 下载chrome webdriver
    print('下载chrome webdriver')

    def unzip_file(file):
        print('解压下载的压缩包')
        zip_file = zipfile.ZipFile(file)
        zip_file.extractall(WEBDRIVER_FOLDER)
        zip_file.close()

    crawler.spider_stream(url='/' + aim_os_version, callback=unzip_file)

    return aim_webdriver_version, aim_os_version


'''
配置相關
'''


def dl_chrome_web_driver() -> str:
    '''下載chrome webdriver
    :return : 返回webdriver路徑
    '''
    print('Start to download Chrome webdriver')
    chrome_version = check_chrome_version()
    webdriver_version, webdriver_os_version = _dl_chrome_webdriver(
        chrome_version,
    )
    print('webdriver version:{}\nwebdriver os version:{}'.format(
        webdriver_version, webdriver_os_version))
    print('Chrome webdriver download finish')

    return WEBDRIVER_FOLDER


if __name__ == "__main__":
    web_driver = dl_chrome_web_driver()

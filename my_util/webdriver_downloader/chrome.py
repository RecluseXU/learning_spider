# -*- encoding: utf-8 -*-
'''
@Time    :   2021-07-16
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   下载 Chrome Webdriver 脚本
http://chromedriver.storage.googleapis.com/index.html

1. 读取系统注册表中 Chrome 的版本信息
2. 根据版本信息， 下载对应的 Webdriver 压缩包
3. 解压压缩包，得到webdriver，删除压缩包
4. 尝试用刚下载的 webdriver 启动selenium
'''

# here put the import lib
from os.path import dirname, join as dirjoin
from os import popen
import re
import platform
import requests
import xml.etree.cElementTree as ET
import difflib
import operator
import zipfile
from tqdm import tqdm
from io import BytesIO
from typing import Callable, Tuple


# 最终webdriver保存的路径，如果路径不存在，会报错
WEBDRIVER_FOLDER = dirname(__file__)


class Crawler:
    """进行爬虫的类"""
    def __init__(self, baseurl: str) -> None:
        """初始化
        :param baseurl str: 作为基本的url
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

    def spider(self, url: str, callback: Callable):
        """ 基本爬虫
        :param url: 需要访问的子url
        :param callback: 回调函数，处理获取到的文本
        """
        url = self.base_url + url
        print('Crawl: {}'.format(url))
        try:
            with self.session.get(url, timeout=20) as response:
                return callback(response.content.decode('utf-8'))
        except Exception as e:
            print(e)
            exit(1)

    def spider_stream(self, url: str, callback: Callable):
        """ 基本爬虫
        """
        url = self.base_url + url
        print('Crawl: {}'.format(url))
        try:
            with self.session.get(url, stream=True, timeout=30)as resp:
                with BytesIO() as file:
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


def _dl_chrome_webdriver(my_chrome_version: str, os_mark: str):
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
            element_list,
        )
        max_index, max_number = max(
            enumerate(ratio), key=operator.itemgetter(1))
        return element_list[max_index], max_number

    crawler = Crawler(baseurl='http://chromedriver.storage.googleapis.com')

    # webdriver版本页
    pattern = r"xmlns='http://doc.s3.amazonaws.com/2006-03-01'"
    xml_info = crawler.spider(
        url='/?delimiter=/&prefix=',
        callback=lambda html: html.replace(pattern, ''),
    )
    print('\tParse Chrome Webdriver Version Page')
    aim_webdriver_version, confidence = get_most_similar(
        xml_info, './CommonPrefixes/Prefix', my_chrome_version)
    aim_webdriver_version = aim_webdriver_version.text
    print('\tMost likly Webdriver Version:{}\t Confidence:{}'.format(
        aim_webdriver_version[:-1], confidence))

    # os版本页
    xml_info = crawler.spider(
        url='/?delimiter=/&prefix=' + aim_webdriver_version,
        callback=lambda xml_info: xml_info.replace(pattern, ''),
    )

    print('\tParse Chrome Webdriver OS Page')
    aim_os_version, confidence = get_most_similar(
        xml_info, './Contents/Key', os_mark,
    )
    aim_os_version = aim_os_version.text
    print('\tMost likly Webdriver OS Version:{}\t Confidence:{}'.format(
        aim_os_version, confidence)
    )

    # 下载chrome webdriver
    def unzip_file(file):
        print('\tUnzip Downloaded File')
        with zipfile.ZipFile(file) as zip_file:
            zip_file.extractall(WEBDRIVER_FOLDER)

    crawler.spider_stream(url='/' + aim_os_version, callback=unzip_file)

    return aim_webdriver_version, aim_os_version


def check_chrome_version() -> Tuple[str, str]:
    '''获取chrome 版本
    :return : chrome 版本号, 系统简称
    '''
    try:
        system_type = platform.system().lower()
        driver_path, os_mark = None, None
        if system_type == 'windows':
            try:
                import winreg
                aReg = winreg.ConnectRegistry(None, winreg.HKEY_CURRENT_USER)
                aKey = winreg.OpenKey(aReg, r"Software\Google\Chrome\BLBeacon")
                version_mark = winreg.QueryValueEx(aKey, "version")[0]
                driver_path = dirjoin(WEBDRIVER_FOLDER, 'chromedriver.exe')
            except Exception:
                print('从注册表中获取Chrome信息失败')
            os_mark = 'win'
        elif system_type == 'linux':
            with popen('google-chrome --version')as pen:
                mark = pen.read()
            version_mark = re.search(r'(?<=Chrome )[0-9.]+', mark).group()
            os_mark = 'linux'
            driver_path = dirjoin(WEBDRIVER_FOLDER, 'chromedriver')

        if not driver_path:
            print('未知 Chrome 版本信息')
            version_mark = input('请手动输入Chrome版本号:')
        if not os_mark:
            print('未知 操作系统信息')
            os_mark = input('请手动输入系统(win/linux):')
        print('Chrome Version:', version_mark, 'OS:', os_mark)
        return version_mark, os_mark, driver_path
    except Exception as e:
        print(e)
        print('访问注册表或控制台失败，也许是因为没有安装chrome 或 没有权限访问')


def dl_chrome_web_driver() -> str:
    '''下載chrome webdriver
    :return: 返回webdriver路徑
    '''
    chrome_version, os_mark, driver_path = check_chrome_version()
    print('Start to download Chrome webdriver')
    webdriver_version, webdriver_os_version = _dl_chrome_webdriver(
        chrome_version, os_mark,
    )
    print('Chrome Webdriver download Finish')
    print('\t\t** Webdriver os version: {} **'.format(webdriver_os_version))
    print('\t\t** Webdriver Path: {} **'.format(driver_path))

    return driver_path


if __name__ == "__main__":
    web_driver = dl_chrome_web_driver()

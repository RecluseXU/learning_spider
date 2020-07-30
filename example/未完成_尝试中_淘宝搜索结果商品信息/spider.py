#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   spider.py
@Time    :   2020/07/27 20:06:08
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
@Desc    :   None
'''

# here put the import lib
import sys
sys.path.append(sys.path[0][:sys.path[0].find('example')-1])

from my_util.selenium.selenium_chrome import get_selenium_chrome_web_driver
from urllib.parse import quote
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait
from lxml import etree
import re
import json


class Goods(object):
    def __init__(self, id: str, title: str, url: str, image_url: str, price: float, volume: str, shop_name: str, shop_url: str, shop_location: str,
                 is_golden_seller: bool, is_fifteen_days_return: bool, is_new_product: bool, is_charity_product: bool, is_Tmall_product: bool,
                 is_global_shopping: bool):
        self.id = id  # data-nid
        self.title = title  # 商品标题
        self.url = url  # 商品url
        self.image_url = image_url  # 商品图片
        self.price = price  # 商品价格
        self.volume = volume  # 成交量
        self.shop_name = shop_name  # 店家名称
        self.shop_url = shop_url  # 店家url
        self.shop_location = shop_location  # 店家所在位置

        self.is_golden_seller = is_golden_seller  # 是否为金牌卖家
        self.is_fifteen_days_return = is_fifteen_days_return  # 是否有15天包退
        self.is_new_product = is_new_product  # 是否为当季新品
        self.is_charity_product = is_charity_product  # 是否为公益宝贝
        self.is_Tmall_product = is_Tmall_product  # 是否是天猫商品
        self.is_global_shopping = is_global_shopping  # 是否为全球购


def get_the_info(html: str):
    '''
    从网页中获取商品信息
    '''
    result = []
    root = etree.HTML(html)
    for item_element in root.xpath('//div[@id="mainsrp-itemlist"]/div/div/div[1]//div[@data-index]'):
        a_element = item_element.xpath('./div/div/div[@class="pic"]/a/@href')
        img_element = a_element.xpath('./img')
        result.append(Goods(
            id=a_element.xpath('./@data-nid'),
            title=img_element.xpath('./@alt'),
            url='https:' + a_element.xpath('./@href'),
            image_url='https:' + img_element.xpath('./@src'),
            price=a_element.xpath('./@trace-price'),
            volume=item_element.xpath('.//div[@class="deal-cnt"]/text()'),
            shop_name=item_element.xpath('.//div[@class="shop"]/a/span[2]/text()'),
            shop_url='https:' + item_element.xpath('.//div[@class="shop"]/a/@href'),
            shop_location=item_element.xpath('.//div[@class="location"]/text()'),
            is_golden_seller=True if item_element.xpath('.//span[@class="icon-service-jinpaimaijia"]') else False,
            is_fifteen_days_return=True if item_element.xpath('.//span[@class="icon-service-fuwu"]') else False,
            is_new_product=True if item_element.xpath('.//span[@class="icon-service-xinpin"]') else False,
            is_charity_product=True if item_element.xpath('.//span[@class="icon-fest-gongyibaobei"]') else False,
            is_Tmall_product=True if item_element.xpath('.//span[@class="icon-service-tianmao"]') else False,
            is_global_shopping=True if item_element.xpath('.//span[@class="icon-fest-quanqiugou"]') else False,)
        )
    page_num = int(root.xpath('//div[@id="mainsrp-pager"]//ul/li[@class="item active"]/span/text()'))
    have_next_page = True if root.xpath('//*[@id="mainsrp-pager"]//ul/li[@class="item next"]') else False
    return result, page_num, have_next_page


def operations(webdriver, keyword: str, page_num=0):
    result = []
    wait = WebDriverWait(webdriver, 20)

    webdriver.get('https://s.taobao.com/search?q=' + quote(keyword))
    page_max_num = wait.until(
        EC.element_located_to_be_selected((By.XPATH, '//div[@id="mainsrp-pager"]//ul/li[@class="item active"]/span')))
    page_max_num = re.findall('([0-9]+)', page_max_num.text)[0]

    have_next_page = True
    while have_next_page:
        # 等待商品元素加载
        try:
            wait.until(
                EC.visibility_of_element_located((By.XPATH, '//div[@id="mainsrp-itemlist"]/div/div/div/div[@data-index]'))
            )
        except TimeoutException:
            webdriver.refresh()
            webdriver.implicitly_wait(10)

        html = webdriver.page_source()
        info, page_num, have_next_page = get_the_info(html)
        print('正在爬取第{page_num}页')

        result.extend(info)

        # 点击下一页
        try:
            next_page_button = wait.until(
                EC.element_located_to_be_selected((By.XPATH, '//*[@id="mainsrp-pager"]//ul/li[@class="item next"]'))
                )
        except TimeoutException:
            webdriver.refresh()
            webdriver.implicitly_wait(10)
        finally:
            next_page_button.click()
    
    return result


def process(keyword: str):
    webdriver = get_selenium_chrome_web_driver()
    return operations(webdriver, keyword)


if __name__ == "__main__":
    result = process('胶袋')
    with open('example/简单_淘宝搜索结果商品信息/result.txt', 'w', encoding='utf-8')as f:
        for film in result:
            f.write(json.dumps(film.to_dict(), ensure_ascii=False) + '\n')

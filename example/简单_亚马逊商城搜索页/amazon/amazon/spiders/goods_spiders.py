#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   goods_spiders.py
@Time    :   2020/08/02 11:22:32
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
@Desc    :   None
'''

# here put the import lib
import scrapy
from amazon.items import AmazonItem
from urllib.parse import urljoin

class Spider_Goods(scrapy.Spider):
    '''
    N网怪物猎人世界 MOD记录 爬虫
    '''
    name = 'goods'
    allowed_domains = ['amazon.cn']
    start_urls = [r"https://www.amazon.cn/s?k=book&__mk_zh_CN=%E4%BA%9A%E9%A9%AC%E9%80%8A%E7%BD%91%E7%AB%99&ref=nb_sb_noss_2"]

    def parse(self, response):
        for _item in response.xpath('//div[@class="a-section a-spacing-medium"]'):
            try:
                good = AmazonItem()
                good['name'] = _item.xpath('./div/h2/a/span/text()').extract()[0]
                good['image'] = _item.xpath('./span/a/div/img/@src').extract()[0]
                good['url'] = 'www.amazon.cn' + _item.xpath('./div/h2/a/@href').extract()[0]

                price = _item.xpath('.//span[@data-a-color="price"]/span[not(@aria-hidden)]/text()')
                mutl_price = _item.xpath('.//div[@class="a-section a-spacing-medium"]//div/span[@class="a-color-price"]')
                good['price'] = price.extract()[0] if price else mutl_price.extract()[0]
                
                good['stars'] = _item.xpath('//div[@class="a-section a-spacing-medium"]/div/div/span/span/a/i/span/text()').extract()[0][:3]
                yield good
            except Exception as e:
                print(e)
                print(good)
        
        next_page = response.xpath('//div[@class="a-section a-spacing-none a-padding-base"]/div/ul/li[@class="a-last"]/a/@href')
        if next_page:
            url = urljoin('https://www.amazon.cn', next_page.extract()[0])
            yield scrapy.Request(url=url, callback=self.parse)
    
        

# -*- coding: utf-8 -*-
"""
Created on 2021-03-11 18:53:58
---------
@summary:
    抓糗事百科的案例
---------
@author: Administrator
"""

import feapder


class Spider(feapder.AirSpider):
    def start_requests(self):
        for page_num in range(1, 2):
            url = "https://www.qiushibaike.com/8hr/page/{}/".format(page_num)
            yield feapder.Request(url)

    def parse(self, request, response):
        articles = response.xpath('//li[@id]/div/a')
        for article in articles:
            title = article.xpath('./text()').extract_first()
            # 这里解析<a>的href，会留意到，此处的href已经是合并完整了的
            url = article.xpath('./@href').extract_first()  
            # 新的请求
            # 用法类似于scrapy
            # callback 为回调函数
            # 若是有其它需要传递的参数，直接写入即可，如title
            yield feapder.Request(url, callback=self.parse_detail, title=title)  
    
    def parse_detail(self, request, response):
        print('title:{}'.format(request.title))
        print('url:{}'.format(response.url))
        print('author:{}'.format(response.xpath('//*[@id="articleSideLeft"]/a/img/@alt').extract_first()))
        response.encoding_errors = 'ignore'  # 由于文章内容可能含有utf-8不能解析的字符，这里设置遇到不能解析字符就调过
        print('content:{}'.format(response.xpath('string(//div[@class="content"])').extract_first()))

if __name__ == "__main__":
    # Spider().start()
    Spider(thread_count=3).start()  # 设置3个线程来加快爬取速度
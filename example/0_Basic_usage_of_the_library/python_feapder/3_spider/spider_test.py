# -*- coding: utf-8 -*-
"""
Created on 2021-03-12 10:19:11
---------
@summary:
    Spider是一款基于redis的分布式爬虫，适用于海量数据采集，支持断点续爬、爬虫报警、数据自动入库等功能
---------
@author: Administrator
"""

import feapder

class SpiderTest(feapder.Spider):
    def start_requests(self):
        yield feapder.Request("http://httpbin.org/headers")

    def parse(self, request, response):
        yield response.text


if __name__ == "__main__":
    # redis_key为redis中存储任务等信息的key前缀
    spider = SpiderTest(redis_key="feapder:temp")
    spider.start()


    # debug模式
    # to_DebugSpider方法可以将原爬虫直接转为debug爬虫，然后通过传递request参数抓取指定的任务。
    # 通常结合断点来进行调试，bebug模式下，运行产生的数据默认不入库
    # spider = SpiderTest.to_DebugSpider(
    #     redis_key="feapder:temp", request=feapder.Request("http://www.baidu.com")
    # )
    # spider.start()

# -*- coding: utf-8 -*-
"""
Created on 2021-03-11 22:18:46
---------
@summary:
    AirSpider : 轻量爬虫，学习成本低。面对一些数据量较少，无需断点续爬，无需分布式采集的需求，可采用此爬虫。
                AirSpider不支持去重，因此配置文件中的去重配置无效
---------
@author: Administrator
"""

import feapder


class AirSpiderTest(feapder.AirSpider):
    __custom_setting__ = dict(  # 可以通过 __custom_setting__ 来配置内容，其优先级高于setting.py中的配置
        PROXY_EXTRACT_API="127.0.0.1:10808",
    )
    def start_requests(self):
        yield feapder.Request("http://httpbin.org/headers", download_midware=self.xxx)

    def parse(self, request, response):
        if response.code != 200:  # 框架支持重试机制，下载失败或解析函数抛出异常会自动重试请求
            raise Exception("非法页面")  # 默认最大重试次数为100次,可以通过配置文件setting.py进行修改
        print(response.text)
        

    def xxx(self, request):
        """
        自定义的下载中间件
        """
        request.headers = {'User-Agent':"lalala"}
        return request



if __name__ == "__main__":
    AirSpiderTest().start()
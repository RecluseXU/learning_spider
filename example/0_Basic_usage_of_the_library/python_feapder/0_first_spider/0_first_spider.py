# -*- coding: utf-8 -*-
"""
Created on 2021-03-11 18:28:57
---------
@summary:
---------
@author: Administrator
"""

import feapder
from feapder.network.response import Response


class FirstSpider(feapder.AirSpider):
    def start_requests(self):
        '''
        生产任务
        '''
        yield feapder.Request("https://www.baidu.com")

    def parse(self, request, response:Response):
        '''
        解析数据
        '''
        print(response)
        print(response.text)


if __name__ == "__main__":
    FirstSpider().start()
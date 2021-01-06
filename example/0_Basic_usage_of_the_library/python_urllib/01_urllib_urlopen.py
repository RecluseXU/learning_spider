#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   01_urllib_urlopen.py
@Time    :   2021-01-06
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   urllib是python进行网络请求的库，有不少更方便的库对这个库进行了二次封装
'''

# here put the import lib

import urllib.request


def load_data():
    url = "http://www.baidu.com/"
    # get 请求
    # http 请求
    # response:http响应的对象
    response = urllib.request.urlopen(url)
    print(response)
    # 读取内容 bytes类型
    data = response.read()
    print(data)
    # 将文件获取的内容转换为字符串
    # 一般返回的有两种类型 str和bytes类型
    # str->bytes  encode
    # bytes->str  decode
    str_data = data.decode("utf-8")
    print(str_data)

    return str_data


data = load_data()
with open("urllib/spider_resoult/01.html", "w") as f:
    f.write(data)

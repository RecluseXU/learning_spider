#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   2_2_response_info.py
@Time    :   2021-02-23
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   响应信息
'''

# here put the import lib
import httpx


def response_status_code():
    # 响应状态码
    r = httpx.get('https://httpbin.org/get')
    print(r.status_code)

    # 对于正常的响应，httpx有非常简单的判断方法
    is_ok = r.status_code == httpx.codes.OK
    print(is_ok)

    # 对于异常的响应，也有简易的抛出错误的方法
    # 这个方法若是响应正常，会返回None.若是出现问题，则会抛出对应错误
    r.raise_for_status()


def response_header():
    # 响应headers
    r = httpx.get('https://httpbin.org/get')
    print(r.headers)


response_status_code()
response_header()


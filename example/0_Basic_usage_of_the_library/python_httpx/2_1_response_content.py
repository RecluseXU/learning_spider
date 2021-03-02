#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   4_response_binary_content.py
@Time    :   2021-02-23
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   响应的二进制内容
'''

# here put the import lib
import httpx

def response_binary_content():
    # 程序会自动处理 gzip 和 deflate 压缩的响应
    # 如果安装了 brotlipy，那么 brotli 压缩的响应也能够处理
    r = httpx.get('https://www.example.org/')
    print(r.content)


def response_text_content():
    # 文本会自动识别编码
    r = httpx.get('https://www.example.org/')
    print(r.encoding)
    print(r.text)

    # 若是遇到没有编码声明的响应，则需要手动指定
    r.encoding = 'ISO-8859-1'
    print(r.text)


def response_json_content():
    # json响应，直接解析
    r = httpx.get('https://api.github.com/events')
    print(r.json())


response_binary_content()
response_text_content()
response_json_content()


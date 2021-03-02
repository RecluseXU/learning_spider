#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   7_post_request_data.py
@Time    :   2021-02-23
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   POST 请求数据传入
'''

# here put the import lib
import httpx


def send_form():
    # 发送表单数据
    data = {'key1': 'value1', 'key2': 'value2', 'key3': ['value3', 'value4']}
    r = httpx.post("https://httpbin.org/post", data=data)
    print(r.json()['form'])


def upload_file():
    # 上传文件
    files = {'upload-file': open('README.md', 'rb')}
    r = httpx.post("https://httpbin.org/post", files=files)
    print(r.text)


def upload_file_with_detail():
    # 上传的文件可以传入文件名和文件类型
    files = {'upload-file': ('README.md', open('README.md', 'rb'), 'text/plain')}
    r = httpx.post("https://httpbin.org/post", files=files)
    print(r.text)


def send_json():
    data = {'integer': 123, 'boolean': True, 'list': ['a', 'b', 'c']}
    r = httpx.post("https://httpbin.org/post", json=data)
    print(r.json())


def send_binary_data():
    content = b'Hello, world'
    header = {'Content-Type':'application/octet-stream'}
    r = httpx.post("https://httpbin.org/post", content=content, headers=header)
    print(r.json())


send_form()
upload_file()
upload_file_with_detail()
send_json()
send_binary_data()

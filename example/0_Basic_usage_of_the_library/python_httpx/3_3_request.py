#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   3_3_request.py
@Time    :   2021-03-01
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   显式创建Request
'''

# here put the import lib
import httpx


def request_base():
    request = httpx.Request("GET", "https://example.com")
    with httpx.Client() as client:
        response = client.send(request)


def request_and_client():
    headers = {"X-Api-Key": "...", "X-Client-ID": "ABC123"}

    with httpx.Client(headers=headers) as client:
        request = client.build_request("GET", "https://example.com")
        print(request.headers["X-Client-ID"])  # "ABC123"
        # 删除header中的一个项
        request.headers.pop("X-Api-Key")
        response = client.send(request)
        print(response.headers)

request_base()
request_and_client()

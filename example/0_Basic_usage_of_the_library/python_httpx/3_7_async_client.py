#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   3_7_async_client.py
@Time    :   2021-03-02
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   异步客户端与请求
'''

# here put the import lib
import httpx
import asyncio

async def async_client_base():
    async with httpx.AsyncClient() as client:
        # ScyncClient 拥有非常多和 Client 一样的请求函数,例如：
        #    AsyncClient.get(url, ...)
        #    AsyncClient.options(url, ...)
        #    AsyncClient.head(url, ...)
        #    AsyncClient.post(url, ...)
        #    AsyncClient.put(url, ...)
        #    AsyncClient.patch(url, ...)
        #    AsyncClient.delete(url, ...)
        #    AsyncClient.request(method, url, ...)
        #    AsyncClient.send(request, ...)
        r = await client.get('https://www.example.com/')
        print(r.headers)

asyncio.run(async_client_base())



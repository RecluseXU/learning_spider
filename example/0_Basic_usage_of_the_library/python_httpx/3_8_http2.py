# -*- encoding: utf-8 -*-
'''
@Time    :   2021-03-02
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   HTTP/2支持
'''

# here put the import lib
import httpx
import asyncio


async def http2_support():
    async with httpx.AsyncClient(http2=True) as client:
        r = await client.get('https://http2.akamai.com/demo/tile-227.png')
        print('状态：', r.status_code)
        print('协议：', r.http_version)

asyncio.run(http2_support())

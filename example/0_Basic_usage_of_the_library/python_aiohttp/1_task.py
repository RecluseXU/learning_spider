#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   task_aiohttp.py
@Time    :   2020-12-30
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   
    最好不要頻繁的創建session，盡可能多利用同一個session
'''

# here put the import lib
import aiohttp
import asyncio


headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; en-us) AppleWebKit/534.50 (KHTML, like Gecko) Version/5.1 Safari/534.50',
    'Host': 'www.baidu.com',
    'Pragma': 'no-cache',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-User': '?1',
    'Upgrade-Insecure-Requests':'1',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
}


async def get_baidu(session):
    url = 'http://www.baidu.com/'
    async with session.get(url=url, headers=headers, timeout=3) as resp:
        html =  await resp.text()
        return html[:60]

async def crawl_task():
    async with aiohttp.ClientSession() as session:
        tasks = [await get_baidu(session) for i in range(3)]
        for task in tasks:
            print(task)
        


if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    loop.run_until_complete(crawl_task())



#

#

#77722682-4527-452f-9a31-c2ea6c9f0c77
#https://www.sxkid.com/Article/Detail/d2aefebf-8429-4976-a419-0a44f5c90cd7

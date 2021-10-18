# -*- encoding: utf-8 -*-
'''
@File    :   task_aiohttp.py
@Time    :   2020-12-30
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   代理可以为Session设置, 也可以为单个请求设置
'''

# here put the import lib
import aiohttp
import asyncio


async def get_ip(session: aiohttp.ClientSession):
    url = 'http://httpbin.org/ip'
    proxy = 'http://your_proxy_url:your_proxy_port'
    proxy_auth = aiohttp.BasicAuth('your_user', 'your_password')
    async with session.get(
        url=url,
        proxy=proxy,
        proxy_auth=proxy_auth,
        timeout=3,
    ) as resp:
        html = await resp.text()
        return html


async def crawl_task():
    async with aiohttp.ClientSession() as session:
        tasks = [await get_ip(session) for i in range(3)]
        for task in tasks:
            print(task)


if __name__ == '__main__':
    loop = asyncio.get_event_loop()
    loop.run_until_complete(crawl_task())

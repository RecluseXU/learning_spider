#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   example_asyncio_and_requests.py
@Time    :   2020-11-09
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   异步,并发的requests
'''

# here put the import lib
import asyncio
import requests
from time import time


async def print_time(num):
    print('开始爬 {} ，时间{}'.format(num, float(time())))
    a = await get_bing()
    print('结束爬 {} ，时间{}'.format(num, float(time())))
    return a


async def get_bing():
    url = 'https://cn.bing.com/'
    headers = {
        'user_agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36'
    }
    with requests.get(url, headers=headers) as resp:
        await asyncio.sleep(2)
        return resp.status_code


async def get_all_bing():
    # create_task一创建就会执行
    # 无法返回数据，这种形式的
    tasks = [asyncio.create_task(print_time(t)) for t in range(4)]
    for i in tasks:
        await i
        print(i.result())


def main():
    loop = asyncio.new_event_loop()
    task = loop.create_task(get_all_bing())
    loop.run_until_complete(task)
    print(task.result())


if __name__ == '__main__':
    main()

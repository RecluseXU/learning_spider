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


async def get_baidu(sleep_time):
    url = 'https://www.baidu.com/'
    headers = {'user_agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.183 Safari/537.36'}
    with requests.get(url, headers=headers) as resp:
        # await asyncio.sleep(sleep_time)
        print('Task-sleep-{} {}'.format(sleep_time, resp.status_code))
        return sleep_time, resp.status_code
 

def main():
    loop = asyncio.get_event_loop()
    tasks=[get_baidu(t) for t in range(4, 0, -1)]
    loop.run_until_complete(asyncio.wait(tasks))
    loop.close()


if __name__ == '__main__':
    main()


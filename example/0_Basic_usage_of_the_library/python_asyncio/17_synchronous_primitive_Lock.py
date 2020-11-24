#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   17_synchronous_primitive_Lock.py
@Time    :   2020-11-24
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   同步原语-Lock
'''

# here put the import lib
import asyncio


async def using_toilet(toilet_lock, name:str):
    print('{} 尝试获取厕所使用权'.format(name))
    async with toilet_lock:
        print('{} 正在使用厕所'.format(name))
        await asyncio.sleep(4)
    print('{} 厕所使用完毕'.format(name))

async def using_toilet_without_lock(name:str):
    print('{} 尝试获取厕所使用权'.format(name))
    print('{} 正在使用厕所'.format(name))
    await asyncio.sleep(4)
    print('{} 厕所使用完毕'.format(name))

async def main():
    print('并行无锁')
    futures = asyncio.wait([
        using_toilet_without_lock(name)
        for name in ['DIO', 'JOJO', 'XISA']
    ])
    await asyncio.ensure_future(futures)

    print('\n并行有锁')
    toilet_lock = asyncio.Lock()
    futures = asyncio.wait([
        using_toilet(toilet_lock, name)
        for name in ['DIO', 'JOJO', 'XISA']
    ])
    await asyncio.ensure_future(futures)


asyncio.run(main())

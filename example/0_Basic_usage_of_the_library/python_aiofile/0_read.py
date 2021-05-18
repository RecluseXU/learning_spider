#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   0_read.py
@Time    :   2020-12-28
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   異步操作文件的第三方庫aiofile
'''

# here put the import lib
import aiofiles
import asyncio


async def test_stuff(filepath: str):
    async with aiofiles.open(filepath, mode='r', encoding='utf-8') as f:
        contents = await f.read()
    return contents


if __name__ == "__main__":
    path = 'example/0_Basic_usage_of_the_library/python_aiofile/test.txt'
    contents = asyncio.run(test_stuff(path))
    print(contents)

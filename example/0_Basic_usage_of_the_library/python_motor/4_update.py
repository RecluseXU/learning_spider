# -*- encoding: utf-8 -*-
'''
@Time    :   2021-06-09
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   改
'''

# here put the import lib
from motor.motor_asyncio import AsyncIOMotorClient
import asyncio


async def do_replace(collection):
    """ 替换一条记录
    """
    note = {'name': 'Git', 'url': 'https://github.com'}
    collection = client['temp']['temp']
    await collection.replace_one({'name': 'Google'}, note)

    new_document = await collection.find_one({'name': 'EvilRecluse'})
    print(new_document)


async def do_update_one(collection):
    """ 更新一条记录
    """
    note = {'name': 'bing', 'url': 'https://www.bing.com'}
    collection = client['temp']['temp']
    result = await collection.update_one({'name': '百度'}, {'$set': note})
    print(result)


client = AsyncIOMotorClient('mongodb://localhost:27017')
loop = asyncio.get_event_loop()
loop.run_until_complete(do_replace(client))
loop.run_until_complete(do_update_one(client))

# -*- encoding: utf-8 -*-
'''
@Time    :   2021-06-09
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   删除
'''

# here put the import lib
from motor.motor_asyncio import AsyncIOMotorClient
import asyncio


async def do_delete(client: AsyncIOMotorClient):
    """ 删除一条记录
    """
    collection = client['temp']['temp']
    result = await collection.delete_one({'name': '百度'})
    print(result)


async def do_delete_many(client: AsyncIOMotorClient):
    """ 删除多条记录
    """
    collection = client['temp']['temp']
    result = await collection.delete_many({})
    print(result)


client = AsyncIOMotorClient('mongodb://localhost:27017')
loop = asyncio.get_event_loop()
loop.run_until_complete(do_delete(client))
loop.run_until_complete(do_delete_many(client))

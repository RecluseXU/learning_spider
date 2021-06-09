# -*- encoding: utf-8 -*-
'''
@Time    :   2021-06-09
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   查

find_one 文档：https://motor.readthedocs.io/en/stable/api-asyncio/asyncio_motor_collection.html#motor.motor_asyncio.AsyncIOMotorCollection.find_one
find 文档：
'''

# here put the import lib
from typing import Dict
from motor.motor_asyncio import AsyncIOMotorClient
import asyncio


async def do_find_one(client: AsyncIOMotorClient) -> Dict:
    """ 查询获取一条记录
    """
    collection = client['temp']['temp']
    note = await collection.find_one({'name': 'EvilRecluse'})
    return note


async def do_find(client: AsyncIOMotorClient):
    """ 查询多条记录
    find()函数本身并不会产生I/O, 使用他仅会创建一个 AsyncIOMotorCursor 对象
    只有你调用对象的 to_list()函数 或 进行异步循环 才会执行
    """
    collection = client['temp']['temp']
    cursor = collection.find()
    for document in await cursor.to_list(length=100):
        print(document)

    # async for document in cursor:
    #     print(document)


async def do_count_document(client: AsyncIOMotorClient):
    """ 查询数量
    """
    collection = client['temp']['temp']
    n = await collection.count_documents({})
    print(f'{n} documents in collection')

client = AsyncIOMotorClient('mongodb://localhost:27017')
loop = asyncio.get_event_loop()
a = loop.run_until_complete(do_find_one(client))
print(a)
print('----------------')
loop.run_until_complete(do_find(client))
print('-----------------')
loop.run_until_complete(do_count_document(client))

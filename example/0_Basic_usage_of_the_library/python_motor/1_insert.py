# -*- encoding: utf-8 -*-
'''
@Time    :   2021-06-08
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   插入

insert_one 文档: https://motor.readthedocs.io/en/stable/api-asyncio/asyncio_motor_collection.html#motor.motor_asyncio.AsyncIOMotorCollection.insert_one
insert_many 文档: https://motor.readthedocs.io/en/stable/api-asyncio/asyncio_motor_collection.html#motor.motor_asyncio.AsyncIOMotorCollection.insert_many
'''

# here put the import lib
from motor.motor_asyncio import AsyncIOMotorClient
import asyncio


async def do_insert(collection):
    """ 插入一条记录
    """
    note = {'name': 'EvilRecluse', 'url': 'https://github.com/RecluseXU'}
    collection = client['temp']['temp']
    result = await collection.insert_one(note)
    print(result)


async def do_insert_many(collection):
    """ 插入多条记录
    """
    notes = [
        {'name': '百度', 'url': 'https://www.baidu.com'},
        {'name': 'Google', 'url': 'https://www.google.com'},
    ]
    collection = client['temp']['temp']
    result = await collection.insert_many(notes)
    print(result)


client = AsyncIOMotorClient('mongodb://localhost:27017')
loop = asyncio.get_event_loop()
loop.run_until_complete(do_insert(client))
loop.run_until_complete(do_insert_many(client))

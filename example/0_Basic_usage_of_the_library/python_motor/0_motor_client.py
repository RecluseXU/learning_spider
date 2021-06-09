# -*- encoding: utf-8 -*-
'''
@Time    :   2021-06-08
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   创建一个  AsyncIOMotorClient  对象开始

AsyncIOMotorClient 定义: https://motor.readthedocs.io/en/stable/api-asyncio/asyncio_motor_client.html#motor.motor_asyncio.AsyncIOMotorClient
AsyncIOMotorDatabase 定义: https://motor.readthedocs.io/en/stable/api-asyncio/asyncio_motor_database.html#motor.motor_asyncio.AsyncIOMotorDatabase
motor 的使用方法与 pymongo 非常相似
'''

# here put the import lib
from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase

# 可以通过传入参数来创建
# client = AsyncIOMotorClient('localhost', 27017)

# 可以通过传入URI来创建
client: AsyncIOMotorClient = AsyncIOMotorClient('mongodb://localhost:27017')
# 获取数据库对象
database: AsyncIOMotorDatabase = client['test_database']
# 获取集合对象
collection = database['test_collection']

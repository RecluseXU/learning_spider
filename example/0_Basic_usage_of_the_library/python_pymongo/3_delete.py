# -*- encoding: utf-8 -*-
'''
@Time    :   2021-06-08
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   删
'''

# here put the import lib
from pymongo import MongoClient
from pymongo.collection import Collection


connection: MongoClient = MongoClient('mongodb://localhost:27017')
collection: Collection = connection['temp']['temp']

# 删除一个文档
result = collection.delete_one({'name': 'EvilRecluse'})
print(result)

# 删除多个文档
result = collection.delete_many({'name': '知乎'})
print(result)

# 删除集合
result = collection.drop()
print(result)

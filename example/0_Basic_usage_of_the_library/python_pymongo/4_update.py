# -*- encoding: utf-8 -*-
'''
@Time    :   2021-06-08
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   改
'''

# here put the import lib
from pymongo import MongoClient
from pymongo.collection import Collection


connection: MongoClient = MongoClient('mongodb://localhost:27017')
collection: Collection = connection['temp']['temp']

# Collection.replace_one 修改一条记录
# Collection.replace_many 修改多条记录
result = collection.replace_one(
    {"name": "Google"},
    {
        "name": "DIO",
        "url": "The World"
    }
)
print(result)

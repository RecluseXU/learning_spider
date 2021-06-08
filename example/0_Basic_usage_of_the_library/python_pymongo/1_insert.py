# -*- encoding: utf-8 -*-
'''
@Time    :   2021-06-08
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   插入数据
'''

# here put the import lib
from pymongo import MongoClient
from pymongo.collection import Collection


connection: MongoClient = MongoClient('mongodb://localhost:27017')
collection: Collection = connection['temp']['temp']

# 如果插入的记录不包含 _id 字段，MongoClient 将自动 生成一个 ObjectId 作为此字段的值
# 插入操作会返回了一个 InsertOneResult 对象，它包括了 insert_id 属性表示被插入的文档的 _id


# insert_one 能插入单条记录
note = {"name": "EvilRecluse", "url": "https://evilrecluse.top/"}
result = collection.insert_one(note)
print(result.inserted_id)


# insert_many 能插入多条记录
mylist = [
  {"name": "知乎", "url": "https://www.zhihu.com"},
  {"name": "Github", "url": "https://www.github.com"},
  {"name": "Google", "url": "https://www.google.com"},
]
result = collection.insert_many(mylist)
print(result.inserted_ids)

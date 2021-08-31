# -*- encoding: utf-8 -*-
'''
@Time    :   2021-06-08
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   连接
'''

# here put the import lib
from pymongo import MongoClient
from pymongo.collection import Collection
from pymongo.database import Database


# 传入uri(若有不能作为uri的字符，则需要转码urllib.parse.quote_plus)
# uri：'mongodb://用户名:密码"@host:port/?其它参数'
# 其实可以通过参数来创建连接，但一般写uri
uri = 'mongodb://localhost:27017'
connection: MongoClient = MongoClient(uri)

# 通过连接对象, 访问指定名字的数据库对象
database: Database = connection['local']

# 通过数据库对象, 访问指定名字的集合对象
collection: Collection = database['startup_log']

# 查询一个结果
result = collection.find_one()
print(result)

# 关闭连接
connection.close()

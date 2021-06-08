# -*- encoding: utf-8 -*-
'''
@Time    :   2021-06-08
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   增
'''

# here put the import lib
from pymongo import MongoClient
from bson import ObjectId


connection: MongoClient = MongoClient('mongodb://localhost:27017')
collection = connection['local']['startup_log']

# 查询方法
# 集合对象查看find开头的方法既是所求，一般使用: find 查询多个结果 与 find_one 查询单个结果
# collection.find
# collection.find_one


# 实际上，查询所需要的参数都是 mongo查询 本身所定义的，而不是 pymongo所自定义的
# 基本上在 mongo命令行 里能够执行的命令，pymongo 会有方法对应


# filter
# 用于说明需要的数据的情况. 类似于SQL语句中WHERE对于结果的限定
# 可以进行逻辑判断，类型判断等操作
_filter = {'pid': 4444}  # pid的值为4444的记录
result = collection.find_one(_filter)
print(result)

# projection
# 用于设置返回记录所拥有的键
#   若指定某些键为1，则仅返回指定的键
#   若指定某些键位0, 则返回指定为0的键以外的键
#   若不加以指定，返回结果默认会带有 _id 这个键s
projection = {'_pid': 1, 'hostname': 1}
result = collection.find_one(_filter, projection)
print(result)
collection.find_one({'_id': ObjectId('EvilMass-1619315049192')})  # 根据_id查询时注意类型

# skip
# 用于跳过指定数量的查询结果
result = collection.find(_filter, projection, skip=1)
print(list(result))

# limit
# 用于限定返回结果的数量
result = collection.find(_filter, projection, limit=2)
print(list(result))


# collection.count_documents
# 用于统计结果数
result = collection.count_documents({'_pid': 4444})
print(result)

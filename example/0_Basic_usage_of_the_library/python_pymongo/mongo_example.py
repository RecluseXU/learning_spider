#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   my_mongodb.py
@Time    :   2021/6/4
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   MongoDB工具，为操作MonggoDB提供一些帮助
'''

# here put the import lib
from pymongo.mongo_client import MongoClient
from pymongo.collection import Collection
from bson.objectid import ObjectId
from urllib.parse import quote_plus
import logging
from threading import Lock
from functools import wraps


def singleton():
    """ 单例模式装饰器, 使用时需要注意__init__可能会被执行多次的问题
    使用方式@singleton()
    """
    lock = Lock()  # 闭包绑定线程锁

    def decorator(cls):
        """ 替换 __new__ 函数
        """
        instance_attr = '_instance'
        __origin_new__ = cls.__new__  # 获取原来的__new__函数 防止无限递归

        @wraps(__origin_new__)
        def __new__(cls_1, *args, **kwargs):
            if not hasattr(cls_1, instance_attr):
                with lock:
                    if not hasattr(cls_1, instance_attr):
                        setattr(cls_1, instance_attr, __origin_new__(cls_1, *args, **kwargs))
            return getattr(cls_1, instance_attr)
        cls.__new__ = __new__

        # 替换 __init__函数 原理同上
        init_flag = '_init_flag'
        __origin_init__ = cls.__init__

        @wraps(__origin_init__)
        def __init__(self, *args, **kwargs):
            if not hasattr(self, init_flag):
                with lock:
                    if not hasattr(self, init_flag):
                        __origin_init__(self, *args, **kwargs)
                        setattr(self, init_flag, True)
        cls.__init__ = __init__
        return cls
    return decorator


@singleton()
class MongoConnections:
    """ 管理Mongo连接，单例
    """
    _connections = {}

    def init_a_connection(self, connection_name: str, user_name: str, user_pwd: str, host: str,
                          port: str, auth='admin') -> MongoClient:
        """ 创建一个MongoDB连接
        :param connection_name MongoDB连接名称，作为字典Key标识每一个连接
        :param user_name 登录用户名
        :param user_pwd 登录密码
        :param host MongoDB服务地址
        :param port MongoDB服务端口
        :param auth 权限数据库
        """
        if connection_name not in self._connections:
            logging.debug(f'Init Mongo connection "{connection_name}"')
            _uri = f'mongodb://{quote_plus(user_name)}:{quote_plus(user_pwd)}@{host}:{port}/?authSource={auth}&readPreference=primary&appname=ZhihuSpider&ssl=false'
            connection = MongoClient(_uri)
            self._connections[connection_name] = connection
            logging.info(f'New Mongo connection "{connection_name}" init')
            return connection
        else:
            logging.warning(f'Mongo connection "{connection_name}" already exists')
            return self._connections[connection_name]

    def close_a_connection(self, connection_name: str) -> None:
        """ 关闭一个MongoDB连接
        :param connection_name MongoDB连接名称，作为字典Key标识每一个连接
        """
        if connection_name in self._connections:
            self._connections[connection_name].close()
            self._connections.pop(connection_name)
            logging.debug(f'Mongo connection "{connection_name}" closed')
        else:
            logging.error(f'Mongo connection "{connection_name}" does not exist')

    def close_all_connection(self) -> None:
        """ 关闭所有MongoDB连接
        :param connection_name MongoDB连接名称，作为字典Key标识每一个连接
        """
        for con_name in self._connections:
            self.close_a_connection(con_name)

    def get_a_connection(self, connection_name: str) -> MongoClient:
        """ 获取一个MongoDb连接
        :param connection_name MongoDB连接名称，作为字典Key标识每一个连接
        """
        if connection_name in self._connections:
            return self._connections[connection_name]
        else:
            logging.error(f'Mongo connection "{connection_name}" does not exist')


class Operations:
    @staticmethod
    def rename_field(collection: Collection, origin_field: str, new_field: str) -> None:
        """ 重命名 collection 中所有 document 存在的的某個字段的名称，其值不变
        """
        collection.update_many(
            {origin_field: {"$exists": True}},
            {'$rename': {origin_field: new_field}},
        )

    @staticmethod
    def delete_field(collection: Collection, field_name: str) -> None:
        """ 刪除 collection 中所有document存在的的某個字段
        """
        collection.update_many(
            {field_name: {"$exists": True}},
            {"$unset": {field_name: 1}},
        )

    @staticmethod
    def delete_duplicate_field(collection: Collection, key: str) -> None:
        """ 根据字段进行去重
        删除 collection 集合 中 key键 重复的记录
        只保留第一个找到的记录，余下的全部根据 _id 整个删除
        """
        _items = collection.find({}, {key: 1})
        exist_values = set(map(lambda x: x[key], _items))
        for exist_value in exist_values:
            _check = list(collection.find({key: exist_value}, {'_id': 1}))
            if len(_check) > 1:
                for delete_id in map(lambda x: ObjectId(x['_id']), _check[1:]):
                    collection.delete_one({'_id': delete_id})
                    logging.debug(f'delete {delete_id}')

    @staticmethod
    def update_document(collection: Collection, filter: dict, update_note: dict):
        ''' 根據傳入的内容更新數據
        '''
        return collection.update_one(filter, {'$set': update_note}).acknowledged

    @staticmethod
    def is_exist_document(collection: Collection, filter: dict):
        '''
        根據傳入的内容判斷對應記錄是否存在
        '''
        return True if collection.count(filter, limit=1) == 1 else False

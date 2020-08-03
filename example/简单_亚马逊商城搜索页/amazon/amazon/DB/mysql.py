#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   mysql.py
@Time    :   2020/08/02 14:46:35
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
@Desc    :   None
'''

# here put the import lib
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, String, Integer, Sequence, Float


# 创建对象的基类
Base = declarative_base()
# 初始化数据库连接
engine = create_engine(
    'mysql+mysqlconnector://crawler:zxc16v!!A85x@193.112.130.234:3306/crawl_data',
    encoding='utf-8'
    )
# 创建DBSession类型:
DBSession = sessionmaker(bind=engine)


class AmazonGoods(Base):
    # 表的名字:
    __tablename__ = 'amazon'
    # 表字符集
    __table_args__ = {'mysql_charset': 'utf8'}

    # 表的结构:
    url = Column(
        String(200), Sequence('url_seq'), nullable=False, primary_key=True, comment='商品url')
    name = Column(
        String(300), nullable=False, comment='商品名')
    price = Column(
        String(100), nullable=False, index=True, comment='价格')
    stars = Column(
        Float(), nullable=False, comment='评级')
    image = Column(
        String(128), comment='图片url')

    def __init__(self, **items):
        '''
        通过类属性的判断和设置，使item.AmazonGoods_DataItem转换到这个类型，以此完成初始化
        '''
        for key in items:
            if hasattr(self, key):
                setattr(self, key, items[key])


class Session_simple_holder(object):
    '''
    单例设定的数据库连接
    '''
    single_mysql_session = None

    @classmethod
    def get_session(self):
        '''
        获取一个mysql的session，单例模式
        '''
        if not self.single_mysql_session:
            self.single_mysql_session = DBSession()
        return self.single_mysql_session

    @classmethod
    def close_session(self):
        '''
        关闭mysql的session
        '''
        self.single_mysql_session.close()
        self.single_mysql_session = None

    @classmethod
    def reset_session(self):
        '''
        重置session
        '''
        self.single_mysql_session = DBSession()


class MysqlAmazonGoods(Session_simple_holder):
    @classmethod
    def delete_a_AmazonGoods_data_in_mysql(self, url: str):
        '''
        删除mysql数据库中的一个商品记录
        '''
        _session = self.get_session()
        try:
            old_data = _session.query(AmazonGoods).filter_by(url=url).first()
            if old_data:
                _session.delete(old_data)
                _session.commit()
        except Exception as e:
            print(e)
            self.reset_session()

    @classmethod
    def update_a_AmazonGoods_data_to_mysql(self, AmazonGoods: AmazonGoods):
        '''
        将MOD记录数据插入到mysql记录中
        '''
        _session = self.get_session()
        self.delete_a_AmazonGoods_data_in_mysql(AmazonGoods.url)
        try:
            _session.add(AmazonGoods)
            _session.commit()
        except Exception as e:
            print(e)
            self.reset_session()


def init_mysql_db():
    '''
    根据类创建数据库表，若表已经存在，则跳过
    '''
    Base.metadata.create_all(engine)


def drop_db():
    '''
    根据类删除数据库表
    '''
    Base.metadata.drop_all(engine)

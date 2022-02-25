# -*- encoding: utf-8 -*-
'''
@Time    :   2022-02-25
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   Handler基本使用方法

Handler 有很多种类, 可以参考官方文档
https://docs.python.org/zh-cn/3/library/logging.handlers.html

常见的处理器
  StreamHandler 屏幕输出
  FileHandler 文件记录
  BaseRotatingHandler 标准的分割文件日志
  RotatingFileHandler 按文件大小记录日志
  TimeRotatingFileHandler 按时间记录日志
'''

# here put the import lib
import logging
import os


logger = logging.getLogger('Sample Logger')


# 这里实例化一个将日志写入文件的 Handler
my_handler = logging.FileHandler(
    filename=os.path.join(os.path.dirname(__file__), '2.log'),
    mode='w',
    encoding='utf-8'
)
# Handler 可以设置日志等级
my_handler.setLevel(logging.INFO)
# Handler 需要需要添加到 Logger 中才能使用
logger.addHandler(my_handler)

logger.debug('DEBUG')
logger.info('INFO')
logger.warning('WARNING')
logger.error('ERROR')
logger.critical('CRITICAL')

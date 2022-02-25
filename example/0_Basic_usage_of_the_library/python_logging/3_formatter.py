# -*- encoding: utf-8 -*-
'''
@Time    :   2022-02-25
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   Formatter基本使用方法
'''

# here put the import lib
import logging
import os


logger = logging.getLogger('Sample Logger')
my_handler = logging.FileHandler(
    filename=os.path.join(os.path.dirname(__file__), '3.log'),
    mode='w',
    encoding='utf-8'
)
my_handler.setLevel(logging.INFO)

# 指定记录格式
# 特殊变量可以查看 logging.LogRecord 的属性, %(属性)s 即为所求
fmt = logging.Formatter(
    fmt='%(asctime)s %(levelname)s: %(message)s',  # 消息格式
    # 此处格式为: "时间 日志等级: 日志消息"
    datefmt='%Y/%m/%d %H:%M:%S',  # 日期格式
)
# Formatter是设定在 Handler 之上的
my_handler.setFormatter(fmt)

logger.addHandler(my_handler)


logger.debug('DEBUG')
logger.info('INFO')
logger.warning('WARNING')
logger.error('ERROR')
logger.critical('CRITICAL')

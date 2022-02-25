# -*- encoding: utf-8 -*-
'''
@Time    :   2022-02-25
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   Logger基本使用方法
'''

# here put the import lib
import logging

# 永远不要直接实例化 Logger
# 通过模块级别的函数 logging.getLogger(name)
# 相同的名字调用 getLogger() 会返回相同的 Logger 对象
logger = logging.getLogger('Sample Logger')
# 是否会将记录上抛到父级 Logger
logger.propagate = False
# 日志记录等级设置, 低于设置等级的日志不会记录
# CRITICAL > ERROR > WARNING > INFO > DEBUG > NOTSET
logger.setLevel(logging.INFO)

logger.debug('DEBUG')
logger.info('INFO')
logger.warning('WARNING')
logger.error('ERROR')
logger.critical('CRITICAL')

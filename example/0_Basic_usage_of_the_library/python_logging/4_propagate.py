# -*- encoding: utf-8 -*-
'''
@Time    :   2022-03-22
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   父子关系
'''

# here put the import lib
import logging


logging.basicConfig(
    level=logging.DEBUG,
    format='LoggerRoot: %(name)s:%(message)s',
)

logger_a = logging.getLogger('A')
logger_a.name = 'A'
handler = logging.StreamHandler()
fmt = logging.Formatter('LoggerA: %(name)s:%(message)s')
handler.setFormatter(fmt)
logger_a.addHandler(handler)

# 定义 Logger A 的子 Logger B
logger_b = logging.getLogger('A.B')
handler = logging.StreamHandler()
# Formatter是基于记录的内容是基于当前Logger的
# 上抛日志 %(name)s 依然会保持
fmt = logging.Formatter('LoggerB: %(name)s:%(message)s')
handler.setFormatter(fmt)
logger_b.addHandler(handler)

logger_b.info('你在淦神魔')
print('---------------------')
# Logger.propagate 控制日志是否向上抛
logger_b.propagate = False
logger_b.info('起飞')

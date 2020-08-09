#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   0.py
@Time    :   2020/08/08 23:14:45
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
@Desc    :   None
'''

# here put the import lib


def consume():
    while True:
        number = yield
        print('开始消费', number)


consumer = consume()  # 让初始化状态的consumer协程先执行起来，在yield处停止
next(consumer)

for num in range(100):
    print('开始生产', num)
    consumer.send(num)  # 发送数据给协程

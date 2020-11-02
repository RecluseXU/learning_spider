#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   01-basing.py
@Time    :   2020/11/02 10:22:50
@Author  :   EvilRecluse
@Contact :   evilrecluse@sxkid.com
@Desc    :   生成器本身就是类似于协程的一种形式，函数生成完一个结果后就停在原地，再次调用才再次执行
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

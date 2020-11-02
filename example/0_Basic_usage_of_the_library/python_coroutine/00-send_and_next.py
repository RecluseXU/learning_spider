#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   00-send_and_next.py
@Time    :   2920-11-2
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
@Desc    :   首先需要知道send函数与next函数的区别
'''

def process():
    print('开始')
    word = yield '你好'
    if word != '你好':
        print(word)
    yield '结束'

def next_with_send(t):
    # 创建生成器
    r = process()
    # 得到第一个结果,也就是'你好'
    a = next(r)
    print(a, end='')

    # 得到第二个结果，注意这两个获取方式的不同
    if t == 'send':
        # 使用send函数，传入的'世界'会返回到process函数yield '你好'的位置，并赋值给word变量
        a = r.send('世界')
    elif t == 'next':
        # 使用next函数，直接获取下一个结果
        a = next(r)

    # 由于send传入了返回的字符串，使word有了值，函数结果发生了改变，所以两者输出不同
    print(a)

# next_with_send('send')
next_with_send('next')

#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   0.py
@Time    :   2020年8月18日15:42:45
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
@Desc    :   None
'''


def get_ascii(text: str):
    for x in text:
        print(f'{x}', ord(x))


if __name__ == '__main__':
    get_ascii('Hello world')

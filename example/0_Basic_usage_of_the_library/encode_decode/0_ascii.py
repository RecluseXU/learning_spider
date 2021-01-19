#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   0.py
@Time    :   2021年1月11日
@Author  :   Recluse Xu
@Version :   1.1
@Contact :   444640050@qq.com
@Desc    :   ASCII 相关
'''


def char_to_ascii_num(text: str):
    for char in text:
        print(char, ord(char))

def ascii_num_to_char(char_num_list : str):
    for char_num in char_num_list:
        print(char_num, chr(char_num))

if __name__ == '__main__':
    char_to_ascii_num('Hello world')
    print('----------------')
    ascii_num_to_char([72, 101, 108, 108, 111, 32, 119, 111, 114, 114, 108, 100])

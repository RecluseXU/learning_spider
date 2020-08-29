#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   8_unicode.py
@Time    :   2020-8-29 00:21:05
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
@Desc    :   基础unicode操作
'''


def char_2_unicode_char(char: str) -> str:
    # 字符编码为unicode字符
    c = char.encode('unicode_escape')
    c = str(c)
    print(char, 'Unicode编码结果', c)
    return c


def unicode_char_2_char(unicode_char: str) -> str:
    # unicode字符解码为字符
    c = unicode_char.encode().decode('unicode_escape')
    print(unicode_char, 'Unicode编码结果', c)
    return c


def char_2_unicode_ret(a_char: str) -> int:
    # 得到一个字符的unicode 数值
    c = ord(a_char)
    print(a_char, '对应Unicode值', c)
    return c


def unicode_ret_2_char(a_ret: int) -> int:
    # 根据unicode 数值，得到一个字符
    c = chr(a_ret)
    print(a_ret, '对应字符', c)
    return c


def unicode_ret_2_unicode_char(a_ret: int):
    # 根据unicode 数值，得到一个unicode字符
    c = chr(a_ret).encode('unicode_escape')
    print(a_ret, '对应字符', c)
    return c


if __name__ == "__main__":
    c = '齤'
    char_2_unicode_char(c)
    unicode_char_2_char('\\u4f60\\u597d')

    char_2_unicode_ret(c[0])
    unicode_ret_2_char(38006)
    unicode_ret_2_unicode_char(38006)

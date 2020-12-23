#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   9_html.py
@Time    :   2020/08/27 12:05:58
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
@Desc    :   html转义相关操作
'''

# here put the import lib
import html


def htmlparser_2_str(html_str: str):
    _str = html.unescape(html_str)
    print(_str)
    return _str


def str_2_htmlparser(_str: str):
    html_str = html.escape(_str)
    print(html_str)
    return html_str


if __name__ == "__main__":
    a = htmlparser_2_str('&nbsp;&lt;&gt;')
    str_2_htmlparser(a)

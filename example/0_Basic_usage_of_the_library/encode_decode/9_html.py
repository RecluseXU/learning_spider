# -*- encoding: utf-8 -*-
'''
@Time    :   2020-08-27
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   html转义相关操作用例
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

#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   10_url.py
@Time    :   2020-12-22
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   URL编码
'''

# here put the import lib
from urllib.parse import quote, unquote


def url_quote(s):
    return quote(s, safe='')

def url_unquote(s):
    return unquote(s)

if __name__ == "__main__":
    print(url_quote('/'))
    print(url_unquote(r'%2F'))

    
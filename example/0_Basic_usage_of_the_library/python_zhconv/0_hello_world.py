# -*- encoding: utf-8 -*-
'''
@Time    :   2023-02-09
@Author  :   EvilRecluse
'''

# here put the import lib
from zhconv import convert


"""
zh-cn 大陆简体
zh-tw 台灣正體
zh-hk 香港繁體
zh-sg 马新简体（无词汇表，需要手工指定）
zh-hans 简体
zh-hant 繁體
"""
print(convert(u'我幹什麼不干你事。', 'zh-cn'))
print(convert(u'人体内存在很多微生物', 'zh-tw'))

# -*- encoding: utf-8 -*-
'''
@Time    :   2021-10-18
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   繁体简体转换
'''

# here put the import lib
from opencc import OpenCC

# 繁体 -> 简体
t_string = "人傻錢多速來"
s_string = OpenCC('t2s').convert(t_string)
print(s_string)

# 简体 -> 繁体
t_string = "人傻钱多速来"
s_string = OpenCC('s2t').convert(t_string)
print(s_string)


# 参数	含义
# s2t	简体到繁体
# t2s	繁体到简体
# s2tw	简体到台湾正体
# tw2s	台湾正体到简体
# s2hk	简体到香港繁体
# hk2s	香港繁体到简体
# s2twp	简体到繁体（台湾正体标准）并转换爲台湾常用词彙
# tw2sp	繁体（台湾正体标准）到简体并转换爲中国大陆常用词彙
# t2tw	繁体（OpenCC 标准）到台湾正体
# hk2t	香港繁体到繁体（OpenCC 标准）
# t2hk	繁体（OpenCC 标准）到香港繁体
# t2jp	繁体（OpenCC 标准，旧字体）到日文新字体
# jp2t	日文新字体到繁体（OpenCC 标准，旧字体）
# tw2t	台湾正体到繁体（OpenCC 标准）

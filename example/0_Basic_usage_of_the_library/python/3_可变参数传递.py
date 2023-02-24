# -*- encoding: utf-8 -*-
'''
@Time    :   2021-04-07
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   可变参数传递
'''


def speak(name, word):
    print(name, word)


# 字典传参
args = {
    'name': 'Tom',
    'word': 'OHHHHHHH',
}
speak(**args)


# 列表传参
args = ['Jerry', 'HAHAHA']
speak(*args)

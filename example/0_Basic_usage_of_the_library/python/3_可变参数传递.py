# -*- encoding: utf-8 -*-
'''
@Time    :   2021-04-07
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   
'''

# here put the import lib

def a(**kwargs):
    print(kwargs)
    b(**kwargs)

def b(name, word):
    print(name, word)

a(name='Tom', word='OHHHHHHH')
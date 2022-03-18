# -*- encoding: utf-8 -*-
'''
@Time    :   2022-03-18
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   默认参数使用会造成的问题

默认值只计算一次
默认值为 Mutable对象(可变对象) 时(列表、字典或类实例等), 可能会因为只计算一次而出现问题
'''

# here put the import lib


class Player:
    def __init__(self, name, items=[]) -> None:
        self.name = name
        self.items = items


p1 = Player('A')
p2 = Player('B')

p1.items.append('Sword')
p2.items.append('Armor')

print(p1.items)

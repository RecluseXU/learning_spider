# -*- encoding: utf-8 -*-
'''
@Time    :   2022-09-01
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   字典对象
字典对象是PyEnchant最重要的对象
用于 检查单词拼写 和 获取错误单词的修正建议
'''

# here put the import lib
import enchant


words = ['JOJO', 'cat', 'DIO', 'a']
# 通过语言标签创建字典对象
# 如果没传入标签会尝试通过系统信息获取对应标签(并不一定成功,不成功会报错)
d = enchant.Dict('en_US')
for word in words:
    # check方法用于检查单词拼写是否正确
    if d.check(word):
        print(f'{word}\tEnglish Word')
    else:
        print(f'{word}\tNot an English Word')
        # suggest方法用于对错误单词给出拼写建议
        mark = d.suggest(word)
        print(f'{word} Suggest: {mark}')

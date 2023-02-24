# -*- encoding: utf-8 -*-
'''
@Time    :   2022-09-01
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   语言标签
获取字典所需的参数
'''

# here put the import lib
import enchant


# 语言标签
# 获取所有可用语言标签
mark = enchant.list_languages()
print('可用语言标签:', mark)

# 检查对应语言标签的字典是否存在
tags = ['fake', 'en_US']
for tag in tags:
    print(f'语言标签 {tag} 是否存在', enchant.dict_exists(tag))

# 构造并返回一个新的字典对象
mark = enchant.request_dict('en_US')
print(mark)

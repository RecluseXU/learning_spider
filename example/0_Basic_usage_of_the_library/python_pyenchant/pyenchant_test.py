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


words = ['JOJO', 'cat', 'DIO', 'a', 'long']
# 通过语言标签创建字典对象
# 如果没传入标签会尝试通过系统信息获取对应标签(并不一定成功,不成功会报错)
d = enchant.Dict('en_US')
for word in words:
    if d.check(word):
        print(f'{word}\tEnglish Word')
    else:
        print(f'{word}\tNot an English Word')


# 检查对应语言标签的字典是否存在
is_fake_valid = enchant.dict_exists('fake')
is_en_valid = enchant.dict_exists('en_US')
print('Tag fake', is_fake_valid)
print('Tag en_US', is_en_valid)

# 构造并返回一个新的字典对象
mark = enchant.request_dict('en_US')
print(mark)

# 获取所有可用语言标签
mark = enchant.list_languages()
print('Valid Tags:', mark)

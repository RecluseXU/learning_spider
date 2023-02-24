# -*- encoding: utf-8 -*-
'''
@Time    :   2022-09-01
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   自定义字典

add(): store an unrecognised word in the user’s personal dictionary so that it is recognised as correct in the future.
remove(): store a recognised word in the user’s personal exclude list, so that it is identified as an error in the future.
add_to_session(): store an unrecognised word so that it will be recognised as correct while the Dict object is still in use.
store_replacement(): note that one word was used to replace another, meaning that it will appear higher in the list of suggestions in the future.
'''

# here put the import lib
import os
import enchant


# DictWithPWL方法可以生成字典，并添加自定义的字典内容
# 自定义的字典文件: 一行一个单词
BASE_PATH = os.path.dirname(__file__)
dictionary_filepath = os.path.join(BASE_PATH, 'user_dictionary.txt')
d = enchant.DictWithPWL('en_US', dictionary_filepath)
print('Check DIO', d.check('DIO'))

my_word = 'JOJO'
print(f'Check {my_word}', d.check(my_word))
# add方法可以添加自定义单词到字典中
d.add(my_word)
print(f'Check {my_word}', d.check(my_word))
# remove可以从字典中移除单词
d.remove(my_word)
print(f'Check {my_word}', d.check(my_word))

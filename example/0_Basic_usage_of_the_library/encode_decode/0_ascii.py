# -*- encoding: utf-8 -*-
'''
@Time    :   2021-01-11
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   ASCII 相关
'''

# here put the import lib


def char_to_ascii_num(text: str):
    for char in text:
        print(char, ord(char))


def ascii_num_to_char(char_num_list: str):
    for char_num in char_num_list:
        print(char_num, chr(char_num))


if __name__ == '__main__':
    char_to_ascii_num('Hello world')
    print('----------------')
    nums = [72, 101, 108, 108, 111, 32, 119, 111, 114, 114, 108, 100]
    ascii_num_to_char()

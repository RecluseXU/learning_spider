# -*- encoding: utf-8 -*-
'''
@Time    :   2020-08-18
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   MD5相关
'''

# here put the import lib

import hashlib


def get_string_md5(text: str):
    """计算字符串的md5值
    """
    m = hashlib.md5()
    m. update(text.encode("utf-8"))
    return m. hexdigest()


def get_file_md5(fname: str) -> str:
    """计算文件的md5值
    :param fname: 文件名
    """
    hash_md5 = hashlib. md5()
    with open(fname, "rb") as f:
        for chunk in iter(lambda: f. read(4096), b""):
            hash_md5.update(chunk)
    return hash_md5.hexdigest()


if __name__ == '__main__':
    print(get_string_md5('Hello world'))
    print(get_file_md5(__file__))

#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   0.py
@Time    :   2020年8月18日15:47:45
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
@Desc    :   None
'''
import hashlib


def get_string_md5(text):
    m = hashlib. md5()
    m. update(text.encode("utf-8"))
    print(m. hexdigest())


def get_file_md5(fname: str) -> str:
    """
    :param fname: 文件名
    """
    hash_md5 = hashlib. md5()
    with open(fname, "rb") as f:
        for chunk in iter(lambda: f. read(4096), b""):
            hash_md5.update(chunk)
    return hash_md5.hexdigest()


if __name__ == '__main__':
    get_string_md5('Hello world')

#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   3_unzip_files.py
@Time    :   2021-01-06
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   解压zip文件里的所有文件
'''

# here put the import lib
import zipfile

folder_path = 'example/0_Basic_usage_of_the_library/python_zipfile'
with zipfile.ZipFile('{}/helloworld.zip'.format(folder_path), 'r') as f:
    for file in f.namelist():  # f.namelist()返回列表，列表中的元素为压缩文件中的每个文件
        f.extract(file, '{}/unzip/'.format(folder_path))

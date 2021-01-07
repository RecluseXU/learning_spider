#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   1_zip_files.py
@Time    :   2021-01-06
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   压缩多个文件
    实际上就是写入东西到 ZipFile 对象中
    ZipFile 有两个方法可以将内容写到压缩文件中
    * write 传入文件路径，用于将已经存在的文件写入
    * writestr 直接写入新的内容

'''

# here put the import lib
import zipfile

folder_path = 'example/0_Basic_usage_of_the_library/python_zipfile'
with zipfile.ZipFile('{}/{}'.format(folder_path, 'helloworld.zip'), 'w') as f:
    f.write(
        # 已经存在的文件的路径
        filename='{}/example.txt'.format(folder_path),
        # 压缩文件中的文件路径
        arcname='a_folder/z.txt',
    )
    f.writestr(
        # 压缩文件中的文件路径
        zinfo_or_arcname='a.txt',
        # 文件数据，可写入 str类型 或 byte类型 数据
        #   如果传入str类型，默认会用 utf-8 进行编码写入
        data='Hello',
    )
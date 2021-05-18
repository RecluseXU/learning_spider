#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   0_hello_world.py
@Time    :   2021-01-06
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   zipfile是python官方用于对zip压缩文件文件进行操作的库
'''

# here put the import lib
import zipfile


zip_f = zipfile.ZipFile(
    # zip文件路径， 也可以传入ByteIO来承接
    file='example/0_Basic_usage_of_the_library/python_zipfile/helloworld.zip',
    # 模式，和open里的模式类似.
    # 'r' 来读取一个存在的文件   'w' 来截断并写入新的文件
    # 'a' 来添加到一个存在的文件 'x' 来仅新建并写入新的文件。如果 mode 为 'x' 并且 file 指向已经存在的文件,会报错
    mode='w',
    # 默认为True，是否使用Zip64创建扩展的zip文件。如果指定为False,且文件大于4GB，那么文件处理会报错
    allowZip64=False,
    # ZIP 压缩方法 可填入  ZIP_STORED, ZIP_DEFLATED, ZIP_BZIP2
    compression=zipfile.ZIP_DEFLATED,
    # 压缩级别，默认根据压缩方法自动计算。可以填入一个 0~9之间的整数 来设置
    # 数字越小，压缩速度越快，压缩率越低
    # 具体参考 https://docs.python.org/zh-cn/3/library/zlib.html#zlib.compressobj
    compresslevel=5,
)
# 创建一个 ZipFile 对象并不会立刻创建文件，只在执行其close方法时才创建
# 可以使用 with 来自动调用 close方法
zip_f.close()

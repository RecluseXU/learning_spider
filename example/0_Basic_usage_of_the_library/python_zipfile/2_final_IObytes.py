#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   2_finally.py
@Time    :   2021-01-06
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   你可以让它最后写入到内存中，而不是真正操作文件
'''

# here put the import lib
import zipfile
from io import BytesIO


# 可以用一个 BytesIO 来承接生成的zip文件二进制数据
with BytesIO() as content_bytes_io:
    with zipfile.ZipFile(content_bytes_io, 'w') as f:
        f.writestr(zinfo_or_arcname='a.txt', data='Hello')
    # 执行完毕后，压缩文件的二进制内容写在了 BytesIO 中了
    # 获取到数据可以进行网络传输之类的操作
    # 因为不真正进行IO，只在内存中操作，所以这个过程相当的快
    content_bytes_io.seek(0)
    the_zip_bytes = content_bytes_io.getvalue()  # 获取其中的bytes


with open('example/0_Basic_usage_of_the_library/python_zipfile/helloworld.zip', 'wb') as f:
    f.write(the_zip_bytes)
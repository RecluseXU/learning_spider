#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   0_hello_world.py
@Time    :   2020/07/28 17:57:16
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
@Desc    :   tesserocr路径下不能有中文，否则会报错
'''

# here put the import lib
import tesserocr

from PIL import Image


img = Image.open(r'example/0_Basic_usage_of_the_library/tesserocr/pic/0_hello_world.png')
chars = tesserocr.image_to_text(img)
print(chars)
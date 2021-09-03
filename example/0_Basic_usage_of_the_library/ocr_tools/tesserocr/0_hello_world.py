#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@Time    :   2020/07/28
@Author  :   Recluse Xu
@Contact :   https://github.com/RecluseXU
@Desc    :   tesserocr路径下不能有中文，否则会报错
'''

# here put the import lib
import tesserocr
from PIL import Image

img_path = 'example/0_Basic_usage_of_the_library/ocr_tools/img/0.png'
img = Image.open(img_path)
chars = tesserocr.image_to_text(img)
print(chars)

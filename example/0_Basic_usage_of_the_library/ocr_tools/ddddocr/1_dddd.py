# -*- encoding: utf-8 -*-
'''
@Time    :   2021-07-19
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   ddddocr https://github.com/sml2h3/ddddocr
'''

# here put the import lib
import ddddocr
import os


ocr = ddddocr.DdddOcr()
img_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'img')
img_path = os.path.join(img_dir, 'image.jpg')
with open(img_path, 'rb') as f:
    img_bytes = f.read()

res = ocr.classification(img_bytes)

print(res)

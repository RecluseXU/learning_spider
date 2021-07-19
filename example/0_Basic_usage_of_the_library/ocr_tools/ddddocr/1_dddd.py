# -*- encoding: utf-8 -*-
'''
@Time    :   2021-07-19
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   ddddocr https://github.com/sml2h3/ddddocr
'''

# here put the import lib
import ddddocr

ocr = ddddocr.DdddOcr()
img_path = 'example/0_Basic_usage_of_the_library/ocr_tools/img/1.jpg'
with open(img_path, 'rb') as f:
    img_bytes = f.read()

res = ocr.classification(img_bytes)

print(res)

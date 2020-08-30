#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   main.py
@Time    :   2020-8-29 21:12:52
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
@Desc    :   
'''

# here put the import lib
import matplotlib.pyplot as plt
import numpy as np
from fontTools.ttLib import TTFont
from fontTools.pens import pointPen
from io import BytesIO
import re
import base64
import tesserocr
from PIL import Image


work_folder = 'F:/Workspace/learning_spider/my_util/font_encryption_detective/'


class FontDetective(object):
    def __init__(self, font):
        '''
        生成字体，保存字体ttf，保存字体ttx，记录cmap
        '''
        ttf = TTFont(BytesIO(font))
        ttf.save(work_folder + '58_fangchan_secret_font.ttf')
        ttf.saveXML(work_folder+'buffer_font.xml')

        cmap = ttf.getBestCmap()
        convert_uh2val_dict = {}
        for _key, _val in cmap.items():
            _key = hex(_key)
            convert_uh2val_dict[_val] = _key[2:]
        self.cmap = convert_uh2val_dict
        print(convert_uh2val_dict)

    def get_img_list(self):
        with open(work_folder+'buffer_font.xml', 'r')as f:
            _font = f.read()

        glyphs_dict = {}
        pattern = re.compile(r'<TTGlyph name="(.*?)" xMin=[\s\S]+?>([\s\S]+?)</TTGlyph>')
        pattern_t = re.compile(r'<contour>([\s\S]+?)</contour>')
        pattern_x = re.compile(r'<pt x="(.*?)" y=')
        pattern_y = re.compile(r'y="(.*?)" on=')
        for glyph in re.findall(pattern, _font):
            contour_list = []
            for contour in re.findall(pattern_t, glyph[1]):
                x = [int(i) for i in re.findall(pattern_x, contour)]
                x.append(x[0])
                y = [int(i) for i in re.findall(pattern_y, contour)]
                y.append(y[0])
                contour_list.append({'x': x, 'y': y})
            glyphs_dict[self.cmap[glyph[0]]] = contour_list
        # print(glyphs_dict)

        for glyph, contours in glyphs_dict.items():
            fig = plt.figure()
            plt.axis('off')
            for contour in contours:
                plt.plot(contour['x'], contour['y'], linewidth=10)
            canvas = fig.canvas

            buffer = BytesIO()
            canvas.print_png(buffer)
            data = buffer.getvalue()
            buffer.close()

            glyphs_dict[glyph] = data
            with open(work_folder + 'img/' + glyph + '.png', 'wb')as f:
                f.write(data)
            plt.cla()
        self.glyphs_dict = glyphs_dict
        return glyphs_dict

    def get_real_char_value(self):
        for unicode_c, img_bin in self.glyphs_dict.items():
            img = Image.open(BytesIO(img_bin))
            chars = tesserocr.image_to_text(img)
            print(unicode_c, chars)

    def get_html_convert_dict(self):
        pass


if __name__ == "__main__":
    a = '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'
    font_info = base64.b64decode(a)
    f = FontDetective(font_info)
    f.get_img_list()
    f.get_real_char_value()




# -*- encoding: utf-8 -*-
'''
@Time    :   2021-11-07
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   字体对象画图
'''

# here put the import lib

from __future__ import print_function, division, absolute_import
from io import BytesIO
from typing import Dict
from fontTools.ttLib import TTFont
from fontTools.pens.basePen import BasePen
from reportlab.graphics.shapes import Path
from reportlab.graphics import renderPM
from reportlab.graphics.shapes import Group, Drawing


class ReportLabPen(BasePen):
    """A pen for drawing onto a reportlab.graphics.shapes.Path object."""

    def __init__(self, glyphSet):
        BasePen.__init__(self, glyphSet)
        self.path = Path()

    def _moveTo(self, p):
        (x, y) = p
        self.path.moveTo(x, y)

    def _lineTo(self, p):
        (x, y) = p
        self.path.lineTo(x, y)

    def _curveToOne(self, p1, p2, p3):
        (x1, y1) = p1
        (x2, y2) = p2
        (x3, y3) = p3
        self.path.curveTo(x1, y1, x2, y2, x3, y3)

    def _closePath(self):
        self.path.closePath()


def get_font_image_map(font: TTFont) -> Dict[str, bytes]:
    """将字体文件中的字符画成图片, 返回对应内容
    :param font: 字体对象
    :return: {字符轮廓名: 所画出来的图片}
    """
    font_image_map = {}
    glyph_set = font.getGlyphSet()
    glyphNames = font.getGlyphNames()
    for glyph_name in glyphNames:
        if glyph_name[0] == '.':  # 跳过'.notdef', '.null'
            continue
        glyph = glyph_set[glyph_name]
        pen = ReportLabPen(glyph_set)
        glyph.draw(pen)
        img_width = glyph.width if glyph.width else 512
        img_height = glyph.height if glyph.height else 2 * img_width
        g = Group(pen.path)
        g.translate(0, 0)
        d = Drawing(width=img_width, height=img_height)
        d.add(g)
        pil_image = renderPM.drawToPMCanvas(d).toPIL()
        with BytesIO() as temp_bytes_io:
            pil_image.save(temp_bytes_io, format='png')
            image = temp_bytes_io.getvalue()
        font_image_map[glyph_name] = image
    return font_image_map


if __name__ == '__main__':
    import os
    base_path = os.path.dirname(__file__)
    font_file_path = os.path.join(base_path, 'fonts/china_cn_icomoon.ttf')
    image_path = os.path.join(base_path, 'img')
    for name, img in get_font_image_map(TTFont(font_file_path)).items():
        with open(f'{base_path}/img/{name}.png', 'wb')as f:
            f.write(img)

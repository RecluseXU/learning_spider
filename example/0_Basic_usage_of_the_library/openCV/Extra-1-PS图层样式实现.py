#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   extra-PS图层样式实现.py
@Time    :   2020/10/29 14:58:13
@Author  :   EvilRecluse
@Contact :   evilrecluse@sxkid.com
@Desc    :   只是单纯的实现类似的效果
'''

# here put the import lib
import cv2 as cv
import numpy as np


def show_img(img_name: str, src):
    '''
    展示图片
    '''
    cv.namedWindow(img_name, cv.WINDOW_AUTOSIZE)
    cv.imshow(img_name, src)

def create_simple_img(height:int, width:int):
    '''
    造一张图片
    '''
    src = np.zeros([height, width], np.uint8)
    return src

def limit_0(src):
    '''
    遍历，如果有小于0的改回0
    '''
    for _channel_value in np.nditer(src, op_flags=['readwrite']):
        if _channel_value < 0:
            _channel_value[...] = 0
    return src

def limit_255(src):
    '''
    遍历，如果有大于255的改回255
    '''
    for _channel_value in np.nditer(src, op_flags=['readwrite']):
        if _channel_value > 255:
            _channel_value[...] = 255
    return src

def limit_0_255(src):
    '''
    遍历，如果有大于255的改回255,如果小于0则改回0
    '''
    for _channel_value in np.nditer(src, op_flags=['readwrite']):
        if _channel_value > 255:
            _channel_value[...] = 255
        elif _channel_value < 0:
            _channel_value[...] = 0
    return src

def traverse_calculate_value(src1, src2, calculate_func):
    '''
    遍历两个图的值进行计算
    '''
    height, width = src1.shape[:2]
    for cow in range(height):
        for col in range(width):
            for _channel in range(3):
                a, b = src1[cow, col, _channel], src2[cow, col, _channel]
                src1[cow, col, _channel] = calculate_func(a, b)
    return src1
#----------------------------------------------------------

def photoshop_Transparent(src1, src2, alpha: float):
    '''
    图层透明度
    实际上，只是各自降低然后混合
    '''
    mix_src = alpha * src1 + (1 - alpha) * src2
    cv.imwrite(RESULT_LOC + "0-Transparent.png", mix_src)

def photoshop_Multiply(src1, src2):
    '''
    正片叠底
    将两个颜色的像素值相乘，然后除以255得到的结果就是最终色的像素值。
    通常执行正片叠底模式后的颜色比原来两种颜色都深。
    任何颜色和黑色正片叠底得到的任然是黑色，任何颜色和白色执行正片叠底则保持原来的颜色不变，而与其他颜色执行此模式会产生暗室中以此种颜色照明的效果。
    '''
    dst = src1/ 255 * src2  # 由于是uint8，上限是255，如果先乘，会丢失精度
    cv.imwrite(RESULT_LOC + "1-Multiply.png", dst)

def photoshop_Screen(src1, src2):
    '''
    滤色
    作用结果和正片叠底刚好相反
    通常执行滤色模式后的颜色都较浅。
    任何颜色和黑色执行滤色，原色不受影响;
    任何颜色和白色执行滤色得到的是白色；而与其他颜色执行滤色会产生漂白的效果。 
    '''
    src1 = src1.astype(np.int16)
    src1 = 255 - (255-src1)/255*(255-src2)
    src1 = limit_0(src1)
    src1 = src1.astype(np.uint8)
    cv.imwrite(RESULT_LOC + "1-Screen.png", src1)

def photoshop_ColorBurn(src1, src2):
    '''
    颜色加深
    查看每个通道的颜色信息，通过增加“对比度”使底色的颜色变暗来反映绘图色，和白色混合没变化
    '''
    height, width = src1.shape[:2]
    for cow in range(height):
        for col in range(width):
            _point_note = []
            for _channel in range(3):
                a, b = src1[cow, col][_channel], src2[cow, col][_channel]
                if b != 0:
                    _point_note.append(a - (255 - a)*(255 - b)/b)
                else:
                    _point_note.append(0)
            src1[cow, col] = _point_note
    cv.imwrite(RESULT_LOC + "2-ColorBurn.png", src1)


def photoshop_ColorDodge(src1, src2):
    '''
    颜色减淡
    查看每个通道的颜色信息，通过降低“对比度”使底色的颜色变亮来反映绘图色，和黑色混合没变化
    '''
    height, width = src1.shape[:2]
    
    for cow in range(height):
        for col in range(width):
            _point_note = []
            for _channel in range(3):
                a, b = src1[cow, col][_channel], src2[cow, col][_channel]
                if 255-b != 0:
                    note = int(a + a/(255-b)*b)
                    note = 255 if note > 255 else note
                    _point_note.append(note)
                else:
                    _point_note.append(a)
            src1[cow, col] = _point_note
    cv.imwrite(RESULT_LOC + "2-ColorDodge.png", src1)


def photoshop_LinearBurn(src1, src2):
    '''
    线形加深
    查看每个通道的颜色信息，通过降低“亮度”使底色的颜色变暗来反映绘图色，和白色混合没变化。
    '''
    src1 = src1.astype(np.int16)
    src2 = src2.astype(np.int16)
    src1 = src1 - (255 - src2)

    # 遍历，如果有小于0的改回0
    for _channel_value in np.nditer(src1, op_flags=['readwrite']):
        if _channel_value < 0:
            _channel_value[...] = 0
    src1 = src1.astype(np.uint8)

    cv.imwrite(RESULT_LOC + "3-LinearBurn.png", src1)


def photoshop_LinearDodge(src1, src2):
    '''
    线性减淡
    查看每个通道的颜色信息，通过增加“亮度”使底色的颜色变亮来反映绘图色，和黑色混合没变化
    '''
    src1 = src1 + src2
    cv.imwrite(RESULT_LOC + "3-LinearDodge.png", src1)


def photoshop_Overlay(src1, src2):
    '''
    叠加
    在保留底色明暗变化的基础上使用“正片叠底”或“滤色”模式，绘图的颜色被叠加到底色上，但保留底色的高光和阴影部分。
    底色的颜色没有被取代，而是和绘图色混合来体现原图的亮部和暗部。
    使用此模式可使底色的图像的饱和度及对比度得到相应的提高，使图像看起来更加鲜亮。
    
    依据下层色彩值的不同，该模式可能是Multiply，也可能是Screen模式。
    上层决定了下层中间色调偏移的强度。
    如果上层为50%灰，则结果将完全为下层像素的值。
    如果上层比50%灰暗，则下层的中间色调的将向暗地方偏移
    如果上层比50%灰亮，则下层的中间色调的将向亮地方偏移。
    对于上层比50%灰暗，下层中间色调以下的色带变窄（原来为0~2*0.4*0.5，现在为0~2*0.3*0.5），中间色调以上的色带变宽（原来为2*0.4*0.5~1，现在为2*0.3*0.5~1）。反之亦然。
    '''
    height, width = src1.shape[:2]
    for cow in range(height):
        for col in range(width):
            for _channel in range(3):
                a, b = src1[cow, col, _channel], src2[cow, col, _channel]
                if a <= 128:
                    src1[cow, col, _channel] = a/128*b
                else:
                    src1[cow, col, _channel] = 255-(255-a)/128*(255-b)
    
    cv.imwrite(RESULT_LOC + "4-Overlay.png", src1)

def photoshop_SoftLight(src1, src2):
    '''
    柔光
    根据绘图色的明暗程度来决定最终色是变亮还是变暗
    当绘图色比50%的灰要亮时，则 底色图像变亮。
    当绘图色比50%的灰要暗时，则底色图像就变暗。
    如果绘图色有纯黑色或纯白色，最终色不是黑色或白色，而是稍微变暗或变亮。
    如果底色是纯白色或纯黑色，不产生任何效果。此效果与发散的聚光灯照在图像上相似。
    '''
    height, width = src1.shape[:2]
    src1 = src1.astype(np.int16)
    src2 = src2.astype(np.int16)
    for cow in range(height):
        for col in range(width):
            for _channel in range(3):
                a, b = src1[cow, col, _channel], src2[cow, col, _channel]
                if b <= 128:
                    src1[cow, col, _channel] = a/128*b + a/255*a/255 * (255-2*b)
                else:
                    src1[cow, col, _channel] = a*(255-b)/128 + np.sqrt(a/255)*(2*b-255)
    
    src1 = limit_0_255(src1)
    src1 = src1.astype(np.uint8)
    cv.imwrite(RESULT_LOC + "4-SoftLight.png", src1)

def photoshop_HardLight(src1, src2):
    '''
    强光
    根据绘图色来决定是执行“正片叠底”还是“滤色”模式。
    当绘图色比50%的灰要亮 时，则底色变亮，就执行“滤色”模式一样，这对增加图像的高光非常有帮助；
    当绘图色比50%的灰要暗时，则底色变暗，就执行“正片叠底”模式一样，可增加 图像的暗部。
    当绘图色是纯白色或黑色时得到的是纯白色和黑色。
    此效果与耀眼的聚光灯照在图像上相似。
    '''
    src1 = src1.astype(np.int16)
    src2 = src2.astype(np.int16)
    def _calculate_func(a, b):
        if b <= 128:
            return a /128 * b
        else:
            return 255 - (255-a)/128*(255-b)
    
    src1 = traverse_calculate_value(src1, src2, _calculate_func)
    src1 = limit_0_255(src1)
    cv.imwrite(RESULT_LOC + "4-HardLight.png", src1)
    



RESULT_LOC = 'example/0_Basic_usage_of_the_library/openCV/result/Extra-01-photoshop_layer_style/'
IMG_LOC = 'example/0_Basic_usage_of_the_library/openCV/picture/'

src1 = cv.imread(IMG_LOC + 'angle1.jpg')
src2 = cv.imread(IMG_LOC + 'angle2.jpg')

# photoshop_Transparent(src1, src2, 0.5)  # 图层透明度
# photoshop_Multiply(src1, src2)  # 正片叠底
# photoshop_Screen(src1, src2)  # 滤色
# photoshop_ColorBurn(src1, src2)  # 颜色加深
# photoshop_ColorDodge(src1, src2)  # 颜色减淡
# photoshop_LinearBurn(src1, src2)  # 线形加深
# photoshop_LinearDodge(src1, src2)  # 线性减淡
# photoshop_Overlay(src1, src2)  # 叠加
# photoshop_SoftLight(src1, src2)  # 柔光
# photoshop_HardLight(src1, src2)  # 强光



# IMAGES_LOCATION = 'example/0_Basic_usage_of_the_library/openCV/picture'
# for root, dirs, files in os.walk(IMAGES_LOCATION):  
    # print(root, files)

cv.waitKey(0)
cv.destroyAllWindows()
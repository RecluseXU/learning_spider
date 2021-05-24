# -*- encoding: utf-8 -*-
'''
@Time    :   2018-3-18
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   像素逻辑运算
'''

# here put the import lib
import cv2 as cv
import numpy as np


def logic_demo(m1, m2):  # 逻辑运算
    dst1 = cv.bitwise_and(m1, m2)  # 逻辑与运算,两个非0输出1
    cv.imshow('logic_demo1', dst1)
    dst2 = cv.bitwise_or(m1, m2)  # 逻辑或运算，有一个非0输出1
    cv.imshow('logic_demo2', dst2)
    dst3 = cv.bitwise_not(m1)  # 非，简单来说就是按位取反
    cv.imshow('logic_demo3', dst3)


def contrast_brightness_demo(image, c, b):  # 调整亮度(b)与对比度(c)
    h, w, ch = image.shape
    blank = np.zeros([h, w, ch], image.dtype)
    dst = cv.addWeighted(image, c, blank, 1-c, b)
    cv.imshow('con-bri-demo', dst)


src1 = cv.imread('example/0_Basic_usage_of_the_library/openCV/picture/angle1.jpg')
src2 = cv.imread('example/0_Basic_usage_of_the_library/openCV/picture/angle2.jpg')
src3 = cv.imread('example/0_Basic_usage_of_the_library/openCV/picture/angle_mask.jpg')
# 想进行运算，先看看大小、通道是否一致，否则可能会出问题。
print(src1.shape)
print(src2.shape)
print(src3.shape)
# 显示原本的三张图片
cv.imshow('src1', src1)
cv.imshow('src2', src2)
cv.imshow('src3', src3)

logic_demo(src2, src3)
contrast_brightness_demo(src2, 1.2, 0)  # 亮度10,对比度1.2
# 在原本亮度上提升10。其实就是每个通道的值加10
# 对比度也是的，相对原本的是1.2倍。
# 举例: 原本两个像素是1和2, 相差值为1, 当把对比度弄成2倍，变成2和4.两个像素相差值变为2。从而对比度更大。

cv.waitKey(0)
cv.destroyAllWindows()

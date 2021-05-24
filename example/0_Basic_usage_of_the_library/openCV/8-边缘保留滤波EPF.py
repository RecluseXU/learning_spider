# -*- encoding: utf-8 -*-
'''
@Time    :   2018-3-22
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   边缘保留滤波EPF
    E边缘
    P保留
    F滤波
实现EPF的方式有多种：高斯双边、均值迁移.......等
高斯模糊并没有考虑像素的边缘差异。
'''

# here put the import lib
import cv2 as cv
import numpy as np


def bi_demo(image):  # 高斯双边模糊
    dst = cv.bilateralFilter(image, 0, 100, 15)
    # cv2.bilateralFilter(img,d,’p1’,’p2’)
    # 函数有四个参数需要，d是领域的直径，后面两个参数是空间高斯函数标准差和灰度值相似性高斯函数标准差。
    cv.imshow('bi_demo', dst)


def shift_demo(image):  # 均值迁移模糊
    dst = cv.pyrMeanShiftFiltering(image, 10, 50)
    cv.imshow('shift_demo', dst)


src = cv.imread(
    'example/0_Basic_usage_of_the_library/openCV/picture/girl2.jpg')
cv.imshow('src1', src)

bi_demo(src)
shift_demo(src)

cv.waitKey(0)
cv.destroyAllWindows()

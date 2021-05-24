# -*- encoding: utf-8 -*-
'''
@Time    :   2018-3-26
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   Canny边缘提取
'''

# here put the import lib
import cv2 as cv
import numpy as np


def edge_demo(image):
    blurred = cv.GaussianBlur(image, (3, 3), 0)
    # 高斯模糊，降低噪声，Canny算法对噪声敏感。
    gray = cv.cvtColor(blurred, cv.COLOR_BGR2GRAY)
    # X Grodient梯度
    xgrad = cv.Sobel(gray, cv.CV_16SC1, 1, 0)
    # Y Grodient梯度
    ygrad = cv.Sobel(gray, cv.CV_16SC1, 0, 1)
    # 求边缘
    edge_output = cv.Canny(xgrad, ygrad, 50, 150)
    # 最后两个参数是高低阈值
    cv.imshow('Canny Edge', edge_output)

    dst = cv.bitwise_and(image, image, mask=edge_output)
    cv.imshow('Color edge', dst)


src = cv.imread(
    'example/0_Basic_usage_of_the_library/openCV/picture/buleeyeswhite.png')
cv.imshow('src', src)

edge_demo(src)

cv.waitKey(0)
cv.destroyAllWindows()

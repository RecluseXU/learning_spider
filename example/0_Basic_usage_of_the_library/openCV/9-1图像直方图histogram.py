# -*- encoding: utf-8 -*-
'''
@Time    :   2018-3-23
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   图像直方图histogram
'''

# here put the import lib
import cv2 as cv
import numpy as np
from matplotlib import pyplot as plt


def plot_demo(image):  # 使用matplotlib显示直方图（不是图像直方图）
    plt.hist(image.ravel(), 256, [0, 256])
    # ravel函数：功能是降维
    # 256 ：bins值，影响y轴数值
    # [0,256] ：range值，影响x轴
    plt.show()


def image_hist(image):  # openCV图像直方图
    color = ('blue', 'green', 'red')
    for i, color in enumerate(color):
        hist = cv.calcHist([image], [i], None, [256], [0, 256])
        # [image] :图
        # [i] :通道
        # None :mask
        # [256] :bins
        # [0,256] :range
        plt.plot(hist, color=color)
        plt.xlim([0, 256])
    plt.show()


src = cv.imread(
    'example/0_Basic_usage_of_the_library/openCV/picture/girl2.jpg')
cv.imshow('src1', src)

plot_demo(src)
image_hist(src)

cv.waitKey(0)
cv.destroyAllWindows()

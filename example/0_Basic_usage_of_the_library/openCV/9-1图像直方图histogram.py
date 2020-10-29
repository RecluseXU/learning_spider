#!/user/bin/env python3
#!-*- coding:utf-8 -*-
'''
Created on 2018年3月23日

@author: RecluseXU
'''

import cv2 as cv
import numpy as np
from matplotlib import pyplot as plt

def plot_demo(image):#使用matplotlib显示直方图（不是图像直方图）
    plt.hist(image.ravel(), 256, [0,256])
    # ravel函数：功能是降维
    # 256 ：bins值，影响y轴数值
    # [0,256] ：range值，影响x轴
    plt.show()

def image_hist(image):#openCV图像直方图
    color = ('blue', 'green' , 'red')
    for i, color in enumerate(color):
        hist = cv.calcHist([image],[i],None,[256],[0,256])
        # [image] :图
        # [i] :通道
        # None :mask
        # [256] :bins
        # [0,256] :range
        plt.plot(hist,color=color)
        plt.xlim([0,256])
    plt.show()

src = cv.imread('picture/girl2.jpg')
cv.imshow('src1',src)

plot_demo(src)
image_hist(src)

cv.waitKey(0)
cv.destroyAllWindows()
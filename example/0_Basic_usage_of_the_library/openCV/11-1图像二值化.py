#!/user/bin/env python3
#!-*- coding:utf-8 -*-
'''
Created on 2018年3月25日

@author: RecluseXu
'''
import cv2 as cv
import numpy as np

# 二值图像，不是0就是255的图像
# 图像二值化方法：
# 先把图像变成灰度图，然后选一种方法进行二值化
# 全局阈值，局部阈值。
# 亮度不均时建议使用 局部阈值方法

def threshold_demo(image):#全局阈值
    gray = cv.cvtColor(image,cv.COLOR_BGR2GRAY)

    ret,binary = cv.threshold(gray,0,255,cv.THRESH_BINARY | cv.THRESH_OTSU)
    # 要么变成0，要么变成255，二值化，自动寻找阈值计算方法
    print('cv.THRESH_OTSU-threshold value %s' %ret)
    cv.imshow('cv.THRESH_OTSU-binary',binary)
    
    # cv.THRESH_TRIANGLE 在图像直方图是三个波峰的时候，效果好。
    # 波峰越多，效果越渣
    ret,binary = cv.threshold(gray,0,255,cv.THRESH_BINARY | cv.THRESH_TRIANGLE)
    print('cv.THRESH_OTSU-threshold value %s' %ret)
    cv.imshow('cv.THRESH_TRIANGLE-binary',binary)
    
    # 当你 有阀值计算方法前面写的 两个参数数值不起作用。
    # 这里我删掉 自动寻找阈值计算方法参数，手动输入160
    ret,binary = cv.threshold(gray,160,255,cv.THRESH_BINARY)
    cv.imshow('defind it = 127',binary)
    # cv.THRESH_BINARY和cv.THRESH_BINARY_INV,这个参数决定了超出这个值后，是变黑还是变白
    ret,binary = cv.threshold(gray,160,255,cv.THRESH_BINARY_INV)
    cv.imshow('defind it = 127 INV',binary)
    # 可以填cv.THRESH_TRUNC。 （TRUNC：截断）
    # 这里小于160的变为0，大于160的变为160.
    ret,binary = cv.threshold(gray,160,255,cv.THRESH_TRUNC)
    cv.imshow('defind it = 127 TRUNC',binary)
    # 可以填cv.THRESH_TOZERO
    # 这里小于160的变为0
    ret,binary = cv.threshold(gray,160,255,cv.THRESH_TOZERO)
    cv.imshow('defind it = 127 TOZERO',binary)

def local_threshold(image):#局部二值化
    gray = cv.cvtColor(image,cv.COLOR_BGR2GRAY)
    # 灰度图,，最大值（这里灰度图最大是255），局部方法，二值化方法，blockSize,常量
    # 局部方法 有两种：cv.ADAPTIVE_THRESH_MEAN_C 和  cv.ADAPTIVE_THRESH_GAUSSIAN_C
    #    cv.ADAPTIVE_THRESH_MEAN_C
    #        将图像分成小方格，求出每个方格的均值，大于均值的一个色，小于的一个色
    #    cv.ADAPTIVE_THRESH_GAUSSIAN_C
    #        在上面的基础上，求均值的时候算上 高斯权重。
    # blockSize: 一定要是单数
    # 常量 : 当一个方格里的均值计算出来，来判断某个像素点时使用。
    # 当像素点-均值>这个常量，填一个颜色，小于填另一个颜色。
    # 这个参数能一定程度减少噪声的影响
    binary = cv.adaptiveThreshold(gray,255,cv.ADAPTIVE_THRESH_MEAN_C,cv.THRESH_BINARY,25,10)
    cv.imshow('local MEAN_C binary',binary)
    binary = cv.adaptiveThreshold(gray,255,cv.ADAPTIVE_THRESH_GAUSSIAN_C,cv.THRESH_BINARY,25,10)
    cv.imshow('local GAUSSIAN_C binary',binary)
    # 个人感觉 高斯C 效果更好

def custom_threshold(image):# 自行二值化
    gray = cv.cvtColor(image,cv.COLOR_BGR2GRAY)
    h,w = gray.shape[:2]
    m = np.reshape(gray, [1,w*h])
    mean = m.sum()/(w*h)
    print('mean:',mean)
    ret,binary = cv.threshold(gray,mean,255,cv.THRESH_BINARY)
    cv.imshow('custom binary', binary)

src = cv.imread('picture/angle2.jpg')
cv.imshow('src',src)


# threshold_demo(src)
# local_threshold(src)
# custom_threshold(src)

cv.waitKey(0)
cv.destroyAllWindows()
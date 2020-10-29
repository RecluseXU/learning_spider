#!/user/bin/env python3
#!-*- coding:utf-8 -*-
'''
Created on 2018年3月26日

@author: RecluseXu
'''
import cv2 as cv
import numpy as np

def lapalian_demo(image):# 拉普拉斯算子
    # 方法1,API
#     dst = cv.Laplacian(image,cv.CV_32F)
#     lpls = cv.convertScaleAbs(dst)
    # 方法2,自定义
    kernel = np.array([[0,1,0],[1,-4,1],[0,1,0]])
    dst = cv.filter2D(image,cv.CV_32F,kernel=kernel)
    lpls = cv.convertScaleAbs(dst)
    
    cv.imshow('lapalian_demo',lpls)

def sobel_demo(image):# sobel算子
    grad_x = cv.Sobel(image,cv.CV_32F,1,0)
    grad_y = cv.Sobel(image,cv.CV_32F,0,1)
    # cv.CV_32F 这个参数其实还有很多
    gradx = cv.convertScaleAbs(grad_x)# 绝对值
    grady = cv.convertScaleAbs(grad_y)
    cv.imshow('gradient-x',gradx)
    cv.imshow('gradient-y',grady)
    
    gradxy = cv.addWeighted(gradx,0.5,grady,0.5,0)
    cv.imshow('gradient',gradxy)

src = cv.imread('picture/angle2.jpg')
cv.imshow('src',src)

lapalian_demo(src)
sobel_demo(src)

cv.waitKey(0)
cv.destroyAllWindows()
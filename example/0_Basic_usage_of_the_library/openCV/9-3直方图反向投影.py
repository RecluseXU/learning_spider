#!/user/bin/env python3
#!-*- coding:utf-8 -*-
'''
Created on 2018年3月23日

@author: Recluse
'''
import cv2 as cv
import numpy as np
from matplotlib import pyplot as plt

def hist2d_onlyCV_demo(image):#图像2D直方图获取
    hsv = cv.cvtColor(image,cv.COLOR_BGR2HSV)
    # 先转HSV
    hist = cv.calcHist([image],[0,1],None,[180,256],[0,180,0,256])
    # image : 图像
    # [0,1] : 这次需要计算两个通道
    # None : mask..这次没有
    # [180,256] : histSize,H通道是180,另一个通道是256
    # [0,180,0,256] : range，范围
    
    cv.imshow('hist2d',hist)
    #看到图会发现宽和高不一样，那是因为一个是256一个是180
    cv.imwrite('result/9-3hist2d_onlyCV.png',hist)
    
    plt.imshow(hist, interpolation='nearest')
    plt.title('2D Histogram')
    plt.show()
    plt.savefig('result/9-3hist2d_withPLT.png')

def back_projection_demo(sample,target):#直方图反向投影
    sample_hsv = cv.cvtColor(sample,cv.COLOR_BGR2HSV)
    target_hsv = cv.cvtColor(target,cv.COLOR_BGR2HSV)
    
    #求出例子的直方图 
#     第四个参数[]里面的数决定了颜色细分程度，越是高，细分程度越厉害，最后的投影图白色越少
#    [180,256]?,[16,32]?,[12,18]?,[16,12]?,[12,12]?随便测试
    sample_Hist = cv.calcHist([sample_hsv],[0,1],None,[12,36],[0,180,0,256])
    #归一化处理，全变成0到255之间，只有归一化以后才能带入
    cv.normalize(sample_Hist,sample_Hist,0,255,cv.NORM_MINMAX)
    
    dst = cv.calcBackProject([target_hsv],[0,1],sample_Hist,[0,180,0,256],1)
    cv.imshow('backprojection_demo',dst)
    cv.imwrite('result/9-3backprojection.png',dst)

src1 = cv.imread('picture/angle_cloths_material.png')
src = cv.imread('picture/angle2.jpg')

cv.imshow('src',src)
cv.imshow('src1',src1)

# hist2d_onlyCV_demo(src)
back_projection_demo(src1,src)

cv.waitKey(0)
cv.destroyAllWindows()
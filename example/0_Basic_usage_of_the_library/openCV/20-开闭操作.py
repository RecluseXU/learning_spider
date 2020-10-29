#!/user/bin/env python3
#!-*- coding:utf-8 -*-
'''
Created on 2018年3月28日

@author: RecluseXu
'''

import cv2 as cv
import numpy as np

def open_demo(image):
    print(image.shape)
    gray = cv.cvtColor(image,cv.COLOR_BGR2GRAY)
    ret, binary = cv.threshold(gray, 0, 255,cv.THRESH_BINARY | cv.THRESH_OTSU)
    cv.imshow('binary',binary)
    
    kernel = cv.getStructuringElement(cv.MORPH_RECT,(5,5))
    # cv.MORPH_RECT 这个东西一定程度，决定了留下来的图像的外形。
    # 有很多选项可以尝试，比如cv.MORPH_ELLIPSE就会留下圆
    # (5,5) 结构元素，这个东西决定了调整的大小。
    # 当你把这东西改成（15,1），图中的横杠可能不会消除。类似的也可以做到竖的不消除
    binary = cv.morphologyEx(binary, cv.MORPH_OPEN, kernel)
    # cv.morphologyEx 形态学操作函数
    # cv.MORPH_OPEN 具体操作
    
    cv.imshow('open result',binary)
    
def close_demo(image):
    print(image.shape)
    gray = cv.cvtColor(image,cv.COLOR_BGR2GRAY)
    ret, binary = cv.threshold(gray, 0, 255,cv.THRESH_BINARY | cv.THRESH_OTSU)
    cv.imshow('binary',binary)
    
    kernel = cv.getStructuringElement(cv.MORPH_RECT,(15,15))
    binary = cv.morphologyEx(binary, cv.MORPH_CLOSE, kernel)
    # cv.morphologyEx 形态学操作函数
    # cv.MORPH_CLOSE 具体操作
    
    cv.imshow('close result',binary)



src = cv.imread('picture/goodmancard.jpg')
cv.imshow('src',src)

open_demo(src)
close_demo(src)

cv.waitKey(0)
cv.destroyAllWindows()
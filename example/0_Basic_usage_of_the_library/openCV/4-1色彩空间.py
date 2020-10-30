#!/user/bin/env python3
#!-*- coding:utf-8 -*-
'''
Created on 2018年3月14日

@author: recluse
'''
import cv2 as cv

def color_space_demo(image): # 转换色彩空间
    gray = cv.cvtColor(image, cv.COLOR_BGR2GRAY) # RGB->gray
    cv.imshow('gray', gray)
    cv.imwrite('result/4-1gray.png', gray)
    hsv = cv.cvtColor(image, cv.COLOR_BGR2HSV) # RGB->hsv
    cv.imshow('hsv', hsv)
    cv.imwrite('result/4-1hsv.png',hsv)
    yuv = cv.cvtColor(image, cv.COLOR_BGR2YUV) # RGB->yuv
    cv.imshow('yuv', yuv)
    cv.imwrite('result/4-1yuv.png',yuv)
    ycrcb = cv.cvtColor(image, cv.COLOR_BGR2YCrCb) # RGB->ycrcb
    cv.imshow('ycrcb', ycrcb)
    cv.imwrite('result/4-1ycrcb.png', ycrcb)


src = cv.imread('example/0_Basic_usage_of_the_library/openCV/picture/buleeyeswhite.png')
cv.namedWindow('inputImage', cv.WINDOW_AUTOSIZE)
cv.imshow('inputImage', src)


color_space_demo(src)

cv.waitKey(0)
cv.destroyAllWindows()

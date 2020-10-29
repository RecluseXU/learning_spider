#!/user/bin/env python3
#!-*- coding:utf-8 -*-
'''
Created on 2018年3月13日
@author: RecluseXU
'''

import cv2 as cv

src = cv.imread('picture/buleeyeswhite.png')
cv.namedWindow('inputImage',cv.WINDOW_AUTOSIZE)
cv.imshow('inputImage',src)
print("Hello OpenCV")
cv.waitKey(0)
cv.destroyAllWindows()


#!/user/bin/env python3
#!-*- coding:utf-8 -*-
'''
Created on 2018年3月19日

@author: recluseXU
'''
import cv2 as cv
import numpy as np


def roi_demo(src):
    #ROI操作-----------ROI(Region of Interest)
    face = src[100:310,170:400]#框选出脸的位置，这是我手动选的- -
    #格式是：[行开始位置：行结束位置，列开始位置：列结束位置]
    cv.imshow('select_face',face)#看一下扣选出来的图
    gray_face = cv.cvtColor(face,cv.COLOR_BGR2GRAY)#脸部图像灰度，灰度后颜色信息丢失，只剩下黑白，1通道。
    gray_face = cv.cvtColor(gray_face,cv.COLOR_GRAY2BGR)#再将图片转为RGB三色通道。
    #为什么要重新转换为RGB三色：因为当你将图像灰度后，就只剩下一个通道，不能直接赋值给RGB三通道的图像，所以要转为3通道再覆盖。
    src[100:310,170:400] = gray_face
    cv.imshow('after_src',src)

def fill_color_demo(image):
    copyImage = image.copy()
    h,w = image.shape[:2]
    mask = np.zeros([h+2,w+2],np.uint8)#此处的+2是工程项的处理。
    cv.floodFill(copyImage,mask,(30,30),(0,255,255),(100,100,100),(30,30,30),cv.FLOODFILL_FIXED_RANGE)
    #（30,30）是起始填充位置，简单来说就是从这个位置开始找周围的像素是否符合条件
    #（0，255，255）填充的颜色。这里是黄色
    #（100,100,100）最低填充像素范围-----根据这个选取像素
    #（30,30,30）最高填充像素范围--------根据这个选取像素
    # cv.FLOODFILL_FIXED_RANGE 填充方法选择
    cv.imshow('fill_color_demo',copyImage)


src = cv.imread('picture/angle2.jpg')
cv.imshow('src1',src)

#roi_demo(src)
fill_color_demo(src)

cv.waitKey(0)
cv.destroyAllWindows()
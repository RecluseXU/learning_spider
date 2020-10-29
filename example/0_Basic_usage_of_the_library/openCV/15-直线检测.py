#!/user/bin/env python3
#!-*- coding:utf-8 -*-
'''
Created on 2018年3月26日

@author: RecluseXu
'''
import cv2 as cv
import numpy as np


def line_detection(image):
    gray = cv.cvtColor(image,cv.COLOR_BGR2GRAY) # 灰度
    edges = cv.Canny(gray,50,150,apertureSize=3) # 边缘
    lines = cv.HoughLines(edges, 1, np.pi/180, 200) # 转换直线
    # edges ：边缘提取的结果
    # 1：步长
    # np.pi/180：每次偏转度数，这里是1°
    for line in lines:
        print(type(line))
        rho,theta = line[0] # 极坐标三角函数套用
        a = np.cos(theta)
        b = np.sin(theta)
        x0 = a * rho
        y0 = b * rho
        
        x1 = int(x0 + 1000 * (-b))
        y1 = int(y0 + 1000 * (a))
        x2 = int(x0 - 1000 * (-b))
        y2 = int(y0 - 1000 * (a))
        cv.line(image,(x1,y1),(x2,y2),(0,0,255),2)
        # 图，坐标1，坐标2，线的颜色，线的宽度
        
    cv.imshow('image_lines',image)
        
def line_detect_possible_demo(image):  # 相对于上面的那个，这个更好用
    gray = cv.cvtColor(image,cv.COLOR_BGR2GRAY) # 灰度
    edges = cv.Canny(gray,50,150,apertureSize=3) # 边缘
    lines = cv.HoughLinesP(edges, 1, np.pi/180, 100, minLineLength=50, maxLineGap=10)
    # 边缘
    # 步长
    # 每次偏转的度数
    # 直线最小的长度，在这个数一下的不认为是直线
    # 当出现中间断开的线时，如果断开的地方小于10个像素，依旧认为是一条线
    for line in lines:
        x1,y1,x2,y2 = line[0]
        cv.line(image,(x1,y1),(x2,y2),(0,0,255),2)
    cv.imshow('line_detect_possible_demo',image)

src = cv.imread('example/0_Basic_usage_of_the_library/openCV/picture/girl2.jpg')
cv.imshow('src',src)


line_detection(src.copy())
line_detect_possible_demo(src.copy())

cv.waitKey(0)
cv.destroyAllWindows()
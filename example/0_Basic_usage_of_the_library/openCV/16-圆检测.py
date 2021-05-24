# -*- encoding: utf-8 -*-
'''
@Time    :   2018-3月26
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   圆检测
'''

# here put the import lib
import cv2 as cv
import numpy as np


def detect_circle_demo(image):
    dst = cv.pyrMeanShiftFiltering(image, 10, 100)  # 模糊
    gray = cv.cvtColor(dst, cv.COLOR_BGR2GRAY)  # 灰度
    circles = cv.HoughCircles(
        gray, cv.HOUGH_GRADIENT, 1, 20, param1=50, param2=30, minRadius=0, maxRadius=0)
    # cv.HOUGH_GRADIENT,意思是用梯度的方法来做，比较的快
    # 20:最小距离，当识别出来的的两个圆的圆心距离小于这个值，识别为一个圆,否则识别为两个圆
    circles = np.uint16(np.around(circles))
    for i in circles[0, :]:
        cv.circle(image, (i[0], i[1]), i[2], (0, 0, 255), 2)
        cv.circle(image, (i[0], i[1]), 2, (255, 0, 0), 2)
    cv.imshow('detect_circle_demo', image)


src = cv.imread(
    'example/0_Basic_usage_of_the_library/openCV/picture/goodmancard.jpg')
cv.imshow('src', src)

detect_circle_demo(src)


cv.waitKey(0)
cv.destroyAllWindows()

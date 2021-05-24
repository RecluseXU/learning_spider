# -*- encoding: utf-8 -*-
'''
@Time    :   2018-3-26
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   轮廓发现
    基于图像边缘提取的基础寻找对象轮廓的方法
    边缘提取的阈值选定会影响最终轮廓发现的结果
  openCV API介绍
   findCouours发现轮廓
   drawContours绘制轮廓
'''
import cv2 as cv
import numpy as np


def contours_demo(image):  # 轮廓发现
    dst = cv.GaussianBlur(image, (3, 3), 0)  # 高斯模糊，稍微去去噪点
    gray = cv.cvtColor(image, cv.COLOR_BGR2GRAY)  # 灰度
    ret, binary = cv.threshold(gray, 0, 255, cv.THRESH_BINARY | cv.THRESH_OTSU)
    # 二值化，这里是直接的全局阈值。当然也可以选局部阈值。
    # 局部阈值会把细微的东西都区分出来。比如你想要识别硬币的轮廓，用这个或许会将硬币的浮雕标记出轮廓。显然对结果不利。
    # 根据想要的结果来选择 二值化 方法
    cv.imshow('binary image', binary)

    contours, hericachy = cv.findContours(
        binary, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE)
    # cv.RETR_TREE返回一个树形结构
    # 其实还有其他的方法，输入cv.RETR之后会提示几种可以选择的方法。都可以试试。
    # 最后一个参数也是。可以输入部分，然后选择提示的。
    for i, contour in enumerate(contours):
        cv.drawContours(image, contours, i, (0, 0, 255), 2)
        # 最后一个参数，2是描边，-1是填充轮廓
        print(i)
    cv.imshow('detect contours', image)


src = cv.imread(
    'example/0_Basic_usage_of_the_library/openCV/picture/angle2.jpg')
cv.imshow('src', src)

contours_demo(src)


cv.waitKey(0)
cv.destroyAllWindows()

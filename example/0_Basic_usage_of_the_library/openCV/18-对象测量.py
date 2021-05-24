# -*- encoding: utf-8 -*-
'''
@Time    :   2018-3-27
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   对象测量
    弧长与面积
        计算单位是像素
        计算弧长和面积的前提条件是进行 轮廓发现
    多边形拟合
        获取轮廓的多边形拟合效果
    approxPolyDP
        contour
        epsilon 越小折线越逼近真实形状
        close 是否为封闭区域
    几何矩计算
        见 18-几何矩计算
'''

# here put the import lib
import cv2 as cv
import numpy as np


def measure_object(image):
    gray = cv.cvtColor(image, cv.COLOR_BGR2GRAY)  # 灰度
    ret, binary = cv.threshold(
        gray, 0, 255, cv.THRESH_BINARY_INV | cv.THRESH_OTSU)  # 二分化
    # 需要注意的是这里用的是 cv.THRESH_BINARY_INV
    # 因为白的东西才能被识别，你看看灰度图就懂了。
    print('threshold value %s' % ret)
    cv.imshow('binary image', binary)

    contours, hireachy = cv.findContours(
        binary, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE)  # 轮廓发现
    print(str(contours).replace(' ', '').replace('\n', ' '))
    for i, contour in enumerate(contours):  # 遍历识别结果
        area = cv.contourArea(contour)
        x, y, w, h = cv.boundingRect(contour)
        print('rectangle rate:', min(w, h)/max(w, h))

        mm = cv.moments(contour)  # 获得几何矩
        if(mm['m00'] != 0):
            # 由于m00这个东西可能为0，下面又用它来除东西，所以做个判断
            cx = mm['m10']/mm['m00']
            cy = mm['m01']/mm['m00']
            cv.circle(image, (np.int(cx), np.int(cy)),
                      3, (0, 0, 255), -1)  # 圆形画重心
            cv.rectangle(image, (x, y), (x+w, y+h), (0, 0, 255), 2)  # 正方形画外形
        approxCurve = cv.approxPolyDP(contour, 4, True)
        print(approxCurve.shape)
        # 尝试根据识别外形的边数来画图
        if (approxCurve.shape[0] > 10):  # 当判断的图像的边数>10
            cv.drawContours(image, contours, i, (255, 0, 0), 2)
        if(approxCurve.shape[0] == 4):  # 当是四边形
            cv.drawContours(image, contours, i, (255, 255, 0), 2)
    cv.imshow('measure-contours', image)


src = cv.imread(
    'example/0_Basic_usage_of_the_library/openCV/picture/goodmancard.jpg')
cv.imshow('src', src)

measure_object(src)


cv.waitKey(0)
cv.destroyAllWindows()

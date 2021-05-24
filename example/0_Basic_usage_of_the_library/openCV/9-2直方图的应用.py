# -*- encoding: utf-8 -*-
'''
@Time    :   2018-3-23
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   直方图应用
'''

# here put the import lib
import cv2 as cv
import numpy as np


def equalHist_demo(image):  # 全局直方图均衡化
    # 图像增强对比的一个手段
    # 只能处理灰度图
    gray = cv.cvtColor(image, cv.COLOR_BGR2GRAY)
    dst = cv.equalizeHist(gray)
    cv.imshow('equal-demo', dst)
    cv.imwrite('result/9-2equal.png', dst)


def clahe_demo(image):  # 局部直方图均衡化
    # 相对于上面的，这个能控制强度
    gray = cv.cvtColor(image, cv.COLOR_BGR2GRAY)
    clahe = cv.createCLAHE(clipLimit=5.0, tileGridSize=(8, 8))
    dst = clahe.apply(gray)
    cv.imshow('clahe-demo', dst)
    cv.imwrite('result/9-2clashe.png', dst)


def create_rgb_hist(image):
    h, w, c = image.shape
    rgbHist = np.zeros([16*16*16, 1], np.float32)
    # 为什么要写成[16*16*16,1]
    # 那三个16是指 三个颜色通道bin的数量都是16
    # 三者想乘得到取值空间
    # 1则表示每一个通道都是单独的一列
    # 顺带一提，如果不是float32可能会报错
    bin_size = 256/16  # bin大小
    for row in range(h):
        for col in range(w):
            b = image[row, col, 0]
            g = image[row, col, 1]
            r = image[row, col, 2]
            index = np.int(b/bin_size)*16*16 + \
                np.int(g/bin_size)*16 + np.int(r/bin_size)
            rgbHist[np.int(index), 0] = rgbHist[np.int(index), 0]+1
    return rgbHist


def hist_compare(image1, image2):
    hist1 = create_rgb_hist(image1)
    hist2 = create_rgb_hist(image2)
    # 巴氏距离 ,数据<1，越小越相似
    match1 = cv.compareHist(hist1, hist2, cv.HISTCMP_BHATTACHARYYA)
    print('巴氏距离:', match1)
    # 相关性，越接近1，越相关
    match2 = cv.compareHist(hist1, hist2, cv.HISTCMP_CORREL)
    print('相关性:', match2)
    # 卡方，越小越相似
    match3 = cv.compareHist(hist1, hist2, cv.HISTCMP_CHISQR)
    print('卡方:', match3)


src = cv.imread(
    'example/0_Basic_usage_of_the_library/openCV/picture/girl3.jpg')
src1 = cv.imread(
    'example/0_Basic_usage_of_the_library/openCV/picture/angle1.jpg')
src2 = cv.imread(
    'example/0_Basic_usage_of_the_library/openCV/picture/angle2.jpg')
cv.imshow('src', src)
cv.imshow('src1', src1)
cv.imshow('src2', src2)


# 直方图均衡化
equalHist_demo(src)
clahe_demo(src)
# 直方图比较
hist_compare(src1, src2)

cv.waitKey(0)
cv.destroyAllWindows()

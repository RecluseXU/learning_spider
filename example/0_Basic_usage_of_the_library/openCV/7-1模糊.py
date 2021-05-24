# -*- encoding: utf-8 -*-
'''
@Time    :   2018-3-21
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   模糊
'''

# here put the import lib
import cv2 as cv
import numpy as np


# openCV这些模糊功能其实都是基于 卷积 的。
# 我们可以修改它的卷积核大小，但是内容不能修改。
def blur_demo(image):  # 均值模糊
    dst = cv.blur(image, (5, 5))
    # 图像，卷积核大小
    # openCV中blur运算非常快
    cv.imshow('blur_demo', dst)


def median_blur_demo(image):  # 中值模糊，去除椒盐噪声效果不错。
    # 椒盐噪声，简单来说就是图像上有很多 黑色到白色 之间的小点。
    # 可以去    http://blog.csdn.net/spw_1201/article/details/53571893    看看效果图
    # 当使用中值模糊去椒盐噪声时，图像不会留黑（白）块，而如果用均值模糊，则会留。
    dst = cv.medianBlur(image, 5)
    cv.imshow('median_blur_demo', dst)


def custom_blur_demo(image):
    # kernel = np.ones([5,5],np.float32)/25 #定义一个模糊mask
    # 虽然我在这里弄的是全是1的5x5矩阵
    # 但是通过卷积后，数值最多可能会去到25，一旦溢出就会报错，所以除25.
    kernel = np.array([[0, -1, 0], [-1, 8, -1], [0, -1, 0]], np.float32)/9  # 定义一个锐化mask

    dst = cv.filter2D(image, -1, kernel=kernel)
    cv.imshow('custom_blur_demo', dst)


src = cv.imread(
    'example/0_Basic_usage_of_the_library/openCV/picture/angle2.jpg')
cv.imshow('src1', src)

blur_demo(src)
median_blur_demo(src)
custom_blur_demo(src)

cv.waitKey(0)
cv.destroyAllWindows()

# -*- encoding: utf-8 -*-
'''
@Time    :   2018-3-25
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   图像金字塔
'''

# here put the import lib
import cv2 as cv
import numpy as np


def pyramid_demo(image):
    level = 3
    temp = image.copy()
    pyramid_images = []
    for i in range(level):
        dst = cv.pyrDown(temp)
        pyramid_images.append(dst)
        cv.imshow('pyramid_down'+str(i), dst)
        temp = dst.copy()
    return pyramid_images


def lapalian_demo(image):
    pyramid_images = pyramid_demo(image)
    level = len(pyramid_images)
    for i in range(level-1, -1, -1):
        if (i-1) < 0:
            expand = cv.pyrUp(pyramid_images[i], dstsize=image.shape[:2])
            lpls = cv.subtract(image, expand)
        else:
            expand = cv.pyrUp(
                pyramid_images[i], dstsize=pyramid_images[i-1].shape[:2])
            lpls = cv.subtract(pyramid_images[i-1], expand)
        cv.imshow('lapalian_down_' + str(i), lpls)


src = cv.imread(
    'example/0_Basic_usage_of_the_library/openCV/picture/angle2.jpg')
cv.imshow('src', src)

# pyramid_demo(src)
lapalian_demo(src)

cv.waitKey(0)
cv.destroyAllWindows()

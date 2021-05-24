# -*- encoding: utf-8 -*-
'''
@Time    :   2018-3-25
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   大图像二值化
'''

# here put the import lib
import cv2 as cv
import numpy as np


def big_image_binary_threshold_demo(image):  # 全局
    h, w = image.shape[:2]
    cw = 256  # 步长
    ch = 256
    gray = cv.cvtColor(image, cv.COLOR_BGR2GRAY)
    for row in range(0, h, ch):
        for col in range(0, w, cw):
            roi = gray[row:row+ch, col:cw+col]
            dev = np.std(roi)
            print('标准差:', dev, '均值:', np.mean(roi))  # 通过判断标准差来减少全局方式的噪点问题
            if(dev < 15):
                gray[row:row+ch, col:cw+col] = 255
            else:
                ret, dst = cv.threshold(
                    roi, 0, 255, cv.THRESH_BINARY | cv.THRESH_OTSU)  # 自动搜寻二值化
                gray[row:row+ch, col:cw+col] = dst
    cv.imwrite(
        'example/0_Basic_usage_of_the_library/openCV/result/11-2bigimage_threshold_binary.png', gray)


def big_image_binary_local_demo(image):  # 局部
    h, w = image.shape[:2]
    cw = 256  # 步长
    ch = 256
    gray = cv.cvtColor(image, cv.COLOR_BGR2GRAY)
    for row in range(0, h, ch):
        for col in range(0, w, cw):
            roi = gray[row:row+ch, col:cw+col]  # ROI取小块
            # 局部二值化
            dst = cv.adaptiveThreshold(
                roi, 255, cv.ADAPTIVE_THRESH_GAUSSIAN_C, cv.THRESH_BINARY, 127, 20)
            # 赋值回原来的图那里
            gray[row:row+ch, col:cw+col] = dst
            print('标准差:', np.std(dst), '均值:', np.mean(dst))
    cv.imwrite(
        'example/0_Basic_usage_of_the_library/openCV/result/11-2bigimage_local_binary.png', gray)


src = cv.imread(
    'example/0_Basic_usage_of_the_library/openCV/picture/mercy5760x3240.png')
cv.imshow('src', src)


big_image_binary_threshold_demo(src)
# big_image_binary_local_demo(src)

cv.waitKey(0)
cv.destroyAllWindows()

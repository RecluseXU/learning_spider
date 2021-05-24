# -*- encoding: utf-8 -*-
'''
@Time    :   2018-3-22
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   高斯模糊
'''

# here put the import lib
import cv2 as cv
import numpy as np


def clamp(pv):  # 检测像素，超过255变成255，小于0变成0
    if(pv > 255):
        return 255
    elif(pv < 0):
        return 0
    else:
        return pv


def gaussian_noise(image):  # 高斯噪声
    h, w, c = image.shape
    for row in range(h):
        for col in range(w):
            s = np.random.normal(0, 20, 3)
            b = image[row, col, 0]  # 蓝色
            g = image[row, col, 1]  # 绿色
            r = image[row, col, 2]  # 红色
            image[row, col, 0] = clamp(b+s[0])
            image[row, col, 1] = clamp(g+s[1])
            image[row, col, 1] = clamp(r+s[2])
    cv.imshow('noise_demo', image)


src = cv.imread(
    'example/0_Basic_usage_of_the_library/openCV/picture/girl2.jpg')
cv.imshow('src1', src)

t1 = cv.getTickCount()
gaussian_noise(src)  # 添加高斯噪声
t2 = cv.getTickCount()


dst = cv.GaussianBlur(src, (5, 5), 15)  # 高斯模糊
cv.imshow('Gaussina_Blur', dst)
# 高斯模糊能抑制高斯噪声

time = (t2-t1)/cv.getTickFrequency()
print('spent time:', time)

cv.waitKey(0)
cv.destroyAllWindows()

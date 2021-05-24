# -*- encoding: utf-8 -*-
'''
@Time    :   2018-03-13
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   测试是否安装成功
'''

import cv2 as cv

src = cv.imread('example/0_Basic_usage_of_the_library/openCV/picture/buleeyeswhite.png')
cv.namedWindow('inputImage', cv.WINDOW_AUTOSIZE)
cv.imshow('inputImage', src)
print("Hello OpenCV")
cv.waitKey(0)
cv.destroyAllWindows()

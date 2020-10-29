#!/user/bin/env python3
#!-*- coding:utf-8 -*-
'''
Created on 2018年3月13日
@author: RecluseXU
'''

import cv2 as cv
import numpy as np


def get_image_info(image):#图片的各个属性
    print(type(image))#结果是numpy.ndarray类型
    print(image.shape)#shape 显示高宽、通道数
    print(image.size)#size 大小
    print(image.dtype)#dtype 每个通道所占位数
    image_data = np.array(image)
    print(image_data)


def video_demo():#读入视频
    #openCV读的视频都是没有声音的。
    capture = cv.VideoCapture(0)
    # 0代表从摄像头读取图像，当你有多个摄像头，可能会有1,2,3等....
    while(True):
        ret,frame = capture.read()
        frame = cv.flip(frame,1)#左右镜像调换
        cv.imshow("video",frame)
        c = cv.waitKey(50)
        if(c == 27):
            break


src = cv.imread('example/0_Basic_usage_of_the_library/openCV/picture/buleeyeswhite.png')
cv.namedWindow('inputImage',cv.WINDOW_AUTOSIZE)
cv.imshow('inputImage',src)

#读
get_image_info(src)
video_demo()
#写
cv.imwrite('example/0_Basic_usage_of_the_library/openCV/result/2-result.png',src)

cv.waitKey(0)
cv.destroyAllWindows()
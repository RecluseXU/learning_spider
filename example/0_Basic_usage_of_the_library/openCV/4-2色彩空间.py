#!/user/bin/env python3
#!-*- coding:utf-8 -*-
'''
Created on 2018年3月17日

@author: recluseXU
'''
import cv2 as cv
import numpy as np

def extrace_object_demo():  # 视频读入
    capture = cv.VideoCapture('example/0_Basic_usage_of_the_library/openCV/video/HoldARedThing.mp4')

    while(True):
        ret,frame = capture.read()

        if(ret==False):  # OpenCV会不断读取视频中的东西，直到播放完毕，就在这里，退出。
            break
        hsv = cv.cvtColor(frame,cv.COLOR_BGR2HSV)  # 将获取的图片，RGB色彩空间转换为HSV色彩空间
        lower_hsv = np.array([0, 43, 36])
        upper_hsv = np.array([10, 255, 255])
        mask = cv.inRange(hsv,lowerb=lower_hsv, upperb=upper_hsv)
        cv.imshow('video', frame)
        cv.imshow('mask', mask)
        c = cv.waitKey(40)
        if(c==27):
            break


def three_type(image):
    b, g, r = cv.split(image)  # 分出三个通道
    cv.imshow('blue', b)  # 显示蓝色通道
    cv.imwrite('example/0_Basic_usage_of_the_library/openCV/result/4-2blue.png', b)
    cv.imshow('green', g)  # 显示绿色通道
    cv.imwrite('example/0_Basic_usage_of_the_library/openCV/result/4-2green.png', g)
    cv.imshow('red', r)  # 显示红色通道
    cv.imwrite('example/0_Basic_usage_of_the_library/openCV/result/4-2red.png', r)
    
    image[:, :, 0]=0  # 把一个通道弄没
    cv.imshow('split change', image)
    cv.imwrite('example/0_Basic_usage_of_the_library/openCV/result/4-2split_change.png', image)
    
    image = cv.merge([b, g, r])  # 将三个通道合在一起，就会变成原本的图片
    cv.imshow('mix again', image)
    cv.imwrite('example/0_Basic_usage_of_the_library/openCV/result/4-2mix_again.png', image)


src = cv.imread('example/0_Basic_usage_of_the_library/openCV/picture/zombe540x540.jpg')
cv.namedWindow('inputImage', cv.WINDOW_AUTOSIZE)
cv.imshow('inputImage', src)

three_type(src)
extrace_object_demo()

cv.waitKey(0)
cv.destroyAllWindows()
        
#!/user/bin/env python3
#!-*- coding:utf-8 -*-
'''
Created on 2018年3月13日

@author: recluse
'''
import cv2 as cv
import numpy as np

def access_pixels(image):  # 属性读取。像素点读取,并修改。
    print(image.shape)
    height = image.shape[0]  # 高
    print('height（高）:',height)
    width = image.shape[1]  # 宽
    print('width（宽）:',width)
    channels = image.shape[2]  # 通道数，一般顺序为：蓝绿红三色通道。
    print('channels(通道数):',channels)
    for row in range(height):  # 依次遍历高宽通道，以达到遍历每个像素点的目的
        for col in range(width):
            for c in range(channels):
                pv = image[row,col,c]
                image[row,col,c] = 255 -pv  # 改像素点
                # 实际上这里是取反
    cv.imshow('pixels_demo',image)
    cv.imwrite('example/0_Basic_usage_of_the_library/openCV/result/3-2pixels.png', image)

def inverse(image):  # 使用openCV提供的API来取反,用这个API，会比上面那种快非常多。
    dst = cv.bitwise_not(image)
    cv.imshow('inverse_demo',dst)
    cv.imwrite('example/0_Basic_usage_of_the_library/openCV/result/3-2inverse.png', dst)

def creat_image():  # 创造一张图片
    img = np.zeros([400,400,3],np.uint8)#实际上创建了一张400×400，三色通道的图片
    #  需要注意的是，np.uint8，最多让颜色支持0-255，当所给的数值超出这个范围，系统会按照二进制数截取前面的数来保留
    #  uint8、float32
    img[:,:,0]  =   np.ones([400,400]) * 255  # 这里改三色通道中的一个为255
    cv.imshow('creat_image',img)
    cv.imwrite('example/0_Basic_usage_of_the_library/openCV/result/3-2creat.png', img)

src = cv.imread('example/0_Basic_usage_of_the_library/openCV/picture/buleeyeswhite.png')
cv.namedWindow('inputImage',cv.WINDOW_AUTOSIZE)
cv.imshow('inputImage',src)

start_time = cv.getTickCount()  # 获取CPU时间

access_pixels(src)
inverse(src)
creat_image()

end_time = cv.getTickCount()  # 获取CPU时间
spend_time = (end_time-start_time)/cv.getTickFrequency()
print('time:',spend_time,end = 's')  # 两次时间相减,除频率，得到这次运算花费的时间


cv.waitKey(0)
cv.destroyAllWindows()
#!/user/bin/env python3
#!-*- coding:utf-8 -*-
'''
Created on 2018年3月18日

@author: recluse
'''
import cv2 as cv
import numpy as np

def add_demo(m1,m2):#相加，两个大小通道一样的图片叠加在一起。
    dst = cv.add(m1,m2)#叠加
    cv.imshow('add_demo',dst)#展示
    cv.imwrite('result/5-1add.png',dst)
    #叠加完会发现黑色的部分没有变化，而白色的地方被覆盖为白色，那是因为。白色=255,黑色=0.
    #当两个相加，黑色部分相当于+0,白色部分相当于+255。
    #+0的不会有改变，+255的会溢出，然后被系统截断，再次变成255.
    #于是白色还是白色，黑色什么都没发生的情况。

def subtract_demo(m1,m2):#减
    dst = cv.subtract(m1,m2)#叠加
    cv.imshow('subtract_demo',dst)#展示
    cv.imwrite('result/5-1subtract.png',dst)
    #类似于上面的相加。你可以想象到结果是怎么样子的。
    #黑色的部分，无论-0，没意义。白色部分-255,结果<=0，转换为0.

def divide_demo(m1,m2):#除法
    dst = cv.divide(m1,m2)
    cv.imshow('divide_demo',dst)#展示
    cv.imwrite('result/5-1divide.png',dst)
    #类似的，除法....

def multiply_demo(m1,m2):#乘法
    dst = cv.multiply(m1,m2)
    cv.imshow('multiply_demo',dst)#展示
    cv.imwrite('result/5-1multiply.png',dst)
    #类似的，乘法....

def others(m1,m2):#其他项
    m1, dev1 = cv.meanStdDev(m1)#函数求平均值与方差
    m2, dev2 = cv.meanStdDev(m2)
    print('平均值：')
    print(m1)
    print(m2)
    print('方差：')
    print(dev1)
    print(dev2)
    
    #造一张图片
    h,w = m1.shape[:2]#获取图片的宽高，并以此创建一个宽高一致的东西。
    img = np.zeros([h,w],np.uint8)
    m,dev = cv.meanStdDev(img)
    print('new thing:')
    print('均值：',m)
    print('方差:',dev)
    

src1 = cv.imread('picture/angle1.jpg')
src2 = cv.imread('picture/angle2.jpg')
src3 = cv.imread('picture/angle_mask.jpg')
#想进行运算，先看看大小、通道是否一致，否则可能会出问题。
print(src1.shape)
print(src2.shape)
print(src3.shape)
#显示原本的三张图片
cv.imshow('src1',src1)
cv.imshow('src2',src2)
cv.imshow('src3',src3)


add_demo(src2, src3)#正规叠加测试
subtract_demo(src2, src3)#正规减测试
divide_demo(src2, src3)#正规除测试
multiply_demo(src2,src3)#正规乘测试
#当你进行乘、除测试，你会发现那些东西的周围有零星不一样的像素，这是由于mask图片有反锯齿效果（平滑，模糊）,周围有些像素不位0
others(src2,src3)

#add_demo(src1, src2)#瞎搞


cv.waitKey(0)
cv.destroyAllWindows()
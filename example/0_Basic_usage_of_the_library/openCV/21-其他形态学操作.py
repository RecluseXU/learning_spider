#!/user/bin/env python3
#!-*- coding:utf-8 -*-
'''
Created on 2018年3月28日

@author: RecluseXu
'''
import cv2 as cv
import numpy as np

def top_hat_demo(image):
    gray = cv.cvtColor(image,cv.COLOR_BGR2GRAY)
    kernel = cv.getStructuringElement(cv.MORPH_RECT,(5,5))
    dst = cv.morphologyEx(gray,cv.MORPH_TOPHAT,kernel)
    cv.imshow('tophat',dst)

def black_hat_demo(image):
    gray = cv.cvtColor(image,cv.COLOR_BGR2GRAY)
    kernel = cv.getStructuringElement(cv.MORPH_RECT,(5,5))
    dst = cv.morphologyEx(gray,cv.MORPH_BLACKHAT,kernel)
    cv.imshow('blackhat',dst)

def base_gradient_demo(image):#基本梯度
    gray = cv.cvtColor(image,cv.COLOR_BGR2GRAY)
    ret,binary = cv.threshold(gray,0,255,cv.THRESH_BINARY)
    kernel = cv.getStructuringElement(cv.MORPH_RECT,(5,5))
    dst = cv.morphologyEx(binary,cv.MORPH_BLACKHAT,kernel)
    cv.imshow('blackhat',dst)

def gradient_demo(image):
    kernel = cv.getStructuringElement(cv.MORPH_RECT,(2,2))
    dm = cv.dilate(image, kernel)
    em = cv.dilate(image, kernel)
    dst1 = cv.subtract(image,em) # 内梯度
    dst2 = cv.subtract(dm,image) # 外梯度
    cv.imshow('internal',dst1)
    cv.imshow('external',dst2)

src = cv.imread('example/0_Basic_usage_of_the_library/openCV/picture/goodmancard.jpg')
cv.imshow('src',src)

top_hat_demo(src.copy())
black_hat_demo(src.copy())
gradient_demo(src.copy())

cv.waitKey(0)
cv.destroyAllWindows()
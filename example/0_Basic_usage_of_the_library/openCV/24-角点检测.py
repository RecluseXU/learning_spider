#!/user/bin/env python3
#!-*- coding:utf-8 -*-
'''
Created on 2018年5月10日    
    Harris角点检测
@author: RecluseXu
'''

import cv2 as cv
import numpy as np

def cornerHarris_demo(img):
    gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
    # 灰度
    gray = np.float32(gray) 
    # 图像转换为float32    
    dst = cv.cornerHarris(gray, 2, 3, 0.04)
    # 角点检测
    # 使用函数 cv2.cornerHarris()
    # 参数如下：
    #     img 输入图像，数据类型为float32
    #     blockSize 角点检测当中的邻域值。
    #     ksize 使用Sobel函数求偏导的窗口大小
    #     k 角点检测参数，取值为0.04到0.06
    #  result is dilated for marking the corners, not important
    
    # 这里的dst其实就是一个个角度分数R组成的
    #     当 λ 1 和 λ 2 都很大，并且 λ 1 ～λ 2 中的时，R 也很大，（λ 1 和 λ 2 中的最小值都大于阈值）说明这个区域是角点。
    
    # 这里的打分值以大于0.01×dst中最大值为边界
    
    threshold = 0.01*dst.max() 
    # 这里是设定一个阈值，当大于这个阈值分数的都可以判定为角点
    # 这个值可以根据图像自己选取，不过如果太小的话，可能会多圈出几个不同的角点
    # 那么这里为什么要大于0.01*dst.max()呢　注意了这里R是一个很大的值
    # 我们选取里面最大的R，只要dst里面的值大于0.01倍的Ｒ的最大值，那么此时这个dst的Ｒ值也是很大的，就可以判定他为角点。
    result_plot_y, result_plot_x = np.where(dst > threshold)
    
    # 获取需要点的坐标
    # 这样获取到的矩阵都是1行的类型的
    result_plot_x = result_plot_x.reshape(result_plot_x.shape[0],1)
    result_plot_y = result_plot_y.reshape(result_plot_y.shape[0],1)
    # 将坐标都变成1列的类型
    # print(result_plot_x)
    # print(result_plot_y)
    result_plot = np.hstack((result_plot_x,result_plot_y))
    # 将x和y坐标结合起来
    # print('选择的的角点数：',len(result_plot))
    # print('角点',result_plot)
    
    
    # 在图像上画圆，展示出来
    for i in result_plot:
        cv.circle(img,(i[0],i[1]),1,(0,0,255),2)
    
    cv.imwrite('example/0_Basic_usage_of_the_library/openCV/result/24-cornerpoint.jpg',img)
    cv.imshow('dst',img)

img = cv.imread('example/0_Basic_usage_of_the_library/openCV/picture/angle2.jpg')
cv.imshow('img',img)

cornerHarris_demo(img)

cv.waitKey(0)
cv.destroyAllWindows()
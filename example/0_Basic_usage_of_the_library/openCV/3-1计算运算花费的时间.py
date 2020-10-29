#!/user/bin/env python3
#!-*- coding:utf-8 -*-
'''
Created on 2018年3月14日

@author: RecluseXU
'''
import cv2 as cv

class timecount(object):
    def start(self):
        self.starttime = cv.getTickCount()#获取CPU时间
    def end(self):
        self.endtime = cv.getTickCount()#获取CPU时间
    def count_spent(self):
        self.spenttime = (self.endtime-self.starttime)/cv.getTickFrequency()
        print('time:',self.spenttime,end = 's')

if __name__ == '__main__':
    clock = timecount()
    clock.start()
    z = 0
    for a in range(0,5000):
        z = z+a%10%9%7%5%3%2
    clock.end()
    clock.count_spent()
#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   spider.py
@Time    :   2020-8-1 22:00:44
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
@Desc    :   用Selenium处理SliderCaptcha
'''

# here put the import lib
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait
import cv2
from browsermobproxy import Server
import sys
sys.path.append(sys.path[0][:sys.path[0].find('example')-1])
from my_util.selenium.selenium_chrome import get_selenium_chrome_web_driver



class BrowsermobProxy(object):
    def __init__(self, browsermob_proxy_bat_location: str):
        self.server = Server(browsermob_proxy_bat_location, {'port': 9394})

    def get_proxy(self):
        return self.server.create_proxy()

    def start_server(self):
        self.server.start()

    def stop_server(self):
        self.server.stop()


def count_start_end_location(button_size, button_location, bar_size, bar_location):
    '''
    计算鼠标大致的起始坐标与终点坐标
    '''
    return [
        {'x': button_location['x']+button_size['width']/2, 'y': button_location['y']+button_size['height']/2},
        {'x': bar_location['x']+bar_size['width']-button_size['width']/2, 'y': bar_location['y']}
    ]


def get_track(start_locationn, end_location):
    '''
    计算偏移
        这里使用最简单的方法来获取偏移数组
        计算好距离以后，让鼠标每次移动2像素 匀速移动
    '''
    distance = int(end_location['x'] - start_locationn['x']) + 1
    return range(0, distance, 2)


def move_mouse(chrome_driver, ver_button, track):
    # 移动鼠标
    try:
        # 让鼠标点击并不放开滑块
        ActionChains(chrome_driver).click_and_hold(ver_button).perform()
        for x in track:
            # 让鼠标根据偏移数组，一点一点的移动鼠标
            ActionChains(chrome_driver).move_by_offset(xoffset=x, yoffset=0).perform()
        ActionChains(chrome_driver).release().perform()  # 释放鼠标
    except Exception:
        ActionChains(chrome_driver).release().perform()


def get_distance():
    img = cv2.imread('img.png')
    img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    # ret, thresh = cv2.threshold(img, 230, 255, cv2.THRESH_BINARY_INV)
    
    img = cv2.cornerHarris(img, 2, 3, 0.04)

    cv2.imshow('img', img)
    cv2.waitKey(100000)


def process():
    bp = BrowsermobProxy(browsermob_proxy_bat_location)
    _proxy = bp.get_proxy()
    _proxy.new_har(".picsum.photos", options={'captureHeaders': True, 'captureContent': True})

    chrome_driver = get_selenium_chrome_web_driver(proxy_server=str(_proxy.proxy))
    chrome_driver.get('http://127.0.0.1:5000/LearningSpider#!')
    wait = WebDriverWait(chrome_driver, 15)
    try:
        item_button = wait.until(
            EC.element_to_be_clickable((By.ID, "the_slidewrcaptcha")))
        item_button.click()
    except TimeoutException as e:
        print(e)
        exit(1)
    #  等待Ajax加载完毕

    wait.until(
        lambda x: EC.text_to_be_present_in_element((By.XPATH, "//*[@id=\"captcha\"]/div/span"), "滑动填充")(chrome_driver)
    )
    ver_button = wait.until(
        EC.element_to_be_clickable((By.XPATH, "//*[@id=\"captcha\"]/div/div[2]/div")))
    the_img = wait.until(
        EC.presence_of_element_located((By.XPATH, "//*[@id=\"captcha\"]/canvas[1]")))

    result = _proxy.har
    for entry in result['log']['entries']:
        _url = entry['request']['url']
        # 根据URL找到数据接口
        if "/api/v2/aweme/post" in _url:
            _response = entry['response']
            _content = _response['content']['text']
            # 获取接口返回内容
            print(_content)

    bp.stop_server()
    # the_img.screenshot("img.png")
    # get_distance()

    # start_location, end_location = count_start_end_location(ver_button.size, ver_button.location, slide_bar.size, slide_bar.location)
    # track = get_track(start_location, end_location)
    # move_mouse(chrome_driver, ver_button, track)


if __name__ == "__main__":
    process()

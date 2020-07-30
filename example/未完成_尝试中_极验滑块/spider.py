#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   spider.py
@Time    :   2020/07/28 18:52:07
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
@Desc    :   None
'''

# here put the import lib
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.wait import WebDriverWait
import sys
sys.path.append(sys.path[0][:sys.path[0].find('example')-1])
from my_util.selenium.selenium_chrome import get_selenium_chrome_web_driver
import time


def init_battle_state():
    webdriver = get_selenium_chrome_web_driver()
    wait = WebDriverWait(webdriver, 20)

    webdriver.get('https://v.6.cn/logins.php')
    email_input = wait.until(
        EC.element_to_be_clickable((By.ID, 'member-login-un')))
    email_input.send_keys('尝试过验证码')
    password_input = wait.until(
        EC.element_to_be_clickable((By.XPATH, '//input[@type="password"')))
    password_input.send_keys('只是为了刚验证码')

    verification_button = wait.until(
        EC.element_to_be_clickable((By.XPATH, '//*[@id="captchaIdLogin"]/div/div[2]')))
    verification_button.click()




if __name__ == "__main__":
    init_battle_state()
    time.sleep(10)
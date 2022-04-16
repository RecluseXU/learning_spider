# -*- encoding: utf-8 -*-
'''
@Time    :   2021-01-06
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   cookies
    代码登录,带着登录后得到的cookie去验证是否登录成功
'''
import urllib.request
from fake_useragent import UserAgent
from http import cookiejar


def load_data():
    # 登录url
    login_url = "http://www.mhwmod.com/wp-login.php"
    # 登录表单
    login_form_data = {
        'log': 'RecluseXu',
        'pwd': '123123123',
        'aio_special_field': '',
        'wp-submit': '登录',
        'redirect_to': 'http://www.mhwmod.com',
        'testcookie': '1'
    }
    print(login_form_data)
    # 将表单转码为可以识别的类型
    #       urllib.parse.urlencode方法：将字典编码成一个字符串
    #       原理就是首先把中文字符转换为十六进制，然后在每个字符前面加一个标识符%
    login_form_data_encode_str = urllib.parse.urlencode(login_form_data)
    #       后面Request中传递的数据参数是需要bytes类型，所以这里转两次
    login_form_data_encode_bytes = login_form_data_encode_str.encode("utf-8")
    print(type(login_form_data_encode_str))
    # 请求头
    ua = UserAgent()
    headers = {
        'User-Agent': ua.random,
        "Aim": "an offer",
        "Name": "Recluse",
    }
    # 创建cookiejar保存cookiejar
    cookie__jar = cookiejar.CookieJar()
    # 创建 有添加cookie功能的 处理器
    cook_handler = urllib.request.HTTPCookieProcessor(cookie__jar)
    # 根据处理器 生成oppener
    opener = urllib.request.build_opener(cook_handler)
    # 创建请求对象
    login_request = urllib.request.Request(
        login_url, headers=headers, data=login_form_data_encode_bytes)
    # 发送登录的请求，如果登录成功，cookiejar会自动保存cookie
    opener.open(login_request)
    # 用已经记录了cookie的
    homepage_url = "http://www.mhwmod.com"
    homepage_request = urllib.request.Request(homepage_url, headers=headers)
    response = opener.open(homepage_request)
    data = response.read().decode('utf-8')
    print(data)
    return data


data = load_data()
if(data is not None):
    location = "python/urllib/spider_resoult/10.html"
    with open(location, "w", encoding='utf-8') as f:
        f.write(data)

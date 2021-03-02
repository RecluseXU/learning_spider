#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   2_6_response_cookies.py
@Time    :   2021-02-23
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   Cookies
'''

# here put the import lib
import httpx

# 从响应中获取
r = httpx.get('http://httpbin.org/cookies/set?chocolate=chip', allow_redirects=False)
print(r.cookies['chocolate'])


# 请求时设置(简易)
cookies = {"peanut": "butter"}
r = httpx.get('http://httpbin.org/cookies', cookies=cookies)
print(r.json())


# 请求时设置(标准)
cookies = httpx.Cookies()
cookies.set('cookie_on_domain', 'hello, there!', domain='httpbin.org')
cookies.set('cookie_off_domain', 'nope.', domain='example.org')
r = httpx.get('http://httpbin.org/cookies', cookies=cookies)
print(r.json())

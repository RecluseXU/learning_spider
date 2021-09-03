# -*- encoding: utf-8 -*-
'''
@Time    :   2021-02-23
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   重定向
'''

# here put the import lib
import httpx

# 由http跳转到https
r = httpx.get('http://github.com/')
print(r.url)
print(r.status_code)
print(r.history)

# 如果不想要跳转，那么可以设置
r = httpx.get('http://github.com/', allow_redirects=False)
print(r.status_code)
print(r.history)

# 在使用head方式发送请求时，也能用这个参数来启用跳转
r = httpx.head('http://github.com/', allow_redirects=True)
print(r.url)
print(r.history)

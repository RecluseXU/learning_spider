# -*- encoding: utf-8 -*-
'''
@Time    :   2021-02-23
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   授权验证
'''

# here put the import lib
import httpx


# 明文身份验证
# 2个元组的纯文本str或bytes对象作为auth参数传递给请求函数
httpx.get("https://example.com", auth=("my_user", "password123"))

# Digest 身份验证
auth = httpx.DigestAuth("my_user", "password123")
httpx.get("https://example.com", auth=auth)

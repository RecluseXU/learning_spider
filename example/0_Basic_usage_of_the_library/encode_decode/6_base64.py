#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   0.py
@Time    :   2020-8-21 00:42:47
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
@Desc    :   基础的base64编码与解码
'''
import base64


def str_to_Base64(text: str):
    bytes_text = text.encode("utf-8")
    b64_text = base64.b64encode(bytes_text)  # 被编码的参数必须是二进制数据
    print(b64_text)
    return b64_text


def Base64_to_str(b64_text: str):
    str_text = base64.b64decode(b64_text).decode("utf-8")
    print(str_text)


if __name__ == '__main__':
    str_to_Base64('e44834e4328438e2')
    # Base64_to_str('')

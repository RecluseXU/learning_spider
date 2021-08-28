# -*- encoding: utf-8 -*-
'''
@Time    :   2020-08-21
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   基础的base64编码与解码用例
'''

# here put the import lib

import base64


def base64_to_bytes(b64_text: str) -> bytes:
    str_bytes = base64.b64decode(b64_text)
    return str_bytes


def str_to_Base64(text: str) -> bytes:
    bytes_text = text.encode("utf-8")
    return bytes_to_Base64(bytes_text)


def bytes_to_Base64(bytes_text: bytes) -> bytes:
    return base64.b64encode(bytes_text)  # 被编码的参数必须是二进制数据


def base64_str_to_str(b64_text: str) -> str:
    str_text = base64.b64decode(b64_text).decode("utf-8")
    return str_text


def base64_to_img(b64_text: str) -> bytes:
    _bytes = base64_to_bytes(b64_text)
    with open('f.png', 'wb') as f:
        f.write(_bytes)


if __name__ == '__main__':
    print(str_to_Base64('e44834e4328438e2'))
    # base64_to_img('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC')
    print(bytes_to_Base64(b'y8_T\x1d\xc2\x86\x11\xc3\xab\xc2\x9f\xc2\xa1T\xc3\xaeu\xc3\x83\xc2\x85P'))

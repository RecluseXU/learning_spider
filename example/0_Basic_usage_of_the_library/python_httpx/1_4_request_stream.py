# -*- encoding: utf-8 -*-
'''
@Time    :   2021-02-23
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   面对大文件下载之类的情况，可以使用流式
'''

# here put the import lib
import httpx


# 二进制
with httpx.stream("GET", "https://www.example.com") as r:
    for data in r.iter_bytes():
        print(data)

# 文本
with httpx.stream("GET", "https://www.example.com") as r:
    for text in r.iter_text():
        print(text)

# 多行文本
with httpx.stream("GET", "https://www.example.com") as r:
    for line in r.iter_lines():
        print(line)

# 响应源码
# 未被经过 gzip, deflate, brotli 解压缩的源码
with httpx.stream("GET", "https://www.example.com") as r:
    for chunk in r.iter_raw():
        print(chunk)

# 如果您以任何上述方式使用流式响应，则response.content和response.text属性将不可用，并且在访问时会引发错误。
# 但是，你可以使用响应流功能来有条件地加载响应主体：
with httpx.stream("GET", "https://www.example.com") as r:
    if r.headers['Content-Length'] < 99:
        r.read()
        print(r.text)

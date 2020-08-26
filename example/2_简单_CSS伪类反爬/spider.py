#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   spider.py
@Time    :   2020-8-26 17:57:37
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
'''

# here put the import lib
import requests
import re


def main():
    # 访问网页
    response = requests.get('http://learnspider.evilrecluse.top:5001/api/Inner?block=Index&keyword=css_pseudo_classes')
    html = response.content.decode('utf-8')

    pattern = re.compile(r'.skill_manifesto::after[\s\S]*?content[\s\S]*?"(.*?)\\";[\s\S]*?.skill_name::before[\s\S]*?content[\s\S]*?"(.*?)\\";')
    re_result = re.findall(pattern, html)[0]
    # print(re_result)
    return '!'.join(map(
        lambda x: x.replace('\\\\', '\\').encode('utf-8').decode("unicode_escape"),
        re_result))


if __name__ == '__main__':
    print(main())
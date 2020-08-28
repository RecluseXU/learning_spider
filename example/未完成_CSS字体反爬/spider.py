#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   spider.py
@Time    :   2020/08/28 12:23:02
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
@Desc    :   58同城
'''

# here put the import lib
import requests
from lxml import etree
import base64
from fontTools.ttLib import TTFont
from io import BytesIO
import re


class House(object):
    def __init__(self, url, img_url, title, money, **other_arg):
        self.url = url
        self.img_url = img_url
        self.title = title
        self.money = money

        for key, val in other_arg.items():
            setattr(self, key, val)

    def attributes_to_dict(self) -> dict:
        '''
        返回自行定义的属性信息
        '''
        attributes_name = list(filter(lambda x: x.find('__') == -1 and not callable(self.__getattribute__(x)), self.__dir__()))
        attributes_value = map(lambda x: self.__getattribute__(x), attributes_name)
        return dict(zip(attributes_name, attributes_value))


def get_html():
    '''
    获取html
    '''
    print('获取html')
    try:
        with open('example/未完成_CSS字体反爬/page.html', 'r', encoding="utf-8")as f:
            html = f.read()
            print('\t从文件记录中获取')
            return html
    except Exception as e:
        print(e)

    url = "https://zz.58.com/pinpaigongyu/?PGTID=0d100000-0015-67c3-83d7-b399b3d22b73&ClickID=4"

    payload = {}
    headers = {
        'authority': 'zz.58.com',
        'pragma': 'no-cache',
        'cache-control': 'no-cache',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-user': '?1',
        'sec-fetch-dest': 'document',
        'referer': 'https://zz.58.com/?PGTID=0d3111f6-0015-6224-8072-520b7f94e0bd&ClickID=1',
        'accept-language': 'zh-CN,zh;q=0.9',
        'cookie': r'f=n; commontopbar_new_city_info=342%7C%E9%83%91%E5%B7%9E%7Czz; id58=c5/nfF9H4ApGWoKXCNYzAg==; 58tj_uuid=74d907c7-19e8-4a07-bbc7-15f92e43aaa3; wmda_new_uuid=1; wmda_uuid=b9d3b4764e284d371e883a06257fdcf6; wmda_visited_projects=%3B11187958619315; new_uv=2; wmda_session_id_11187958619315=1598586819401-7b6d0cf9-c815-c1e1; xxzl_deviceid=fVPNop5ZEzNJFgycdRXuHD%2BSUMTkdblUpMcfyT6li2Rk6UvSZBBZqZeSKpsE2Gom; new_session=0; utm_source=sem-baidu-pc; init_refer=; spm=105916146708.26420796287; Hm_lvt_dcee4f66df28844222ef0479976aabf1=1598586941; f=n; als=0; commontopbar_new_city_info=342%7C%E9%83%91%E5%B7%9E%7Czz; 58home=zz; city=zz; commontopbar_ipcity=gz%7C%E5%B9%BF%E5%B7%9E%7C0; sessionid=4af2312e-c30d-4241-9842-176977c5c61d; xxzl_cid=62d1d504fa5f4b99988904d5045ac42e; xzuid=93bc3f8f-6f5b-47cf-8c95-1408bbff2699; ppStore_fingerprint=8FF8C9C64E735DCC9495EC610D9B1C3423199F89D1F3AC45%EF%BC%BF1598588629639; Hm_lpvt_dcee4f66df28844222ef0479976aabf1=1598588630; xzfzqtoken=6YBH78sMNv2CUQW62%2BaPZ3g9CBkdPq2xMTKMXtjSjaQqiqp4Xc9S%2BsN09j%2FPTv1Fin35brBb%2F%2FeSODvMgkQULA%3D%3D'
    }

    response = requests.request("GET", url, headers=headers, data=payload)
    html = response.content.decode('utf-8')
    print('\t爬虫获取.....', end="")

    with open('example/未完成_CSS字体反爬/page.html', 'w', encoding="utf-8")as f:
        print('html已保存.....')
        f.write(html)
    return html


def get_font_ttf(html: str):
    '''
    解析字体内容
    '''
    print('正在从html中获取字体信息')
    pattern = re.compile(r"font-family:'fangchan-secret';[\s\S]+?data:application/font-ttf;[\s\S]+?;(.*?),(.*?)'\)")
    font_info_b64 = re.findall(pattern, html)
    print(font_info_b64[0])

    font_info = base64.b64decode(font_info_b64[0][1])
    with open('example/未完成_CSS字体反爬/58_font.ttf', 'wb')as f:
        f.write(font_info)
        print('字体内容解码完毕，已保存ttf文件')
    return font_info


def font_data(font_info):
    '''
    获取字体字典
    '''
    print('分析字体信息')
    print('生成字体对象')
    font = TTFont(BytesIO(font_info))
    print(font)

    print('生成字体xml记录方便查看')
    font.saveXML("example/未完成_CSS字体反爬/58_font.xml")

    convert_u2mid_dict = font['cmap'].tables[0].ttFont.tables['cmap'].tables[0].cmap
    print('将编码记录与字符记录整合为一个字典{unicode值：记录值}', convert_u2mid_dict)

    font_value_meaning = {'glyph00001': 0, 'glyph00002': 1,  'glyph00003': 2, 'glyph00004': 3, 'glyph00005': 4, 'glyph00006': 5, 'glyph00007': 6, 'glyph00008': 7, 'glyph00009': 8, 'glyph00010': 9}
    print('软件中查看图像后编写记录值与实际值对应表', font_value_meaning)

    convert_u2val_dict = {}
    for _key, _val in convert_u2mid_dict.items():
        _key = '&#x' + str(chr(_key).encode('unicode_escape'))[5:-1] + ';'
        convert_u2val_dict[_key] = font_value_meaning[_val]
    print('将上面两个表合并，将键从unicode值改为html转义后的unicode字符，将记录值改为真实值', convert_u2val_dict)

    return convert_u2val_dict


def conver_html(html_str, convert_u2val_dict):
    '''
    将html中自定义字体值转为真实值
    '''
    print('将html中自定义字体值转为真实值')
    for word, value in convert_u2val_dict.items():
        html_str = html_str.replace(word, str(value))
    return html_str


def get_house_info(html: str):
    '''
    从网页中获取房子数据
    '''

    def _c(_str):
        return _str.strip().replace(' ', '').replace('\n', '')

    page = etree.HTML(html)
    for el_li in page.xpath('/html/body/div[5]/ul/li/a'):

        room = el_li.xpath('./div/p[@class="room"]/text()')[0]
        room = list(map(lambda x: x.strip().replace(' ', ''), room.split('\xa0')))
        room = {'space': room[0], 'area': room[2], 'toward': room[3]}

        money = _c(el_li.xpath('./div[@class="money"]/span/b/text()')[0] + ''.join(el_li.xpath('./div[@class="money"]/span/text()')))

        house = House(
            url=el_li.xpath('./@href')[0],
            img_url='https' + el_li.xpath('./div[@class="img"]/img[@lazy_src]/@lazy_src')[0],
            title=el_li.xpath('./div[@class="img"]/img[@lazy_src]/@alt')[0],
            money=money,
            room=room,
            location=_c(''.join(el_li.xpath('./div/p[@class="dist"]/text()'))),
            tag=el_li.xpath('./div/p[@class="spec"]/span/text()')[0]
        )
        print(house.attributes_to_dict())


def process():
    html_str = get_html()
    font_info = get_font_ttf(html_str)
    convert_u2val_dict = font_data(font_info)
    html_str = conver_html(html_str, convert_u2val_dict)

    get_house_info(html_str)


if __name__ == "__main__":
    process()

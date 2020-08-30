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
import json
import time

file_folder = 'example/3_简单_58同城品牌公寓/res/'
info_num = 0
convert_u2val_dict = {}


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


def get_first_html():
    '''
    获取第一张html
    '''
    print('获取html')
    try:
        with open(file_folder + 'html/page1.html', 'r', encoding="utf-8")as f:
            html = f.read()
            print('\t从文件记录中获取')
            return html
    except Exception as e:
        print(e)
    url = "https://gz.58.com/pinpaigongyu/?PGTID=0d100000-0000-3462-acc0-35291b60f49c&ClickID=2"

    payload = {}
    headers = {
        'authority': 'gz.58.com',
        'pragma': 'no-cache',
        'cache-control': 'no-cache',
        'upgrade-insecure-requests': '1',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'navigate',
        'sec-fetch-user': '?1',
        'sec-fetch-dest': 'document',
        'referer': 'https://gz.58.com/?PGTID=0d3111f6-0000-3512-4e91-62e91200a66b&ClickID=1',
        'accept-language': 'zh-CN,zh;q=0.9',
        'cookie': r'f=n; commontopbar_new_city_info=3%7C%E5%B9%BF%E5%B7%9E%7Cgz; id58=c5/nfF9H4ApGWoKXCNYzAg==; 58tj_uuid=74d907c7-19e8-4a07-bbc7-15f92e43aaa3; wmda_new_uuid=1; wmda_uuid=b9d3b4764e284d371e883a06257fdcf6; xxzl_deviceid=fVPNop5ZEzNJFgycdRXuHD%2BSUMTkdblUpMcfyT6li2Rk6UvSZBBZqZeSKpsE2Gom; als=0; sessionid=4af2312e-c30d-4241-9842-176977c5c61d; ppStore_fingerprint=8FF8C9C64E735DCC9495EC610D9B1C3423199F89D1F3AC45%EF%BC%BF1598588661736; wmda_visited_projects=%3B11187958619315%3B6333604277682; f=n; city=gz; 58home=gz; Hm_lvt_dcee4f66df28844222ef0479976aabf1=1598693779; commontopbar_new_city_info=3%7C%E5%B9%BF%E5%B7%9E%7Cgz; commontopbar_ipcity=gz%7C%E5%B9%BF%E5%B7%9E%7C0; new_uv=9; utm_source=; spm=; init_refer=https%253A%252F%252Fgz.58.com%252Fpinpaigongyu%252F%253FPGTID%253D0d100000-0000-3102-2fc8-ec2d9dbdd5df%2526ClickID%253D2; new_session=0; wmda_session_id_11187958619315=1598758011501-7f88b862-ed9a-2bee; xxzl_cid=62d1d504fa5f4b99988904d5045ac42e; xzuid=93bc3f8f-6f5b-47cf-8c95-1408bbff2699; Hm_lpvt_dcee4f66df28844222ef0479976aabf1=1598758014; xzfzqtoken=VWF573%2Fpl7dtzFeAs1IBx2cCGM4CIN2%2FSGldIANJta7heBPjXpAuVzW9h9JfEavqin35brBb%2F%2FeSODvMgkQULA%3D%3D'
    }

    response = requests.request("GET", url, headers=headers, data=payload)
    html = response.text
    with open(file_folder + 'html/page1.html', 'w', encoding="utf-8")as f:
        print('html已保存.....')
        f.write(html)
    return html


def get_html(page_num: int):
    '''
    获取余下的html
    '''
    print('获取html')
    try:
        with open(file_folder + 'html/page' + str(page_num) + '.html', 'r', encoding="utf-8")as f:
            html = f.read()
            print('\t从文件记录中获取')
            return html
    except Exception as e:
        print(e)

    url = "https://gz.58.com/pinpaigongyu/pn/" + str(page_num) + "/?PGTID=0d100000-0000-3462-acc0-35291b60f49c&ClickID=2&segment=true&encryptData=d_5friq6cZJAIcJ5Vfvh6INzSkI88Jyv7QDfhxVnFZKIvVbN4ADP1fd3Z7KYSEHqmOqfSn1iBAbIb61Ayut4KoFtJIzmSG_s2MAK5dAKFmsEkXBwFE3-rSlmmOQwj6bE"

    payload = {}
    headers = {
        'authority': 'gz.58.com',
        'pragma': 'no-cache',
        'cache-control': 'no-cache',
        'accept': 'text/html, */*; q=0.01',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
        'x-requested-with': 'XMLHttpRequest',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        'referer': 'https://gz.58.com/pinpaigongyu/?PGTID=0d100000-0000-3462-acc0-35291b60f49c&ClickID=2',
        'accept-language': 'zh-CN,zh;q=0.9',
        'cookie': 'f=n; f=n; commontopbar_new_city_info=3%7C%E5%B9%BF%E5%B7%9E%7Cgz; id58=c5/nfF9H4ApGWoKXCNYzAg==; 58tj_uuid=74d907c7-19e8-4a07-bbc7-15f92e43aaa3; wmda_new_uuid=1; wmda_uuid=b9d3b4764e284d371e883a06257fdcf6; xxzl_deviceid=fVPNop5ZEzNJFgycdRXuHD%2BSUMTkdblUpMcfyT6li2Rk6UvSZBBZqZeSKpsE2Gom; als=0; sessionid=4af2312e-c30d-4241-9842-176977c5c61d; ppStore_fingerprint=8FF8C9C64E735DCC9495EC610D9B1C3423199F89D1F3AC45%EF%BC%BF1598588661736; wmda_visited_projects=%3B11187958619315%3B6333604277682; f=n; city=gz; 58home=gz; Hm_lvt_dcee4f66df28844222ef0479976aabf1=1598693779; commontopbar_new_city_info=3%7C%E5%B9%BF%E5%B7%9E%7Cgz; commontopbar_ipcity=gz%7C%E5%B9%BF%E5%B7%9E%7C0; new_uv=9; utm_source=; spm=; init_refer=https%253A%252F%252Fgz.58.com%252Fpinpaigongyu%252F%253FPGTID%253D0d100000-0000-3102-2fc8-ec2d9dbdd5df%2526ClickID%253D2; new_session=0; wmda_session_id_11187958619315=1598758011501-7f88b862-ed9a-2bee; xxzl_cid=62d1d504fa5f4b99988904d5045ac42e; xzuid=93bc3f8f-6f5b-47cf-8c95-1408bbff2699; Hm_lpvt_dcee4f66df28844222ef0479976aabf1=1598758020; xzfzqtoken=0R1Uhzrxv9gTlrAAtHYlfvX5qBHHwirv1kOWHX%2BgM2Vcz6R7vP5BpZNVofjuvY5uin35brBb%2F%2FeSODvMgkQULA%3D%3D'
    }

    print('访问', url)
    response = requests.request("GET", url, headers=headers, data=payload)
    html = response.text
    print('\t爬虫获取.....', end="")

    with open(file_folder + 'html/page' + str(page_num) + '.html', 'w', encoding="utf-8")as f:
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
    with open(file_folder + '58_font.ttf', 'wb')as f:
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
    font.saveXML(file_folder + "58_font.xml")

    convert_u2mid_dict = font['cmap'].tables[0].ttFont.tables['cmap'].tables[0].cmap
    print('将编码记录与字符记录整合为一个字典{unicode值：记录值}', convert_u2mid_dict)

    # 此处有多种选择方式
    # * 可以从xml里拿到坐标，然后matlap画图做ocr
    # * 可以记录坐标特征，下次碰到识别坐标特征就反推关系
    # * 可以用百度字体编辑器手工处理
    # 由于这个字体是固定不变的，这里选择用百度字体编辑器的方式得到结果
    baidu_font_dict = {'9fa4': 0, '9ea3': 1, '9f92': 2, '993c': 3, '9a4b': 4, '958f': 5, '9476': 6, '9e3a': 7, '9fa5': 8, '9f64': 9}

    print('字典key转16进unicode html转义')
    convert_uh2val_dict = {}
    for _key, _val in convert_u2mid_dict.items():
        _key = hex(_key)
        convert_uh2val_dict['&#x' + _key[2:] + ';'] = baidu_font_dict[_key[2:]]
    print(convert_uh2val_dict)

    return convert_uh2val_dict


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
    global info_num

    def _c(_str):
        return _str.strip().replace(' ', '').replace('\n', '')

    print('解析html数据')
    page = etree.HTML(html)
    info_dict = {}
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
        # print(house.attributes_to_dict()['title'])
        info_dict[info_num], info_num = house, info_num+1
    print('解析完毕一共 ', len(info_dict), '条记录')
    return info_dict


def process(page_num: int):
    global convert_u2val_dict
    if page_num == 1:
        html_str = get_first_html()
        font_info = get_font_ttf(html_str)
        convert_u2val_dict = font_data(font_info)
    else:
        html_str = get_html(page_num)
    html_str = conver_html(html_str, convert_u2val_dict)
    info_dict = get_house_info(html_str)
    return info_dict


if __name__ == "__main__":
    house_info_dict = dict()
    for i in range(1, 5):
        info_dict = house_info_dict.update(process(i))
        time.sleep(1)
    info_list = [house.attributes_to_dict() for house in house_info_dict.values()]
    with open(file_folder + 'house_info.json', 'w', encoding='utf-8')as f:
        f.write(json.dumps(info_list, indent=4, ensure_ascii=False))

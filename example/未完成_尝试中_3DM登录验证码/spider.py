#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   spider.py
@Time    :   2020/07/28 15:58:50
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
@Desc    :   None
'''

# here put the import lib
import requests
import time
from urllib.parse import urljoin


headers = {
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
        'x-requested-with': 'XMLHttpRequest',
    }


def init_battle_state(user_name: str, user_password: str):
    sess = requests.session()
    sess.get('https://bbs.3dmgame.com/forum.php')

    url = 'https://bbs.3dmgame.com/member.php'
    params = {
        'mod': 'logging',
        'action': "login",
        'referer': '',
        'infloat': 'yes',
        'handlekey': 'login',
        'inajax': 1,
        'ajaxtarget': 'fwin_content_login',
    }
    
    response = sess.get(url, params=params, headers=headers)



if __name__ == "__main__":
    user_name = 'Nice3DM_1198140'
    user_password = 'Aa4634035'
    init_battle_state(user_name, user_password)
    time.sleep(10)
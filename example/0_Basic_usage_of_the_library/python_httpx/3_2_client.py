#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   3_2_client.py
@Time    :   2021-03-01
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   Client实例
'''

# here put the import lib
import httpx

def client():
    """
    Client基础使用方法
    """
    with httpx.Client() as client:
        r = client.get('https://example.com')

def client_share_config():
    """
    Client共享配置
    """
    headers = {'X-Auth': 'from-client'}
    params = {'client_id': 'client1'}
    with httpx.Client(headers=headers, params=params) as client:
        headers = {'X-Custom': 'from-request'}
        params = {'request_id': 'request1'}
        r = client.get('https://example.com', headers=headers, params=params)

    print(r.request.url)
    print(r.request.headers['X-Auth'])
    print(r.request.headers['X-Custom'])


def client_merge_config():
    """
    配置合并
    """
    headers = {'X-Auth': 'from-client'}
    params = {'client_id': 'client1'}
    with httpx.Client(headers=headers, params=params) as client:
        headers = {'X-Custom': 'from-request'}
        params = {'request_id': 'request1'}
        r = client.get('https://example.com', headers=headers, params=params)

    print(r.request.url)
    print(r.request.headers['X-Auth'])
    print(r.request.headers['X-Custom'])

    with httpx.Client(auth=('tom', 'mot123')) as client:
        r = client.get('https://example.com', auth=('alice', 'ecila123'))

    _, _, auth = r.request.headers['Authorization'].partition(' ')
    import base64
    print(base64.b64decode(auth))


def client_base_url():
    """
    基础URL
    """
    with httpx.Client(base_url='http://httpbin.org') as client:
        r = client.get('/headers')

    print(r.request.url)


client()
client_share_config()
client_merge_config()
client_base_url()

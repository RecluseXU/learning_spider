#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   3_4_event_hook.py
@Time    :   2021-03-01
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   事件钩子
'''

# here put the import lib
import httpx
from tqdm import tqdm
import tempfile

def event_hook_base():
    """
    事件钩子基础使用方法
    """
    def log_request(request):
        print(f"Request event hook: {request.method} {request.url} - Waiting for response")

    def log_response(response):
        request = response.request
        print(f"Response event hook: {request.method} {request.url} - Status {response.status_code}")

    with httpx.Client(event_hooks={'request': [log_request], 'response': [log_response]}) as client:
        client.get('https://example.com')


def event_hook_many_func():
    '''
    多个函数
    '''
    def log_request(request):
        print(f"Request event hook: {request.method} {request.url} - Waiting for response")

    def log_response_method(response):
        request = response.request
        print(f"Response event hook 1: ", request.method)
    
    def log_response_url(response):
        request = response.request
        print("Response event hook 2: ", request.url)

    with httpx.Client(event_hooks={'request': [log_request], 'response': [log_response_method, log_response_url]}) as client:
        client.get('https://example.com')


def event_hook_tqdm():
    """
    事件钩子结合tqdm 实现文件下载进度显式
    """
    with tempfile.NamedTemporaryFile() as download_file:
        url = "https://speed.hetzner.de/100MB.bin"
        with httpx.stream("GET", url) as response:
            total = int(response.headers["Content-Length"])

            with tqdm(total=total, unit_scale=True, unit_divisor=1024, unit="B") as progress:
                num_bytes_downloaded = response.num_bytes_downloaded
                for chunk in response.iter_bytes():
                    download_file.write(chunk)
                    progress.update(response.num_bytes_downloaded - num_bytes_downloaded)
                    num_bytes_downloaded = response.num_bytes_downloaded

event_hook_base()
event_hook_many_func()
event_hook_tqdm()
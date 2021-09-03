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
    """ 事件钩子基础使用方法
    """
    def log_request(request):
        msg = 'Request event hook: {} {} - Waiting for response'
        print(msg.format(request.method, request.url))

    def log_response(response):
        request = response.request
        msg = 'Response event hook: {} {} - Status {}'
        print(msg.format(request.method, request.url, response.status_code))

    event_hook = {'request': [log_request], 'response': [log_response]}
    with httpx.Client(event_hooks=event_hook) as client:
        client.get('https://example.com')


def event_hook_many_func():
    ''' 对同一个钩子设置多个函数
    '''
    def log_request(request):
        msg = 'Request event hook: {} {} - Waiting for response'
        print(msg.format(request.method, request.url))

    def log_response_method(response):
        request = response.request
        print(f"Response event hook 1: {request.method}")

    def log_response_url(response):
        request = response.request
        print(f'Response event hook 2: {request.url}')

    event_hook = {
        'request': [log_request],
        'response': [log_response_method, log_response_url]
    }
    with httpx.Client(event_hooks=event_hook) as client:
        client.get('https://example.com')


def event_hook_tqdm():
    """ 事件钩子结合tqdm 实现文件下载进度显式
    """
    with tempfile.NamedTemporaryFile() as download_file:
        url = "https://speed.hetzner.de/100MB.bin"
        with httpx.stream("GET", url) as response:
            total = int(response.headers["Content-Length"])

            with tqdm(total=total, unit_scale=True,
                      unit_divisor=1024, unit="B") as progress:
                finish_bytes = response.num_bytes_downloaded
                for chunk in response.iter_bytes():
                    download_file.write(chunk)
                    now_finish_bytes = response.num_bytes_downloaded
                    progress.update(now_finish_bytes - finish_bytes)
                    finish_bytes = now_finish_bytes


event_hook_base()
event_hook_many_func()
event_hook_tqdm()

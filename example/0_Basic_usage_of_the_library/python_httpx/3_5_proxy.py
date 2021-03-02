#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   3_5_proxy.py
@Time    :   2021-03-01
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   使用代理
'''

# here put the import lib
import httpx


def proxy_base():
    """
    代理的基础使用方法
    """
    proxies = {
        "http://": "http://localhost:8030",
        "https://": "http://localhost:8031",
    }

    with httpx.Client(proxies=proxies) as client:
        ... 


def proxy_route():
    """
    代理路由
    """
    proxies = {
        # 让所有请求都走这个代理
        "all://example.com": "http://localhost:8030",
        # 根据请求协议类型走不同的代理  
        "http://": "http://localhost:8030",
        "https://": "http://localhost:8031",
        # 指定url走不同的代理
        "all://example.com": "http://localhost:8030",
        # 指定域名走不同的代理
        "all://*example.com": "http://localhost:8030",
        # 指定子域名走不同代理  
        "all://*.example.com": "http://localhost:8030",
        # 指定端口走不同代理
        "https://example.com:1234": "http://localhost:8030",
        # 不走代理
        "all://example.com": None,
    }


def proxy_type():
    """
    检查代理类型
    """
    proxies = httpx.Proxy(
        url="https://localhost:8030",
        mode="TUNNEL_ONLY",  # 这个代理必须是隧道类型
    )

    with httpx.Client(proxies=proxies) as client:
        # This HTTP request will be tunneled instead of forwarded
        r = client.get("http://example.com")


proxy_base()
proxy_route()

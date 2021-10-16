# -*- encoding: utf-8 -*-
'''
@Time    :   2021-10-13
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   健壮的上游代理
实际上就是如果代理失效了能够从redis获取新的代理并且设置上去的上游代理而已

启动参考：
mitmdump --mode upstream:http://127.0.0.1:9567 -s upstream_proxy_robust.py --set proxy_origin_id="daili"
可传入参数 --set
redis_host
redis_port
redis_db
redis_password
'''

# here put the import lib
from mitmproxy import ctx
from mitmproxy.http import HTTPFlow
from mitmproxy.addonmanager import Loader
import time
import redis
import typing
import json


class UpstreamProxyRobust:
    """健壮的上游代理插件
    """
    activate = False
    redis_con = None
    proxy_origin_id = None
    proxy = None

    def change_proxy(self):
        """改变代理"""
        ctx.log.info('健壮上行代理: 更换代理')
        proxy = None
        while proxy is None:
            # 从代理池获取代理
            proxy = self.redis_con.lpop(self.proxy_origin_id)
            if proxy is None:
                ctx.log.info('健壮上行代理: 更换代理: 代理池中无可用代理, 等待重试')
                time.sleep(5)
                continue
            proxy = json.loads(proxy)
        ctx.log.info(f'健壮上行代理: 更换代理: 新代理{proxy}')
        self.proxy = proxy

    def load(self, loader: Loader):
        loader.add_option(
            name='proxy_origin_id',
            typespec=str,
            default='',
            help='代理源id',
        )
        loader.add_option(
            name="redis_host",
            typespec=typing.Optional[str],
            default='127.0.0.1',
            help='上行代理用于获取代理信息的redis的host',
        )
        loader.add_option(
            name="redis_port",
            typespec=typing.Optional[int],
            default=6379,
            help='上行代理用于获取代理信息的redis的port',
        )
        loader.add_option(
            name="redis_db",
            typespec=typing.Optional[int],
            default=0,
            help='上行代理用于获取代理信息的redis的db',
        )
        loader.add_option(
            name="redis_password",
            typespec=typing.Optional[str],
            default=None,
            help='上行代理用于获取代理信息的redis的密码',
        )
        self.needed_fields = {
            'proxy_origin_id', 'redis_host', 'redis_port',
            'redis_db', 'redis_password', 'proxy_origin_id',
        }

    def configure(self, updated):
        if self.needed_fields.difference(updated):
            return
        if self.redis_con:
            self.redis_con.close()
        self.redis_config = {
            'host': ctx.options.redis_host,
            'port': ctx.options.redis_port,
            'db': ctx.options.redis_db,
            'password': ctx.options.redis_password,
        }
        ctx.log.info(f'初始化健壮上行代理: Redis连接{self.redis_config}')
        self.redis_con = redis.Redis(**self.redis_config)
        self.proxy_origin_id = ctx.options.proxy_origin_id
        ctx.log.info(f'初始化健壮上行代理: 代理源:{self.proxy_origin_id}')

    def request(self, flow: HTTPFlow):
        if flow.request.method == "CONNECT":
            return
        if flow.live is False:
            return
        if self.proxy is None:
            # 无代理则刷代理
            self.change_proxy()
        auth = self.proxy["auth"]
        ctx.options.set(
            f'mode=upstream:http://{self.proxy["host"]}:{self.proxy["port"]}',
            f'upstream_auth={auth["auth_username"]}:{auth["auth_password"]}',
        )

    def error(self, flow: HTTPFlow):
        """发生错误清理代理, 进而在下次使用时刷新
        """
        ctx.log.info('发生错误: 尝试更换代理')
        self.proxy = None


# addons = [
#     UpstreamProxyRobust()
# ]

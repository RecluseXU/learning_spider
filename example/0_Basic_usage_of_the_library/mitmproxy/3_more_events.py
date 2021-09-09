# -*- encoding: utf-8 -*-
'''
@Time    :   2020-08-06
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   更多可以处理的事件
'''

# here put the import lib
import typing
from mitmproxy import ctx
from mitmproxy.http import HTTPFlow
from mitmproxy.tcp import TCPFlow
from mitmproxy.websocket import WebSocketFlow
from mitmproxy.proxy.protocol import Layer
from mitmproxy.connections import ServerConnection
from mitmproxy.addonmanager import Loader
from mitmproxy.log import LogEntry
from mitmproxy.flow import Flow


class Events(object):
    # 1.针对生命周期
    def http_connect(self, flow: HTTPFlow):
        """(Called when) 收到了来自客户端的 HTTP CONNECT 请求。
        在 flow 上设置非 2xx 响应将返回该响应并断开连接。
        CONNECT 不是常用的 HTTP 请求方法，目的是与服务器建立代理连接，仅是 client 与 proxy 的之间的交流
        所以 CONNECT 请求不会触发 request、response 等其他常规的 HTTP 事件。
        """
        pass

    def requestheaders(self, flow: HTTPFlow):
        """(Called when) 来自客户端的 HTTP 请求的头部被成功读取。
        此时 flow 中的 request 的 body 是空的。
        """
        pass

    def request(self, flow: HTTPFlow):
        """(Called when) 来自客户端的 HTTP 请求被成功完整读取。
        """
        # 获取请求对象
        request = flow.request
        # 打印请求的内容
        ctx.log.info(request.url)
        ctx.log.info(request.method)
        ctx.log.info(request.host)
        ctx.log.info(str(request.port))
        ctx.log.info(str(request.headers))
        ctx.log.info(str(request.cookies))

    def responseheaders(self, flow: HTTPFlow):
        """ (Called when) 来自服务端的 HTTP 响应的头部被成功读取
        此时 flow 中的 response 的 body 是空的。
        """
        pass

    # 所有服务器响应的数据包都会被这个方法处理
    def response(self, flow: HTTPFlow):
        """ (Called when) 来自客户端的 HTTP 响应被成功完整读取。
        """
        # 获取响应对象
        response = flow.response
        # 打印响应内容
        ctx.log.info(str(response.status_code))
        ctx.log.info(str(response.headers))
        ctx.log.info(str(response.cookies))
        ctx.log.info(str(response.text))

    def error(self, flow: HTTPFlow):
        """ (Called when) 发生了一个 HTTP 错误。
        比如无效的服务端响应、连接断开等。
        注意与“有效的 HTTP 错误返回”不是一回事，后者是一个正确的服务端响应，只是 HTTP code 表示错误而已。
        """
        pass

    # 2. 针对TCP生命周期
    def tcp_start(self, flow: TCPFlow):
        """(Called when) 建立了一个 TCP 连接。"""
        pass

    def tcp_message(self, flow: TCPFlow):
        """(Called when) TCP 连接收到了一条消息，最近一条消息存于 flow.messages[-1]。消息是可修改的。
        """
        pass

    def tcp_error(self, flow: TCPFlow):
        """(Called when) 发生了 TCP 错误。"""
        pass

    def tcp_end(self, flow: TCPFlow):
        """(Called when) TCP 连接关闭。"""
        pass

    # 3. 针对 Websocket 生命周期
    def websocket_handshake(self, flow: HTTPFlow):
        """(Called when) 客户端试图建立一个 websocket 连接
        可以通过控制 HTTP 头部中针对 websocket 的条目来改变握手行为。flow 的 request 属性保证是非空的的。
        """
        pass

    def websocket_start(self, flow: WebSocketFlow):
        """(Called when) 建立了一个 websocket 连接
        """
        pass

    def websocket_message(self, flow: WebSocketFlow):
        """(Called when) 收到一条来自客户端或服务端的 websocket 消息。
        最近一条消息存于 flow.messages[-1]。消息是可修改的。
        目前有两种消息类型，对应 BINARY 类型的 frame 或 TEXT 类型的 frame。
        """
        pass

    def websocket_error(self, flow: WebSocketFlow):
        """(Called when) 发生了 websocket 错误。
        """
        pass

    def websocket_end(self, flow: WebSocketFlow):
        """(Called when) websocket 连接关闭。
        """
        pass

    # 4. 针对网络连接生命周期
    def clientconnect(self, layer: Layer):
        """(Called when) 客户端连接到了 mitmproxy
        注意一条连接可能对应多个 HTTP 请求。
        """
        pass

    def clientdisconnect(self, layer: Layer):
        """(Called when) 客户端断开了和 mitmproxy 的连接。
        """
        pass

    def serverconnect(self, conn: ServerConnection):
        """(Called when) mitmproxy 连接到了服务端。
        注意一条连接可能对应多个 HTTP 请求。
        """
        pass

    def serverdisconnect(self, conn: ServerConnection):
        """(Called when) mitmproxy 断开了和服务端的连接。
        """
        pass

    def next_layer(self, layer: Layer):
        """(Called when) 网络 layer 发生切换。
        你可以通过返回一个新的 layer 对象来改变将被使用的 layer。详见 layer 的定义。
        """
        pass

    # 5. 通用生命周期
    def configure(self, updated: typing.Set[str]):
        """(Called when) 配置发生变化。
        updated 参数是一个类似集合的对象，包含了所有变化了的选项。
        在 mitmproxy 启动时，该事件也会触发，且 updated 包含所有选项。
        """
        pass

    def done(self):
        """(Called when) addon 关闭或被移除，又或者 mitmproxy 本身关闭。
        由于会先等事件循环终止后再触发该事件，所以这是一个 addon 可以看见的最后一个事件。
        由于此时 log 也已经关闭，所以此时调用 log 函数没有任何输出。
        """
        pass

    def load(self, entry: Loader):
        """(Called when) addon 第一次加载时。
        entry 参数是一个 Loader 对象，包含有添加选项、命令的方法。这里是 addon 配置它自己的地方。
        """
        pass

    def log(self, entry: LogEntry):
        """(Called when) 通过 mitmproxy.ctx.log 产生了一条新日志。
        小心不要在这个事件内打日志，否则会造成死循环。
        """
        pass

    def running(self):
        """(Called when) mitmproxy 完全启动并开始运行。
        此时，mitmproxy 已经绑定了端口，所有的 addon 都被加载了。
        """
        pass

    def update(self, flows: typing.Sequence[Flow]):
        """(Called when) 一个或多个 flow 对象被修改了，通常是来自一个不同的 addon。
        """
        pass


addons = [
    Events()
]

if __name__ == "__main__":
    # mitmweb -s 3_more_events.py
    pass

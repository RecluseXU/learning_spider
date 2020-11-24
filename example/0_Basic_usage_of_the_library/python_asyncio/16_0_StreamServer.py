#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   16_Stream.py
@Time    :   2020-11-24
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   流是用于处理网络连接的支持 async/await 的高层级原语  

文档url : https://docs.python.org/zh-cn/3/library/asyncio-stream.html#streams

流允许发送和接收数据，而不需要使用回调或低级协议和传输。
下面是一个使用 asyncio streams 编写的 TCP echo 客户端示例:
'''

# here put the import lib
import asyncio

async def handle_echo(reader, writer):
    data = await reader.read(100)
    message = data.decode()
    addr = writer.get_extra_info('peername')

    print(f"Received {message!r} from {addr!r}")

    print(f"Send: {message!r}")
    writer.write(data)
    await writer.drain()

    print("Close the connection")
    writer.close()

async def main():
    server = await asyncio.start_server(
        handle_echo, '127.0.0.1', 8888)

    addr = server.sockets[0].getsockname()
    print(f'Serving on {addr}')

    async with server:
        await server.serve_forever()

asyncio.run(main())
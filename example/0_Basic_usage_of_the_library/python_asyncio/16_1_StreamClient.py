#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   17_StreamReader.py
@Time    :   2020-11-24
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   

文档url : https://docs.python.org/zh-cn/3/library/asyncio-stream.html


'''

# here put the import lib
import asyncio

async def tcp_echo_client(message):
    reader, writer = await asyncio.open_connection(
        '127.0.0.1', 8888)

    print(f'Send: {message!r}')
    writer.write(message.encode())

    data = await reader.read(100)
    print(f'Received: {data.decode()!r}')

    print('Close the connection')
    writer.close()

asyncio.run(tcp_echo_client('Hello World!'))
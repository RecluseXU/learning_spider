import aiohttp
import asyncio

print('Hello Aiohttp')
async def the_task():
    # 创建一个名为 session 的 ClientSession 对象  
    async with aiohttp.ClientSession() as session:
        # ClientSession 对象发起请求，获取结果保存为 resp
        async with session.get('http://httpbin.org/get') as resp:
            print(resp.status)  # 响应状态码
            print(await resp.text())  # 响应内容

if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    loop.run_until_complete(the_task())
# -*- encoding: utf-8 -*-
'''
@Time    :   2021-05-18
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   启动一个线程来运行协程池，进行任务执行
'''

# here put the import lib
import asyncio
import aiohttp
import time
import queue
from threading import Thread


class AsyncPool(object):
    """
    1. 支持动态添加任务
    2. 支持自动停止事件循环
    3. 支持最大协程数
    """

    def __init__(self, maxsize=1, loop=None):
        """ 初始化
        :param loop:
        :param maxsize: 默认为1
        """
        # 在jupyter需要这个，不然asyncio运行出错
        # import nest_asyncio
        # nest_asyncio.apply()

        # 队列，先进先出，根据队列是否为空判断，退出协程
        self.task_queue = queue.Queue()
        # 协程池
        self.loop, _ = self.start_loop(loop)
        # 限制并发量为500
        self.semaphore = asyncio.Semaphore(maxsize, loop=self.loop)

    def task_add(self, item=1):
        """添加任务"""
        self.task_queue.put(item)

    def task_done(self, fn):
        """任务完成，回调函数"""
        if fn:
            pass
        self.task_queue.get()
        self.task_queue.task_done()

    def wait(self):
        """等待任务执行完毕"""
        self.task_queue.join()

    @property
    def running(self):
        """ 获取当前线程数
        :return:
        """
        return self.task_queue.qsize()

    @staticmethod
    def _start_thread_loop(loop):
        """ 运行事件循环 """
        # 将当前上下文的事件循环设置为循环。
        asyncio.set_event_loop(loop)
        # 开始事件循环
        loop.run_forever()

    async def _stop_thread_loop(self, loop_time=1):
        """ 停止协程，关闭线程 """
        while True:
            if self.task_queue.empty():
                # 停止协程
                self.loop.stop()
                break
            await asyncio.sleep(loop_time)

    def start_loop(self, loop):
        """ 运行事件循环,开启新线程 """
        # 获取一个事件循环
        if not loop:
            loop = asyncio.new_event_loop()

        loop_thread = Thread(target=self._start_thread_loop, args=(loop,))
        # 设置守护进程
        loop_thread.setDaemon(True)
        # 运行线程，同时协程事件循环也会运行
        loop_thread.start()

        return loop, loop_thread

    def stop_loop(self, loop_time=1):
        """ 队列为空，则关闭线程
        :param loop_time:
        :return:
        """
        # 关闭线程任务
        asyncio.run_coroutine_threadsafe(self._stop_thread_loop(loop_time), self.loop)

    def release(self, loop_time=1):
        """ 释放线程
        :param loop_time:
        :return:
        """
        self.stop_loop(loop_time)

    async def async_semaphore_func(self, func):
        """ 信号包装
        :param func:
        :return:
        """
        async with self.semaphore:
            return await func

    def submit(self, func, callback=None):
        """ 提交任务到事件循环
        :param func: 异步函数对象
        :param callback: 回调函数
        :return:
        """
        self.task_add()
        # 将协程注册一个到运行在线程中的循环，thread_loop 会获得一个环任务
        # 注意：run_coroutine_threadsafe 这个方法只能用在运行在线程中的循环事件使用
        # future = asyncio.run_coroutine_threadsafe(func, self.loop)
        future = asyncio.run_coroutine_threadsafe(
            self.async_semaphore_func(func),
            self.loop,
        )
        # 添加回调函数,添加顺序调用
        future.add_done_callback(callback)
        future.add_done_callback(self.task_done)


async def thread_example(i):
    url = "http://www.example.com"
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as res:
            # print(res.status)
            # print(res.content)
            html = await res.text()
            return len(html)


def my_callback(future):
    result = future.result()
    print('返回值: ', result)


def main():
    # 任务组， 最大协程数
    pool = AsyncPool(maxsize=100)
    # 插入任务任务
    for i in range(100):
        pool.submit(thread_example(i), my_callback)
    print("等待子线程结束1...")
    # 停止事件循环
    pool.release()
    # 获取线程数
    # print(pool.running)
    print("等待子线程结束2...")
    # 等待
    pool.wait()
    print("等待子线程结束3...")


if __name__ == '__main__':
    start_time = time.time()
    main()
    end_time = time.time()
    print("run time: ", end_time - start_time)

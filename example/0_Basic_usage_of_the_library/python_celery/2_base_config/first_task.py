# -*- encoding: utf-8 -*-
'''
@Time    :   2021-12-19
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   创建 Task 让 Work处理, 并拿到返回的结果
'''

# here put the import lib
from set_config import add
from celery.result import AsyncResult

# 需要调用我们创建的实例任务，可以通过 delay() 进行调用。
# delay() 实际上是 apply_async() 的快捷方法
async_result: AsyncResult = add.delay(3, 5)
# 任务 会被 Worker 进行处理，可以通过控制台输出的日志进行查看执行情况
# 调用任务会返回一个 AsyncResult 的实例，用于检测任务的状态，等待任务，获取任务返回值（如果任务执行失败，会抛出异常）
# 默认这个功能是不开启的，配置 Celery 的 backend 才会开启
# 如果存储结果，必须要针对调用任务后返回每一个 AsyncResult 实例调用 get() 或 forget() , 进行资源释放

# 判断 Task 是否已经处理完毕, 能拿到结果了
task_finish = async_result.ready()
print(f'任务已完成：{task_finish}')
# 获取结果
task_result = async_result.get(timeout=2)
print(f'结果为：{task_result}')
# 设置 timeout 参数用于设定限时, 如果时间到了还没拿到结果会抛 Exception
# 设置 propagate=False 参数可以不抛出的错误,这样就不用捕获错误了
# 如果 结果抛出了错误, 可以通过 result.traceback 来查看错误的信息

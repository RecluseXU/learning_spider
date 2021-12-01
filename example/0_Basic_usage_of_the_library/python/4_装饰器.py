# -*- encoding: utf-8 -*-
'''
@Time    :   2021-12-01
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   装饰器编写

基础原理实际上就是写一个新的函数，把被装饰的函数包裹起来, 形成新的函数取代原函数
非常类似于Hook
'''

# here put the import lib
import functools


def example_one():
    """最简单的装饰器例子"""
    def decorator_func_name(func):
        """装饰器
        此装饰器用于在调用函数前输出函数名字
        """
        def wrapper(*args, **kw):
            """装饰器装饰原函数"""
            print(f'{func.__name__}()')  # 调用原函数前做一些事情
            return func(*args, **kw)  # 调用原函数
        return wrapper

    @decorator_func_name
    def f1():
        print('Hello')

    f1()


def example_two():
    """装饰器嵌套"""
    def get_log_decorator(text):
        """传入参数，返回特别的装饰器"""
        def decorator(func):
            def wrapper(*args, **kw):
                """装饰器装饰原函数"""
                return func(*args, **kw)
            return wrapper
        return decorator

    @get_log_decorator('execute')
    def now():
        print('World')

    now()


def example_three():
    """添加装饰器会造成函数名更变, 可以处理这个问题"""
    def get_log_decorator_1(text):
        def decorator(func):
            def wrapper(*args, **kw):
                print(f'{text} {func.__name__}()')
                return func(*args, **kw)
            return wrapper
        return decorator

    @get_log_decorator_1('execute')
    def now():
        print('World')

    print(f'函数名: {now.__name__}')

    def get_log_decorator_2(text):
        def decorator(func):
            # 添加此装饰器可以处理函数名的问题
            @functools.wraps(func)
            def wrapper(*args, **kw):
                print(f'{text} {func.__name__}()')
                return func(*args, **kw)
            return wrapper
        return decorator

    @get_log_decorator_2('execute')
    def now():
        print('World')

    print(f'函数名: {now.__name__}')


# example_one()
# example_two()
example_three()

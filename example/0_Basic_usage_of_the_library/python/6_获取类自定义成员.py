# -*- encoding: utf-8 -*-
'''
@Time    :   2023-02-24
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   类属性操作
__getattribute__: 查找属性时会先触发该方法进行属性查找
__getattr__: 查找属性没找到的时候触发
__setattr__: 设置属性的时候触发
__delattr__: 删除属性的时候触发
'''

# here put the import lib
import inspect


class Cat(object):
    name = ""
    age = 0

    def __init__(self, name="", age=0):
        self.name = name
        self.age = age

    def speak(self):
        print('喵喵')

    def cry(self):
        print('呜呜')

    def __getattribute__(self, item):
        # 属性访问拦截器：当对象访问属性时，会自动触发这个方法，由这个方法来决定返回的属性值
        # 应用场景：访问不存在的属性时，不希望它报错，可以用try--except来捕获异常返回一个值或提示信息
        # try:
        #     return super().__getattribute__(item)  # 调用父类真正的__getattribute__方法返回正确的属性值
        # except AttributeError:
        #     print(item,'：该属性不存在！')
        # 如果使用了try方法就不会触发__getattr__方法了，因为找不到属性时的异常已经在这里被捕获了
        print("我是__getattribute__, 我正在工作")
        return super().__getattribute__(item)  # 调用父类的方法，返回找到的结果，不调用就不会返回

    def __getattr__(self, att_name):
        # 当对象访问属性时，属性不存在，引发异常，会被__getattr__方法捕获
        # 然后执行该方法的代码，相当于自带捕获异常
        print("我是__getattr__, 我正在工作")
        return att_name + "这是我要找的东西，但是我找不到"

    def __setattr__(self, att_name, value):
        # 设置属性的时候就会触发该方法
        print("我是__setattr__, 我正在工作")
        super().__setattr__(att_name, value)  # 调用父类的方法，设置属性，不调用就不会真的设置属性

    def __delattr__(self, att_name):
        print("我是__delattr__, 我正在工作")
        print("这是我即将删除的东西{}".format(att_name))
        super().__delattr__(att_name)  # 调用父类的方法，删除属性，不调用就删除不了


# 获取自定义方法
class_functions = inspect.getmembers(Cat, lambda a: inspect.isfunction(a))
define_functions = list(filter(lambda x: not x[0].startswith('__'), class_functions))
print(define_functions)

# 获取自定义成员属性
class_attributes = inspect.getmembers(Cat, lambda a: not inspect.isfunction(a))
define_attributes = list(filter(lambda x: not x[0].startswith('__'), class_attributes))
print(define_attributes)


cat = Cat()
print('-----------------访问属性----------------')
print(cat.name)    # 访问类属性，通过运行结果看res实例对象访问属性时过了方法__getattribute__
print('\n-----------------访问不存在的属性----------------')
print(cat.boy_frend)
print('\n-----------------设置属性----------------')
cat.gender = 'female'
print('\n-----------------删除属性----------------')
del cat.gender

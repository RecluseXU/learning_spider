#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   0_helloworld.py
@Time    :   2020/08/08 13:11:23
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
@Desc    :   安装完Node.js和pyexecjs后，测试是否正常
'''

# here put the import lib
import execjs


print("如果装了Node.js, 会显示 Node.js", execjs.get().name)

js_text = '''
function hello_world(){
    return "Hello World";
}
'''

ctx = execjs.compile(js_text)  # 编译js代码
a = ctx.call('hello_world')
print(a)

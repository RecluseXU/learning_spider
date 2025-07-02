# -*- encoding: utf-8 -*-
'''
@Time    :   2023-06-21
@Author  :   EvilRecluse
@Desc    :   python chr 与 String.fromCharCode 的不同

# Javascript String 类型
# String 类型表示文本数据并编码为 UTF-16 代码单位的 16 位无符号整数值序列。
# 字符串中的每个元素在字符串中占据一个位置。第一个元素的索引为 0，下一个是索引 1，依此类推。字符串的长度是它的元素的数量。
# 字符串的长度是其中的 UTF-16 代码单元的数量，这可能与 Unicode 字符的实际数量不符；更多细节参见 String 参考页面。
# 参考：(MDN String 类型)[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Data_structures#string_%E7%B1%BB%E5%9E%8B]

# Python str 类型
# 在 Python 中处理文本数据是使用 str 对象，也称为 字符串。 字符串是由 Unicode 码位构成的不可变 序列。
# unicode码位范围: U+0000 ~ U+10FFFF
# 参考：(Python官方文档 文本序列类型)[https://docs.python.org/zh-cn/3/library/stdtypes.html#text-sequence-type-str]

问题在于:
    javascript 里 String.fromCharCode 一个超出 16位无符号整数 范围的数不会报错, 溢出的值会被抛弃
        String.fromCharCode(65536) === String.fromCharCode(0)
    python 里 unicode码位比16位无符号整数 范围大, 而且如果传入一个超出范围的数会报错
'''

# here put the import lib
import execjs


python_unicode_char_list = []
for index, i in enumerate(range(9999999)):
    try:
        python_char = chr(index)
    except Exception:
        print(f'上限: {index-1} => {hex(index-1)}')
        break
    python_unicode_char_list.append(python_char)

js_unicode_char_list = []


js_code = """
function getJsUnicodeCharList() {
    var jsUnicodeCharList = []
    for(var a=0; a < 9999999; a++){
        js_char = String.fromCharCode(a);
        jsUnicodeCharList.push(js_char);
    }
    return jsUnicodeCharList;
}
"""
js_unicode_char_list = execjs.compile(js_code).call("getJsUnicodeCharList")

for index in range(9999999):
    python_char = python_unicode_char_list[index]
    js_char = js_unicode_char_list[index]
    is_equal = python_char == js_char
    if not is_equal:
        print('从这里开始不一样了')
        print(hex(index))
        break

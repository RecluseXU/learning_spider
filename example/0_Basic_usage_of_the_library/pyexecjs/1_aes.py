#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   1_AES.PY
@Time    :   2020/08/08 15:15:47
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
@Desc    :   运用Crypto-js 对信息进行加密和解密，在运行前要确保Crypto-js已经被安装上
'''

# here put the import lib
import execjs

secret_key = '1234123412ABCDEF'  # 秘钥, 十六位十六进制数
vi = 'ABCDEF1234123412'  # 秘钥偏移量,十六位十六进制数作为密钥偏移量
information = 'this is an information'  # 信息

js_text = '''
const CryptoJS = require('crypto-js');  //引用AES源码js

const key = CryptoJS.enc.Utf8.parse(\"''' + secret_key + '''\");  //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse(\"''' + vi + '''\");   //十六位十六进制数作为密钥偏移量

//加密方法
function Encrypt(word) {
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.ciphertext.toString().toUpperCase();
}

//解密方法
function Decrypt(word) {
    let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}
'''

ctx = execjs.compile(js_text)  # 编译js代码
a = ctx.call('Encrypt', information)
print('AES加密后, 密文:', a)
a = ctx.call('Decrypt', a, secret_key)
print('AES解密后, 原文:', a)

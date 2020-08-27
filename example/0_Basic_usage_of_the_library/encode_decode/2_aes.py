#!/usr/bin/env python
# -*- encoding: utf-8 -*-
'''
@File    :   0.py
@Time    :   2020年8月18日16:20:45
@Author  :   Recluse Xu
@Version :   1.0
@Contact :   444640050@qq.com
@Desc    :   None
'''

import base64
from Crypto.Cipher import AES


class AES_Cipher(object):
    def __init__(self, key):
        self.bs = 16
        key = key.encode("utf-8")
        self.cipher = AES.new(key, AES.MODE_ECB)

    def encrypt(self, raw):
        raw = self._pad(raw)
        raw = raw.encode("utf-8")
        encrypted = self.cipher.encrypt(raw)
        encoded = base64.b64encode(encrypted)
        return str(encoded, 'utf-8')

    def decrypt(self, raw):
        decoded = base64.b64decode(raw)
        decrypted = self.cipher.decrypt(decoded)
        return str(self._unpad(decrypted), 'utf-8')

    def _pad(self, s):
        # 填充算法，由于算法需要特定位数，位数不足就需要填充
        return s + (self.bs - len(s) % self.bs) * chr(self.bs - len(s) % self.bs)

    def _unpad(self, s):
        return s[:-ord(s[len(s)-1:])]


if __name__ == "__main__":
    a = 'HelloWorld'
    aes = AES_Cipher('abcdefgh12345678')
    w = aes.encrypt(a)
    print(w)
    print(aes.decrypt(w))

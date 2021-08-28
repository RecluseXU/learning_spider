# -*- encoding: utf-8 -*-
'''
@Time    :   2020-08-18
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   AES相关用例
'''

# here put the import lib


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
        pad_char = chr(self.bs - len(s) % self.bs)
        pad_chars = (self.bs - len(s) % self.bs) * pad_char
        return s + pad_chars

    def _unpad(self, s):
        return s[:-ord(s[len(s)-1:])]


if __name__ == "__main__":
    a = 'HelloWorld'
    aes = AES_Cipher('abcdefgh12345678')
    w = aes.encrypt(a)
    print(w)
    print(aes.decrypt(w))

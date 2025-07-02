# -*- encoding: utf-8 -*-
'''
@Time    :   2023-07-06
@Author  :   EvilRecluse
@Contact :   https://github.com/RecluseXU
@Desc    :   RSA加解密样例
    RSA加密算法是一种非对称加密算法, 在公开密钥加密和电子商业中被广泛使用。
    RSA的安全性依赖于大数分解。换句话说,RSA的难度与大数分解难度等价,一旦发现了对大整数进行质因数分解的高效算法,RSA就能够被破译。
'''

# here put the import lib
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives import hashes


# 生成 RSA 密钥对
private_key = rsa.generate_private_key(
    public_exponent=65537,
    key_size=2048
)
public_key = private_key.public_key()

# 将私钥保存为 PEM 格式
pem_private_key = private_key.private_bytes(
    encoding=serialization.Encoding.PEM,
    format=serialization.PrivateFormat.PKCS8,
    encryption_algorithm=serialization.NoEncryption()
)
with open('private_key.pem', 'wb') as f:
    f.write(pem_private_key)

# 将公钥保存为 PEM 格式
pem_public_key = public_key.public_bytes(
    encoding=serialization.Encoding.PEM,
    format=serialization.PublicFormat.SubjectPublicKeyInfo
)
with open('public_key.pem', 'wb') as f:
    f.write(pem_public_key)

# 加密
plaintext = b'Hello, World!'
encrypted_data = public_key.encrypt(
    plaintext,
    padding.OAEP(
        mgf=padding.MGF1(algorithm=hashes.SHA256()),
        algorithm=hashes.SHA256(),
        label=None
    )
)

# 解密
decrypted_data = private_key.decrypt(
    encrypted_data,
    padding.OAEP(
        mgf=padding.MGF1(algorithm=hashes.SHA256()),
        algorithm=hashes.SHA256(),
        label=None
    )
)

# 打印结果
print('Plaintext:', plaintext)
print('Encrypted Data:', encrypted_data)
print('Decrypted Data:', decrypted_data)
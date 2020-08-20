// AES ECB模式并不需要传入VI

var CryptoJS = require("crypto-js");
var key = "ABC1234567891234";

function encrypt(text){
    return CryptoJS.AES.encrypt(
        text,
        CryptoJS.enc.Utf8.parse(key),
        {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        })
}

function decrypt(text){
    var result = CryptoJS.AES.decrypt(
        text,
        CryptoJS.enc.Utf8.parse(key),
        {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        })
    return result.toString(CryptoJS.enc.Utf8)
}

var text = "Hello";
var encoded = encrypt(text);
console.log(encoded.toString());
console.log(decrypt(encoded));
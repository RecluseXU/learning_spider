var CryptoJS = require("crypto-js");
var key = "ABC1234567891234";
var iv = "1234567812345678";

function encrypt(text){
    return CryptoJS.AES.encrypt(
        text,
        CryptoJS.enc.Utf8.parse(key),
        {
            iv: CryptoJS.enc.Utf8.parse(iv),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        })
}

function decrypt(text){
    var result = CryptoJS.AES.decrypt(
        text,
        CryptoJS.enc.Utf8.parse(key),
        {
            iv: CryptoJS.enc.Utf8.parse(iv),
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        })
    return result.toString(CryptoJS.enc.Utf8)
}

var text = "Hello";
var encoded = encrypt(text);
console.log(encoded.toString());
console.log(decrypt(encoded));
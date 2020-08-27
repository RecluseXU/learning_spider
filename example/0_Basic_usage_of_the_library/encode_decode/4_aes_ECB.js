// AES ECB模式并不需要传入VI

var CryptoJS = require("crypto-js");
var key = "8005b080b950245d";

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

var text = '{"o00o0o00o0o0o0":"eval0514undefined"}';
var encoded = encrypt(text);
console.log(encoded.toString());
console.log(decrypt(encoded));
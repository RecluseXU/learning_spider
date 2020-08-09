const code = "var a = 'Hello World'"


const options = {// 混淆设置
    stringArray: true,  // 把字符串拼成多个数组 
    rotateStringArray: true,  // 字符是否需要翻转
    stringArrayEncoding: true,  // 字符编码方式 默认base64  可选base64/rc4/false
    stringArrayThreshold: 1,  //  阈值 0-1之间
    unicodeEscapeSequence: true  // unicode编码 
}

const obfuscator = require('javascript-obfuscator'); // 导入
function my_obfuscate(code, options){
    return obfuscator.obfuscate(code, options).getObfuscatedCode();
}
console.log(my_obfuscate(code, options));
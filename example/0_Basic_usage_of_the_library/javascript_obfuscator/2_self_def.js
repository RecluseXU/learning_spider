const code = "console.log('Hello World')"


const options = {// 混淆设置
    selfDefending: true  // 若格式化后运行，浏览器会卡死
}

const obfuscator = require('javascript-obfuscator'); // 导入
function my_obfuscate(code, options){
    return obfuscator.obfuscate(code, options).getObfuscatedCode();
}
console.log(my_obfuscate(code, options));